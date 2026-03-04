import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CustomerService,
  CreateCustomerDto,
  UpdateCustomerDto,
  LoginCustomerDto,
} from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // ============================================
  // Admin API
  // ============================================

  @Get('admin/customers')
  async findAllAdmin(
    @Request() req: any,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.customerService.findAll(req.tenantId, {
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('admin/customers/:id')
  async findOneAdmin(@Param('id') id: string, @Request() req: any) {
    return this.customerService.findOne(id, req.tenantId);
  }

  @Put('admin/customers/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @Request() req: any,
  ) {
    return this.customerService.update(id, dto, req.tenantId);
  }

  // ============================================
  // Storefront API
  // ============================================

  @Post('storefront/customers/register')
  async registerStorefront(
    @Body() dto: CreateCustomerDto,
    @Request() req: any,
  ) {
    return this.customerService.create(dto, req.tenantId);
  }

  @Post('storefront/customers/login')
  async loginStorefront(@Body() dto: LoginCustomerDto, @Request() req: any) {
    return this.customerService.login(dto, req.tenantId);
  }

  @Get('storefront/customers/:id')
  async findOneStorefront(@Param('id') id: string, @Request() req: any) {
    return this.customerService.findOne(id, req.tenantId);
  }

  @Put('storefront/customers/:id')
  async updateStorefront(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @Request() req: any,
  ) {
    return this.customerService.update(id, dto, req.tenantId);
  }

  @Post('storefront/customers/:id/addresses')
  async addAddressStorefront(
    @Param('id') id: string,
    @Body() address: any,
    @Request() req: any,
  ) {
    return this.customerService.addAddress(id, address, req.tenantId);
  }

  @Delete('storefront/customers/:id/addresses/:addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAddressStorefront(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Request() req: any,
  ) {
    return this.customerService.removeAddress(id, addressId, req.tenantId);
  }
}

import { Delete } from '@nestjs/common';
