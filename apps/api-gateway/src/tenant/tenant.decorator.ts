import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TenantContext } from './tenant.service';

export const Tenant = createParamDecorator(
  (data: keyof TenantContext | undefined, ctx: ExecutionContext): TenantContext | any => {
    const request = ctx.switchToHttp().getRequest();
    const tenant: TenantContext = request.tenant;

    return data ? tenant?.[data] : tenant;
  },
);
