import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Plugin } from '@ecommerce/database';
import { PluginManifest, PluginInstance } from '@ecommerce/plugin-sdk';

export interface InstallPluginDto {
  pluginId: string;
  settings?: Record<string, any>;
}

export interface UpdatePluginConfigDto {
  enabled?: boolean;
  settings?: Record<string, any>;
}

@Injectable()
export class PluginService {
  private readonly logger = new Logger(PluginService.name);
  private activePlugins: Map<string, PluginInstance> = new Map();

  constructor(
    @InjectRepository(Plugin)
    private pluginRepository: Repository<Plugin>,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  // ============================================
  // Marketplace Operations
  // ============================================

  async getMarketplacePlugins(options?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ plugins: Plugin[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.pluginRepository
      .createQueryBuilder('plugin')
      .where('plugin.isPublished = true');

    if (options?.category) {
      query.andWhere(':category = ANY(plugin.categories)', {
        category: options.category,
      });
    }

    if (options?.search) {
      query.andWhere(
        '(plugin.displayName ILIKE :search OR plugin.description ILIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    query.orderBy('plugin.downloads', 'DESC').skip(skip).take(limit);

    const [plugins, total] = await query.getManyAndCount();
    return { plugins, total };
  }

  async getPluginDetails(id: string): Promise<Plugin> {
    const plugin = await this.pluginRepository.findOne({ where: { id } });

    if (!plugin) {
      throw new NotFoundException(`Plugin ${id} not found`);
    }

    return plugin;
  }

  // ============================================
  // Tenant Plugin Operations
  // ============================================

  async getInstalledPlugins(tenantId: string, schemaName: string): Promise<any[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      const result = await queryRunner.query(
        `SELECT * FROM plugin_config WHERE enabled = true`,
      );
      return result.rows || [];
    } finally {
      await queryRunner.release();
    }
  }

  async installPlugin(
    pluginId: string,
    tenantId: string,
    schemaName: string,
    settings?: Record<string, any>,
  ): Promise<any> {
    // Get plugin from marketplace
    const plugin = await this.pluginRepository.findOne({ where: { id: pluginId } });

    if (!plugin) {
      throw new NotFoundException(`Plugin ${pluginId} not found in marketplace`);
    }

    const manifest: PluginManifest = plugin.manifest as any;

    // Check dependencies
    const installedPlugins = await this.getInstalledPlugins(tenantId, schemaName);
    const installedIds = installedPlugins.map((p) => p.plugin_id);

    for (const dep of manifest.dependencies.plugins) {
      if (!installedIds.includes(dep)) {
        throw new BadRequestException(
          `Missing dependency: Plugin ${dep} must be installed first`,
        );
      }
    }

    // Run plugin migrations if any
    await this.runPluginMigrations(schemaName, manifest);

    // Insert plugin config
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `INSERT INTO plugin_config (id, plugin_id, enabled, settings, installed_at)
         VALUES (uuid_generate_v4(), $1, true, $2, NOW())
         ON CONFLICT (plugin_id) DO UPDATE SET enabled = true, settings = $2`,
        [pluginId, JSON.stringify(settings || {})],
      );

      // Emit event
      await this.eventEmitter.emitAsync('plugin.installed', {
        pluginId,
        tenantId,
        schemaName,
      });

      this.logger.log(`Installed plugin ${pluginId} for tenant ${tenantId}`);

      return {
        id: pluginId,
        name: plugin.displayName,
        enabled: true,
        settings: settings || {},
      };
    } finally {
      await queryRunner.release();
    }
  }

  async uninstallPlugin(
    pluginId: string,
    tenantId: string,
    schemaName: string,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `DELETE FROM plugin_config WHERE plugin_id = $1`,
        [pluginId],
      );

      // Emit event
      await this.eventEmitter.emitAsync('plugin.uninstalled', {
        pluginId,
        tenantId,
        schemaName,
      });

      this.logger.log(`Uninstalled plugin ${pluginId} for tenant ${tenantId}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updatePluginConfig(
    pluginId: string,
    tenantId: string,
    schemaName: string,
    dto: UpdatePluginConfigDto,
  ): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      const updates: string[] = [];
      const values: any[] = [pluginId];
      let paramIndex = 2;

      if (dto.enabled !== undefined) {
        updates.push(`enabled = $${paramIndex}`);
        values.push(dto.enabled);
        paramIndex++;
      }

      if (dto.settings !== undefined) {
        updates.push(`settings = $${paramIndex}`);
        values.push(JSON.stringify(dto.settings));
        paramIndex++;
      }

      updates.push(`updated_at = NOW()`);

      await queryRunner.query(
        `UPDATE plugin_config SET ${updates.join(', ')} WHERE plugin_id = $1`,
        values,
      );

      return this.getPluginConfig(pluginId, schemaName);
    } finally {
      await queryRunner.release();
    }
  }

  async getPluginConfig(pluginId: string, schemaName: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      const result = await queryRunner.query(
        `SELECT * FROM plugin_config WHERE plugin_id = $1`,
        [pluginId],
      );
      return result.rows?.[0] || null;
    } finally {
      await queryRunner.release();
    }
  }

  // ============================================
  // Hook Execution
  // ============================================

  async executeHook<T = any>(
    event: string,
    tenantId: string,
    schemaName: string,
    data: any,
  ): Promise<T[]> {
    const installedPlugins = await this.getInstalledPlugins(tenantId, schemaName);
    const results: T[] = [];

    for (const pluginConfig of installedPlugins) {
      const plugin = await this.pluginRepository.findOne({
        where: { id: pluginConfig.plugin_id },
      });

      if (!plugin) continue;

      const manifest: PluginManifest = plugin.manifest as any;
      const hooks = manifest.hooks?.events || [];

      if (hooks.includes(event)) {
        try {
          // In production, execute in sandbox
          const result = await this.executePluginHook(
            plugin.id,
            event,
            data,
            pluginConfig.settings,
            tenantId,
            schemaName,
          );
          results.push(result);
        } catch (error: unknown) {
          this.logger.error(
            `Plugin ${plugin.id} hook ${event} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          );
        }
      }
    }

    return results;
  }

  private async executePluginHook(
    pluginId: string,
    event: string,
    data: any,
    settings: Record<string, any>,
    tenantId: string,
    schemaName: string,
  ): Promise<any> {
    // In a real implementation, this would:
    // 1. Load the plugin code from S3
    // 2. Run in VM2 sandbox
    // 3. Execute the hook handler
    // For now, return mock result
    this.logger.debug(`Executing hook ${event} for plugin ${pluginId}`);
    return { pluginId, event, processed: true };
  }

  private async runPluginMigrations(
    schemaName: string,
    manifest: PluginManifest,
  ): Promise<void> {
    if (!manifest.migrations) return;

    // In production, download and run migrations
    this.logger.log(`Running migrations for ${manifest.name} in ${schemaName}`);
  }
}
