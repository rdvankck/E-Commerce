import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TenantStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
}

export enum SubscriptionPlan {
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

export enum BillingCycle {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum BillingStatus {
  CURRENT = 'current',
  PAST_DUE = 'past_due',
  CANCELLED = 'cancelled',
}

export enum TenantFeature {
  PRODUCTS = 'products',
  ORDERS = 'orders',
  CUSTOMERS = 'customers',
  PLUGINS = 'plugins',
  ANALYTICS = 'analytics',
}

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  subdomain!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: TenantStatus, default: TenantStatus.TRIAL })
  status!: TenantStatus;

  @Column()
  ownerName!: string;

  @Column()
  ownerEmail!: string;

  @Column({ nullable: true })
  ownerPhone!: string;

  @Column({ type: 'enum', enum: SubscriptionPlan, default: SubscriptionPlan.STARTER })
  plan!: SubscriptionPlan;

  @Column({ type: 'enum', enum: BillingCycle, default: BillingCycle.MONTHLY })
  billingCycle!: BillingCycle;

  @Column({ type: 'enum', enum: BillingStatus, default: BillingStatus.CURRENT })
  billingStatus!: BillingStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  monthlyPrice!: number;

  @Column({ type: 'varchar', length: 255, default: 'My Store' })
  storeName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storeDescription!: string;

  @Column({ type: 'varchar', length: 7, default: 'USD' })
  currency!: string;

  @Column({ type: 'varchar', length: 10, default: 'en' })
  timezone!: string;

  @Column({ type: 'varchar', length: 5, default: 'en' })
  locale!: string;

  @Column({ type: 'simple-array' })
  features!: TenantFeature[];

  @Column({ type: 'int', default: 100 })
  maxProducts!: number;

  @Column({ type: 'int', default: 1000 })
  maxOrders!: number;

  @Column({ type: 'int', default: 10 })
  maxStaff!: number;

  @Column()
  trialEndsAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  get schemaName(): string {
    return `tenant_${this.id.replace(/-/g, '_')}`;
  }
}
