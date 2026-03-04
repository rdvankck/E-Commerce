import {
  Controller,
  All,
  Param,
  Body,
  Query,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Tenant } from '../tenant/tenant.decorator';
import { TenantContext } from '../tenant/tenant.service';

interface RequestWithUser extends Request {
  params: Record<string, string>;
  method: string;
  user?: {
    id: string;
    email: string;
    tenantId: string;
    role: string;
  };
}

@Controller()
export class ProxyController {
  private readonly logger = new Logger(ProxyController.name);

  constructor(private readonly proxyService: ProxyService) {}

  // ============================================
  // Admin API Routes (requires authentication)
  // ============================================

  @UseGuards(JwtAuthGuard)
  @All('admin/products/*')
  async proxyAdminProducts(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
    @Query() query: any,
  ) {
    const path = `/admin/products/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'core',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('admin/orders/*')
  async proxyAdminOrders(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/admin/orders/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'core',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('admin/customers/*')
  async proxyAdminCustomers(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/admin/customers/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'core',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('admin/plugins/*')
  async proxyAdminPlugins(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/admin/plugins/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'plugin',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @All('admin/settings/*')
  async proxyAdminSettings(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/admin/settings/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'core',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  // ============================================
  // Storefront API Routes (mostly public)
  // ============================================

  @Public()
  @All('storefront/products/*')
  async proxyStorefrontProducts(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/storefront/products/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest('core', req.method, path, body, tenant);
  }

  @Public()
  @All('storefront/categories/*')
  async proxyStorefrontCategories(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/storefront/categories/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest('core', req.method, path, body, tenant);
  }

  @Public()
  @All('storefront/cart/*')
  async proxyStorefrontCart(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/storefront/cart/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest('core', req.method, path, body, tenant);
  }

  @Public()
  @All('storefront/checkout/*')
  async proxyStorefrontCheckout(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/storefront/checkout/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest('core', req.method, path, body, tenant);
  }

  // ============================================
  // Plugin Custom Routes
  // ============================================

  @All('plugin/:pluginId/*')
  async proxyPluginRoute(
    @Param('pluginId') pluginId: string,
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/plugin/${pluginId}/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'plugin',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }

  // ============================================
  // Tenant Management Routes (platform admin)
  // ============================================

  @UseGuards(JwtAuthGuard)
  @All('tenants/*')
  async proxyTenants(
    @Request() req: RequestWithUser,
    @Tenant() tenant: TenantContext,
    @Body() body: any,
  ) {
    const path = `/tenants/${req.params[0] || ''}`;
    return this.proxyService.proxyRequest(
      'tenant',
      req.method,
      path,
      body,
      tenant,
      req.user,
    );
  }
}
