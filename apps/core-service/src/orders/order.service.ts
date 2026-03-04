import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Order, OrderStatus, PaymentStatus, FulfillmentStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Customer } from '../customers/entities/customer.entity';

export interface CreateOrderDto {
  customerId: string;
  items: CreateOrderItemDto[];
  shippingAddress: any;
  billingAddress: any;
  shippingMethod?: string;
  customerNote?: string;
}

export interface CreateOrderItemDto {
  productId: string;
  variantId?: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  attributes?: Record<string, any>;
  imageUrl?: string;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateOrderDto, tenantId: string): Promise<Order> {
    const orderNumber = await this.generateOrderNumber();

    const subtotal = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const order = this.orderRepository.create({
      orderNumber,
      customerId: dto.customerId,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      fulfillmentStatus: FulfillmentStatus.UNFULFILLED,
      items: dto.items.map((item) =>
        this.orderItemRepository.create({
          productId: item.productId,
          variantId: item.variantId,
          productName: item.productName,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          attributes: item.attributes,
          imageUrl: item.imageUrl,
        }),
      ),
      subtotal,
      tax,
      shipping: 0,
      discount: 0,
      total,
      currency: 'USD',
      shippingAddress: dto.shippingAddress,
      billingAddress: dto.billingAddress,
      shippingMethod: dto.shippingMethod,
      customerNote: dto.customerNote,
    });

    const savedOrder = await this.orderRepository.save(order);

    await this.customerRepository.increment({ id: dto.customerId }, 'totalOrders', 1);
    await this.customerRepository.increment({ id: dto.customerId }, 'totalSpent', total);

    await this.eventEmitter.emitAsync('order.created', {
      order: savedOrder,
      tenantId,
    });

    this.logger.log(`Created order ${savedOrder.orderNumber} for tenant ${tenantId}`);
    return savedOrder;
  }

  async findAll(tenantId: string, options?: {
    status?: OrderStatus;
    customerId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ orders: Order[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.customer', 'customer')
      .orderBy('order.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (options?.status) {
      query.andWhere('order.status = :status', { status: options.status });
    }

    if (options?.customerId) {
      query.andWhere('order.customerId = :customerId', {
        customerId: options.customerId,
      });
    }

    const [orders, total] = await query.getManyAndCount();
    return { orders, total };
  }

  async findOne(id: string, tenantId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'customer'],
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string, tenantId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
      relations: ['items', 'customer'],
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderNumber} not found`);
    }

    return order;
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    tenantId: string,
  ): Promise<Order> {
    const order = await this.findOne(id, tenantId);

    const previousStatus = order.status;
    order.status = status;

    const updatedOrder = await this.orderRepository.save(order);

    await this.eventEmitter.emitAsync('order.statusChanged', {
      order: updatedOrder,
      previousStatus,
      newStatus: status,
      tenantId,
    });

    return updatedOrder;
  }

  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
    tenantId: string,
    transactionId?: string,
  ): Promise<Order> {
    const order = await this.findOne(id, tenantId);

    order.paymentStatus = paymentStatus;
    if (transactionId) {
      order.paymentTransactionId = transactionId;
    }
    if (paymentStatus === PaymentStatus.PAID) {
      order.paidAt = new Date();
    }

    return this.orderRepository.save(order);
  }

  async getCustomerOrders(customerId: string, tenantId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  private async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0');
    return `ORD-${year}${month}-${random}`;
  }
}
