import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';

declare global {
  namespace Express {
    interface Request {
      tenantId?: string;
      schemaName?: string;
      userId?: string;
      userRole?: string;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;
    const schemaName = req.headers['x-schema-name'] as string;
    const userId = req.headers['x-user-id'] as string;
    const userRole = req.headers['x-user-role'] as string;

    if (!tenantId || !schemaName) {
      throw new BadRequestException('Tenant context missing');
    }

    req.tenantId = tenantId;
    req.schemaName = schemaName;
    req.userId = userId;
    req.userRole = userRole;

    // Set PostgreSQL search_path to tenant schema
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.query(`SET search_path TO ${schemaName}, public`);
      await queryRunner.release();

      // Store query runner for cleanup
      (req as any).queryRunner = queryRunner;
    } catch (error) {
      console.error('Failed to set tenant schema:', error);
      // In development, continue without schema switching
    }

    next();
  }
}
