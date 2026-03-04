import { Logger } from '@nestjs/common';
import { PluginContext } from '@ecommerce/plugin-sdk';
import { AnalyticsPluginConfig } from '../index';

export interface TrackEventDto {
  eventType: 'page_view' | 'click' | 'custom' | 'conversion';
  eventName: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId?: string;
  deviceInfo?: {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    language: string;
  };
}

export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);
  private eventBuffer: TrackEventDto[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(private config: AnalyticsPluginConfig) {
    // Flush events every 10 seconds
    this.flushInterval = setInterval(() => this.flush(), 10000);
  }

  async track(event: TrackEventDto, context: PluginContext): Promise<void> {
    this.eventBuffer.push({
      ...event,
    });

    // Flush immediately if buffer is large
    if (this.eventBuffer.length >= 100) {
      await this.flush(context);
    }
  }

  async flush(context?: PluginContext): Promise<void> {
    if (this.eventBuffer.length === 0) return;

    const events = [...this.eventBuffer];
    this.eventBuffer = [];

    // In production, batch insert into database
    this.logger.debug(`Flushing ${events.length} analytics events`);

    // Could also send to external services like Mixpanel, Segment
    if (this.config.externalApi) {
      // await this.sendToExternalService(events);
    }
  }

  async trackPageView(
    path: string,
    userId: string | undefined,
    sessionId: string,
    referrer: string | null,
    context: PluginContext,
  ): Promise<void> {
    await this.track(
      {
        eventType: 'page_view',
        eventName: 'page_view',
        properties: {
          path,
          referrer,
        },
        userId,
        sessionId,
      },
      context,
    );
  }

  async trackConversion(
    type: string,
    orderId: string,
    revenue: number,
    userId: string,
    sessionId: string,
    context: PluginContext,
  ): Promise<void> {
    await this.track(
      {
        eventType: 'conversion',
        eventName: type,
        properties: {
          orderId,
          revenue,
        },
        userId,
        sessionId,
      },
      context,
    );
  }

  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
  }
}
