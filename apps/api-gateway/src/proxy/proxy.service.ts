import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TenantContext } from '../tenant/tenant.service';

interface ServiceConfig {
  name: string;
  baseUrl: string;
  timeout: number;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly services: Map<string, ServiceConfig>;

  constructor(private readonly configService: ConfigService) {
    this.services = new Map([
      ['core', {
        name: 'core-service',
        baseUrl: `http://localhost:${this.configService.get('CORE_SERVICE_PORT', 4001)}`,
        timeout: 30000,
      }],
      ['tenant', {
        name: 'tenant-service',
        baseUrl: `http://localhost:${this.configService.get('TENANT_SERVICE_PORT', 4002)}`,
        timeout: 30000,
      }],
      ['plugin', {
        name: 'plugin-service',
        baseUrl: `http://localhost:${this.configService.get('PLUGIN_SERVICE_PORT', 4003)}`,
        timeout: 30000,
      }],
    ]);
  }

  async proxyRequest(
    service: string,
    method: string,
    path: string,
    data: any,
    tenant: TenantContext,
    user?: any,
  ): Promise<any> {
    const serviceConfig = this.services.get(service);

    if (!serviceConfig) {
      throw new HttpException(`Unknown service: ${service}`, HttpStatus.BAD_REQUEST);
    }

    const url = `${serviceConfig.baseUrl}${path}`;

    this.logger.debug(`Proxying ${method} ${url} for tenant ${tenant.tenantId}`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Tenant-Id': tenant.tenantId,
      'X-Schema-Name': tenant.schemaName,
    };

    if (user) {
      headers['X-User-Id'] = user.id;
      headers['X-User-Role'] = user.role;
      headers['X-User-Email'] = user.email;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data && method !== 'GET' ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new HttpException(responseData, response.status);
      }

      return responseData;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Proxy error: ${errorMessage}`);
      throw new HttpException(
        `Service ${service} unavailable`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  getServiceUrl(service: string): string | undefined {
    return this.services.get(service)?.baseUrl;
  }
}
