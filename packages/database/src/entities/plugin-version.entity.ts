import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plugin } from './plugin.entity';

@Entity('plugin_versions')
export class PluginVersion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  pluginId!: string;

  @ManyToOne(() => Plugin)
  @JoinColumn({ name: 'pluginId' })
  plugin!: Plugin;

  @Column()
  version!: string;

  @Column({ type: 'jsonb' })
  manifest!: Record<string, unknown>;

  @Column({ type: 'varchar', length: 500, nullable: true })
  downloadUrl!: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  checksum!: string;

  @Column({ type: 'int', default: 0 })
  size!: number;

  @Column({ nullable: true })
  changelog!: string;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ nullable: true })
  publishedAt!: Date;

  @Column({ type: 'int', default: 0 })
  downloads!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
