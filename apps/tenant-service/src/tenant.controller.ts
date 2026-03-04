import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto } from './tenant.service';

@Controller('tenants')
export class TenantController {
  private readonly logger = new Logger(TenantController.name);

  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    this.logger.log(`Creating tenant with subdomain: ${dto.subdomain}`);
    return this.tenantService.create(dto);
  }

  @Get()
  async findAll() {
    const tenants = await this.tenantService.findAll();
    return {
      data: tenants,
      total: tenants.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Get('subdomain/:subdomain')
  async findBySubdomain(@Param('subdomain') subdomain: string) {
    return this.tenantService.findBySubdomain(subdomain);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTenantDto
  ) {
    return this.tenantService.update(id, dto);
  }

  @Put(':id/activate')
  async activate(@Param('id') id: string) {
    return this.tenantService.activate(id);
  }

  @Put(':id/suspend')
  async suspend(@Param('id') id: string) {
    return this.tenantService.suspend(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.tenantService.delete(id);
  }
}
