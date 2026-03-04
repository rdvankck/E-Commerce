import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from './entities/customer.entity';

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  acceptsMarketing?: boolean;
  isGuest?: boolean;
}

export interface UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
  notes?: string;
}

export interface LoginCustomerDto {
  email: string;
  password: string;
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(
    dto: CreateCustomerDto,
    tenantId: string,
  ): Promise<{ customer: Customer; token: string }> {
    const existing = await this.customerRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : undefined;

    const customer = this.customerRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
      phone: dto.phone,
      acceptsMarketing: dto.acceptsMarketing || false,
      isGuest: dto.isGuest || false,
    });

    const savedCustomer = await this.customerRepository.save(customer);
    const token = `customer_token_${savedCustomer.id}`;

    return { customer: savedCustomer, token };
  }

  async login(
    dto: LoginCustomerDto,
    tenantId: string,
  ): Promise<{ customer: Customer; token: string }> {
    const customer = await this.customerRepository.findOne({
      where: { email: dto.email },
    });

    if (!customer || !customer.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, customer.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.customerRepository.update(
      { id: customer.id },
      { lastLoginAt: new Date() },
    );

    const token = `customer_token_${customer.id}`;
    return { customer, token };
  }

  async findAll(tenantId: string, options?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ customers: Customer[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.customerRepository.createQueryBuilder('customer');

    if (options?.search) {
      query.andWhere(
        '(customer.email ILIKE :search OR customer.firstName ILIKE :search OR customer.lastName ILIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    query.orderBy('customer.createdAt', 'DESC').skip(skip).take(limit);

    const [customers, total] = await query.getManyAndCount();
    return { customers, total };
  }

  async findOne(id: string, tenantId: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer;
  }

  async findByEmail(email: string, tenantId: string): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { email },
    });
  }

  async update(
    id: string,
    dto: UpdateCustomerDto,
    tenantId: string,
  ): Promise<Customer> {
    const customer = await this.findOne(id, tenantId);

    Object.assign(customer, {
      firstName: dto.firstName ?? customer.firstName,
      lastName: dto.lastName ?? customer.lastName,
      phone: dto.phone ?? customer.phone,
      acceptsMarketing: dto.acceptsMarketing ?? customer.acceptsMarketing,
      notes: dto.notes ?? customer.notes,
    });

    return this.customerRepository.save(customer);
  }

  async updateStats(
    id: string,
    orderAmount: number,
    tenantId: string,
  ): Promise<void> {
    await this.customerRepository.increment({ id }, 'totalOrders', 1);
    await this.customerRepository.increment({ id }, 'totalSpent', orderAmount);
  }

  async addAddress(
    id: string,
    address: any,
    tenantId: string,
  ): Promise<Customer> {
    const customer = await this.findOne(id, tenantId);

    const addresses = customer.addresses || [];
    address.id = address.id || `addr_${Date.now()}`;
    addresses.push(address);

    customer.addresses = addresses;

    return this.customerRepository.save(customer);
  }

  async removeAddress(
    id: string,
    addressId: string,
    tenantId: string,
  ): Promise<Customer> {
    const customer = await this.findOne(id, tenantId);

    customer.addresses = (customer.addresses || []).filter(
      (a: any) => a.id !== addressId,
    );

    return this.customerRepository.save(customer);
  }
}
