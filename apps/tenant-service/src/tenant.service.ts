import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import {
  Tenant,
  TenantStatus,
  SubscriptionPlan,
  BillingCycle,
} from '@ecommerce/database';

export interface CreateTenantDto {
  subdomain: string;
  name: string;
  description?: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
  plan?: SubscriptionPlan;
  billingCycle?: BillingCycle;
}

export interface UpdateTenantDto {
  name?: string;
  description?: string;
  plan?: SubscriptionPlan;
  billingCycle?: BillingCycle;
  status?: TenantStatus;
  features?: string[];
  maxProducts?: number;
  maxOrders?: number;
  maxStaff?: number;
}

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateTenantDto): Promise<Tenant> {
    const existing = await this.tenantRepository.findOne({
      where: { subdomain: dto.subdomain },
    });

    if (existing) {
      throw new ConflictException(`Subdomain ${dto.subdomain} already exists`);
    }

    const tenant = this.tenantRepository.create({
      subdomain: dto.subdomain,
      name: dto.name,
      description: dto.description || '',
      ownerName: dto.ownerName,
      ownerEmail: dto.ownerEmail,
      ownerPhone: dto.ownerPhone || '',
      plan: dto.plan || SubscriptionPlan.STARTER,
      billingCycle: dto.billingCycle || BillingCycle.MONTHLY,
      status: TenantStatus.TRIAL,
      storeName: `${dto.name} Store`,
      currency: 'USD',
      timezone: 'UTC',
      locale: 'en',
      features: [],
      maxProducts: dto.plan === SubscriptionPlan.ENTERPRISE ? 100000 : dto.plan === SubscriptionPlan.PROFESSIONAL ? 10000 : 1000,
      maxOrders: dto.plan === SubscriptionPlan.ENTERPRISE ? 100000 : dto.plan === SubscriptionPlan.PROFESSIONAL ? 50000 : 10000,
      maxStaff: dto.plan === SubscriptionPlan.ENTERPRISE ? 100 : dto.plan === SubscriptionPlan.PROFESSIONAL ? 20 : 5,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
    } as unknown as Tenant);

    const savedTenant = await this.tenantRepository.save(tenant);

    const schemaName = `tenant_${savedTenant.id.replace(/-/g, '_')}`;
    await this.createTenantSchema(schemaName);

    await this.eventEmitter.emitAsync('tenant.created', {
      tenant: savedTenant,
    });

    this.logger.log(`Created tenant: ${savedTenant.id} with subdomain: ${savedTenant.subdomain}`);

    return savedTenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });

    if (!tenant) {
      throw new NotFoundException(`Tenant ${id} not found`);
    }

    return tenant;
  }

  async findBySubdomain(subdomain: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { subdomain },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with subdomain ${subdomain} not found`);
    }

    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);

    Object.assign(tenant, {
      name: dto.name ?? tenant.name,
      description: dto.description ?? tenant.description,
      plan: dto.plan ?? tenant.plan,
      billingCycle: dto.billingCycle ?? tenant.billingCycle,
      status: dto.status ?? tenant.status,
      features: dto.features ?? tenant.features,
      maxProducts: dto.maxProducts ?? tenant.maxProducts,
      maxOrders: dto.maxOrders ?? tenant.maxOrders,
      maxStaff: dto.maxStaff ?? tenant.maxStaff,
    });

    return this.tenantRepository.save(tenant);
  }

  async activate(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    tenant.status = TenantStatus.ACTIVE;
    return this.tenantRepository.save(tenant);
  }

  async suspend(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);
    tenant.status = TenantStatus.SUSPENDED;
    return this.tenantRepository.save(tenant);
  }

  async delete(id: string): Promise<void> {
    const tenant = await this.findOne(id);
    const schemaName = `tenant_${id.replace(/-/g, '_')}`;

    await this.dropTenantSchema(schemaName);
    await this.tenantRepository.remove(tenant);

    this.logger.log(`Deleted tenant: ${id}`);
  }

  private async createTenantSchema(schemaName: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    await queryRunner.release();

    this.logger.log(`Created schema: ${schemaName}`);
  }

  private async dropTenantSchema(schemaName: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);

    await queryRunner.release();

    this.logger.log(`Dropped schema: ${schemaName}`);
  }
}
