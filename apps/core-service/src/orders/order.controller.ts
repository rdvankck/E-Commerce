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
import { OrderService, CreateOrderDto } from './order.service';
import { OrderStatus, PaymentStatus } from './entities/order.entity';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ============================================
  // Admin API
  // ============================================

  @Get('admin/orders')
  async findAllAdmin(
    @Request() req: any,
    @Query('status') status?: OrderStatus,
    @Query('customerId') customerId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.orderService.findAll(req.tenantId, {
      status,
      customerId,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('admin/orders/:id')
  async findOneAdmin(@Param('id') id: string, @Request() req: any) {
    return this.orderService.findOne(id, req.tenantId);
  }

  @Put('admin/orders/:id/status')
  async updateStatusAdmin(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
    @Request() req: any,
  ) {
    return this.orderService.updateStatus(id, status, req.tenantId);
  }

  @Put('admin/orders/:id/payment-status')
  async updatePaymentStatusAdmin(
    @Param('id') id: string,
    @Body('paymentStatus') paymentStatus: PaymentStatus,
    @Request() req: any,
    @Body('transactionId') transactionId?: string,
  ) {
    return this.orderService.updatePaymentStatus(
      id,
      paymentStatus,
      req.tenantId,
      transactionId,
    );
  }

  // ============================================
  // Storefront API
  // ============================================

  @Post('storefront/orders')
  async createStorefront(@Body() dto: CreateOrderDto, @Request() req: any) {
    return this.orderService.create(dto, req.tenantId);
  }

  @Get('storefront/orders/:id')
  async findOneStorefront(@Param('id') id: string, @Request() req: any) {
    return this.orderService.findOne(id, req.tenantId);
  }

  @Get('storefront/orders/customer/:customerId')
  async getCustomerOrdersStorefront(
    @Param('customerId') customerId: string,
    @Request() req: any,
  ) {
    return this.orderService.getCustomerOrders(customerId, req.tenantId);
  }
}
