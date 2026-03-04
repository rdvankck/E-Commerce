// Analytics Plugin - Backend Entry Point

import { PluginContext } from '@ecommerce/plugin-sdk';
import { AnalyticsService } from './services/analytics.service';
import { ReportService } from './services/report.service';
import { TrackingService } from './services/tracking.service';
import { registerHooks } from './hooks';
import { registerRoutes } from './routes';

export interface AnalyticsPluginConfig {
  trackPageViews: boolean;
  trackClicks: boolean;
  trackConversions: boolean;
  retentionDays: number;
  realTimeEnabled: boolean;
  exportFormats: string[];
}

export class AnalyticsPlugin {
  private analyticsService: AnalyticsService;
  private reportService: ReportService;
  private trackingService: TrackingService;
  private config: AnalyticsPluginConfig;

  constructor(config: Partial<AnalyticsPluginConfig> = {}) {
    this.config = {
      trackPageViews: true,
      trackClicks: true,
      trackConversions: true,
      retentionDays: 365,
      realTimeEnabled: true,
      exportFormats: ['csv', 'json', 'xlsx'],
      ...config,
    };
    this.analyticsService = new AnalyticsService(this.config);
    this.reportService = new ReportService(this.config);
    this.trackingService = new TrackingService(this.config);
  }

  async activate(context: PluginContext): Promise<void> {
    console.log(`Activating Analytics plugin for tenant ${context.tenantId}`);

    await this.runMigrations(context);

    registerHooks(context, this.trackingService, this.analyticsService);
    registerRoutes(context, this.analyticsService, this.reportService, this.trackingService);
  }

  async deactivate(context: PluginContext): Promise<void> {
    console.log(`Deactivating Analytics plugin for tenant ${context.tenantId}`);
  }

  private async runMigrations(context: PluginContext): Promise<void> {
    const migrations = `
      CREATE TABLE IF NOT EXISTS analytics_events (
        id BIGSERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        properties JSONB NOT NULL DEFAULT '{}',
        user_id UUID,
        session_id VARCHAR(255),
        device_info JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS analytics_page_views (
        id BIGSERIAL PRIMARY KEY,
        url VARCHAR(2000) NOT NULL,
        path VARCHAR(500) NOT NULL,
        referrer VARCHAR(2000),
        duration_ms INT,
        user_id UUID,
        session_id VARCHAR(255),
        product_id UUID,
        category_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS analytics_conversions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        session_id VARCHAR(255),
        user_id UUID,
        order_id UUID,
        revenue DECIMAL(10,2),
        conversion_type VARCHAR(50),
        attribution JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS analytics_reports (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        config JSONB NOT NULL,
        schedule VARCHAR(50),
        last_run TIMESTAMP,
        next_run TIMESTAMP,
        created_by UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS analytics_exports (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        report_id UUID REFERENCES analytics_reports(id),
        format VARCHAR(10) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        file_url VARCHAR(500),
        created_by UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP
      );

      CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
      CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);
      CREATE INDEX idx_analytics_page_views_path ON analytics_page_views(path);
      CREATE INDEX idx_analytics_page_views_created ON analytics_page_views(created_at);
      CREATE INDEX idx_analytics_conversions_created ON analytics_conversions(created_at);

      -- Partitioning for large datasets
      -- CREATE INDEX idx_analytics_events_partition ON analytics_events(created_at);
    `;

    console.log('Analytics plugin migrations completed');
  }
}

export default AnalyticsPlugin;
