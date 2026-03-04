import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  tenantId: string;
  schemaName: string;
  subdomain: string;
  name: string;
}

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);
  private readonly als: AsyncLocalStorage<TenantContext>;

  // In production, this would be cached from database
  private readonly tenants: Map<string, TenantContext> = new Map([
    ['admin', { tenantId: 'platform', schemaName: 'public', subdomain: 'admin', name: 'Platform Admin' }],
  ]);

  constructor(private readonly configService: ConfigService) {
    this.als = new AsyncLocalStorage<TenantContext>();
  }

  /**
   * Resolve tenant from subdomain
   */
  async resolveTenant(subdomain: string): Promise<TenantContext> {
    // Check if it's the platform admin
    if (subdomain === 'admin' || subdomain === 'www') {
      return {
        tenantId: 'platform',
        schemaName: 'public',
        subdomain,
        name: 'Platform Admin',
      };
    }

    // Look up tenant by subdomain
    const tenant = this.tenants.get(subdomain);
    if (tenant) {
      return tenant;
    }

    // In production, query database for tenant
    // For now, create a mock tenant for development
    if (this.configService.get('NODE_ENV') === 'development') {
      const mockTenant: TenantContext = {
        tenantId: subdomain,
        schemaName: `tenant_${subdomain}`,
        subdomain,
        name: `${subdomain} Store`,
      };
      this.tenants.set(subdomain, mockTenant);
      return mockTenant;
    }

    throw new NotFoundException(`Tenant not found: ${subdomain}`);
  }

  /**
   * Extract subdomain from host header
   */
  extractSubdomain(host: string): string {
    const parts = host.split('.');
    if (parts.length >= 2) {
      return parts[0];
    }
    return 'admin';
  }

  /**
   * Run code within tenant context
   */
  runWithContext<T>(context: TenantContext, fn: () => T): T {
    return this.als.run(context, fn);
  }

  /**
   * Get current tenant context
   */
  getContext(): TenantContext | undefined {
    return this.als.getStore();
  }

  /**
   * Get current tenant ID
   */
  getTenantId(): string | undefined {
    return this.als.getStore()?.tenantId;
  }

  /**
   * Get current schema name
   */
  getSchemaName(): string | undefined {
    return this.als.getStore()?.schemaName;
  }
}
