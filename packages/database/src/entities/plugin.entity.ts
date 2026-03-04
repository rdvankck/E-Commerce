import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface PluginManifestData {
  name: string;
  version: string;
  displayName: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
}

@Entity('plugins')
export class Plugin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  displayName!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  author!: string;

  @Column()
  license!: string;

  @Column({ nullable: true })
  homepage!: string;

  @Column({ nullable: true })
  repository!: string;

  @Column({ type: 'jsonb' })
  manifest!: PluginManifestData;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ default: false })
  isFree!: boolean;

  @Column({ default: true })
  isPublished!: boolean;

  @Column({ nullable: true })
  publishedAt!: Date;

  @Column({ type: 'int', default: 0 })
  downloads!: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating!: number;

  @Column({ type: 'int', default: 0 })
  reviewCount!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  iconUrl!: string;

  @Column({ type: 'simple-array', nullable: true })
  categories!: string[];

  @Column({ type: 'jsonb', nullable: true })
  screenshots!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
