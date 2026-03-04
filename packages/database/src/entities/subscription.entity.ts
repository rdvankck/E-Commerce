import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant, SubscriptionPlan, BillingCycle, BillingStatus } from './tenant.entity';

export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  INVOICE = 'invoice',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tenantId!: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenantId' })
  tenant!: Tenant;

  @Column({ type: 'enum', enum: SubscriptionPlan })
  plan!: SubscriptionPlan;

  @Column({ type: 'enum', enum: BillingCycle })
  billingCycle!: BillingCycle;

  @Column({ type: 'enum', enum: BillingStatus })
  status!: BillingStatus;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod!: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency!: string;

  @Column({ nullable: true })
  stripeSubscriptionId!: string;

  @Column({ nullable: true })
  stripeCustomerId!: string;

  @Column({ nullable: true })
  currentPeriodStart!: Date;

  @Column({ nullable: true })
  currentPeriodEnd!: Date;

  @Column({ nullable: true })
  canceledAt!: Date;

  @Column({ default: false })
  cancelAtPeriodEnd!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
