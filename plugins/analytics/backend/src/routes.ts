import { PluginContext } from '@ecommerce/plugin-sdk';
import { AnalyticsService } from './services/analytics.service';
import { ReportService } from './services/report.service';
import { TrackingService, TrackEventDto } from './services/tracking.service';

export function registerRoutes(
  context: PluginContext,
  analyticsService: AnalyticsService,
  reportService: ReportService,
  trackingService: TrackingService,
) {
  // Dashboard
  context.registerRoute('GET', '/admin/analytics/dashboard', async (req: any) => {
    return analyticsService.getDashboard(context);
  });

  context.registerRoute('GET', '/admin/analytics/revenue', async (req: any) => {
    const { period, start, end } = req.query;
    return analyticsService.getRevenueOverTime(
      context,
      period || 'day',
      start ? new Date(start) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end ? new Date(end) : new Date(),
    );
  });

  context.registerRoute('GET', '/admin/analytics/products', async (req: any) => {
    const { limit = 10, period = 'month' } = req.query;
    return analyticsService.getTopProducts(context, limit, period);
  });

  context.registerRoute('GET', '/admin/analytics/funnel', async (req: any) => {
    return analyticsService.getConversionFunnel(context);
  });

  context.registerRoute('GET', '/admin/analytics/traffic', async (req: any) => {
    return analyticsService.getTrafficSources(context);
  });

  // Reports
  context.registerRoute('GET', '/admin/analytics/reports', async (req: any) => {
    return reportService.list(context);
  });

  context.registerRoute('POST', '/admin/analytics/reports', async (req: any) => {
    return reportService.create(req.body, req.userId, context);
  });

  context.registerRoute('GET', '/admin/analytics/reports/:id', async (req: any) => {
    return reportService.get(req.params.id, context);
  });

  context.registerRoute('DELETE', '/admin/analytics/reports/:id', async (req: any) => {
    await reportService.delete(req.params.id, context);
    return { success: true };
  });

  context.registerRoute('POST', '/admin/analytics/reports/:id/run', async (req: any) => {
    return reportService.run(req.params.id, context);
  });

  // Exports
  context.registerRoute('GET', '/admin/analytics/exports', async (req: any) => {
    return reportService.listExports(context);
  });

  context.registerRoute('POST', '/admin/analytics/export', async (req: any) => {
    const { type, format, start, end, filters } = req.body;
    return reportService.export(type, format, start, end, filters, req.userId, context);
  });

  context.registerRoute('GET', '/admin/analytics/exports/:id/download', async (req: any) => {
    return reportService.getExportFile(req.params.id, context);
  });

  // Tracking (public)
  context.registerRoute('POST', '/analytics/track', async (req: any) => {
    const event: TrackEventDto = req.body;
    await trackingService.track(event, context);
    return { success: true };
  });

  context.registerRoute('POST', '/analytics/pageview', async (req: any) => {
    const { path, referrer, sessionId } = req.body;
    await trackingService.trackPageView(
      path,
      req.userId,
      sessionId,
      referrer,
      context,
    );
    return { success: true };
  });
}
