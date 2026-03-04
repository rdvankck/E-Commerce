import { PluginContext } from '@ecommerce/plugin-sdk';
import { TrackingService } from './services/tracking.service';
import { AnalyticsService } from './services/analytics.service';

export function registerHooks(
  context: PluginContext,
  trackingService: TrackingService,
  analyticsService: AnalyticsService,
) {
  // Track product views
  context.onEvent('product.afterView', async (data: any) => {
    await trackingService.track(
      {
        eventType: 'custom',
        eventName: 'product_viewed',
        properties: {
          productId: data.productId,
          productName: data.product?.name,
          category: data.product?.category?.name,
          price: data.product?.variants?.[0]?.price,
        },
        userId: data.userId,
        sessionId: data.sessionId,
      },
      context,
    );
  });

  // Track orders
  context.onEvent('order.created', async (data: any) => {
    await trackingService.track(
      {
        eventType: 'conversion',
        eventName: 'order_placed',
        properties: {
          orderId: data.order?.id,
          orderNumber: data.order?.orderNumber,
          total: data.order?.total,
          itemCount: data.order?.items?.length,
        },
        userId: data.order?.customerId,
        sessionId: data.sessionId,
      },
      context,
    );
  });

  // Track payments
  context.onEvent('payment.received', async (data: any) => {
    await trackingService.trackConversion(
      'purchase',
      data.orderId,
      data.amount,
      data.customerId,
      data.sessionId,
      context,
    );
  });

  // Track cart updates
  context.onEvent('cart.updated', async (data: any) => {
    await trackingService.track(
      {
        eventType: 'custom',
        eventName: 'cart_updated',
        properties: {
          cartId: data.cartId,
          itemCount: data.items?.length,
          total: data.total,
          action: data.action, // 'add', 'remove', 'update'
        },
        userId: data.userId,
        sessionId: data.sessionId,
      },
      context,
    );
  });

  // Track checkout started
  context.onEvent('checkout.started', async (data: any) => {
    await trackingService.track(
      {
        eventType: 'conversion',
        eventName: 'checkout_started',
        properties: {
          cartId: data.cartId,
          total: data.total,
          itemCount: data.items?.length,
        },
        userId: data.userId,
        sessionId: data.sessionId,
      },
      context,
    );
  });

  // Track customer registration
  context.onEvent('customer.registered', async (data: any) => {
    await trackingService.track(
      {
        eventType: 'custom',
        eventName: 'customer_registered',
        properties: {
          customerId: data.customerId,
          email: data.email,
        },
        userId: data.customerId,
        sessionId: data.sessionId,
      },
      context,
    );
  });
}
