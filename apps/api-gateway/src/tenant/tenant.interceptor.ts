import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TenantInterceptor.name);

  constructor(private readonly tenantService: TenantService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const host = request.headers.host || 'localhost';

    // Extract subdomain from host
    const subdomain = this.tenantService.extractSubdomain(host);

    // Resolve tenant
    const tenantContext = await this.tenantService.resolveTenant(subdomain);

    // Attach tenant to request for use in guards/decorators
    request.tenant = tenantContext;

    this.logger.debug(`Resolved tenant: ${tenantContext.tenantId} for host: ${host}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(`Request completed for tenant: ${tenantContext.tenantId}`);
      }),
    );
  }
}
