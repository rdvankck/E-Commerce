import { PluginContext } from '@ecommerce/plugin-sdk';
import { ReviewService } from './services/review.service';
import { ReviewsPluginConfig } from './index';

export function registerHooks(
  context: PluginContext,
  reviewService: ReviewService,
  config: ReviewsPluginConfig,
) {
  // Send review reminder after order is delivered
  context.onEvent('order.delivered', async (data: any) => {
    if (!config.sendReminderEmails) return;

    const { order, tenantId } = data;

    // Schedule reminder email for X days after delivery
    console.log(`Scheduling review reminder for order ${order.id} in ${config.reminderDelayDays} days`);

    // In production, this would schedule a job to send an email
    // asking customers to review their purchased products
  });

  // Track product views for review prompts
  context.onEvent('product.afterView', async (data: any) => {
    const { productId, customerId } = data;

    if (!customerId) return;

    // Could check if customer has purchased but not reviewed
    // and show a prompt to review
  });
}
