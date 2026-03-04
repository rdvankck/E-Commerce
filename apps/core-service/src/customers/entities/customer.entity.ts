import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'jsonb', nullable: true })
  addresses: Record<string, any>[];

  @Column({ nullable: true })
  defaultShippingAddressId: string;

  @Column({ nullable: true })
  defaultBillingAddressId: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isGuest: boolean;

  @Column({ default: false })
  acceptsMarketing: boolean;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'int', default: 0 })
  totalOrders: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSpent: number;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @OneToMany(() => 'Order', (order: any) => order.customer)
  orders: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
