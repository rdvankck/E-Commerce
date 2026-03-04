// Product Reviews Plugin - Backend Entry Point

import { PluginContext } from '@ecommerce/plugin-sdk';
import { ReviewService } from './services/review.service';
import { registerHooks } from './hooks';
import { registerRoutes } from './routes';

export interface ReviewsPluginConfig {
  requirePurchase: boolean;
  moderateReviews: boolean;
  allowPhotos: boolean;
  maxPhotos: number;
  minReviewLength: number;
  maxReviewLength: number;
  sendReminderEmails: boolean;
  reminderDelayDays: number;
}

export class ReviewsPlugin {
  private reviewService: ReviewService;
  private config: ReviewsPluginConfig;

  constructor(config: Partial<ReviewsPluginConfig> = {}) {
    this.config = {
      requirePurchase: true,
      moderateReviews: true,
      allowPhotos: true,
      maxPhotos: 5,
      minReviewLength: 10,
      maxReviewLength: 5000,
      sendReminderEmails: true,
      reminderDelayDays: 7,
      ...config,
    };
    this.reviewService = new ReviewService(this.config);
  }

  async activate(context: PluginContext): Promise<void> {
    console.log(`Activating Reviews plugin for tenant ${context.tenantId}`);

    // Run migrations
    await this.runMigrations(context);

    // Register hooks
    registerHooks(context, this.reviewService, this.config);

    // Register routes
    registerRoutes(context, this.reviewService, this.config);
  }

  async deactivate(context: PluginContext): Promise<void> {
    console.log(`Deactivating Reviews plugin for tenant ${context.tenantId}`);
  }

  private async runMigrations(context: PluginContext): Promise<void> {
    const migrations = `
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        product_id UUID NOT NULL,
        customer_id UUID NOT NULL,
        order_id UUID,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        content TEXT NOT NULL,
        pros TEXT[],
        cons TEXT[],
        photos TEXT[],
        status VARCHAR(20) DEFAULT 'pending',
        verified_purchase BOOLEAN DEFAULT false,
        helpful_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(product_id, customer_id)
      );

      CREATE TABLE IF NOT EXISTS review_responses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        author_type VARCHAR(20) NOT NULL,
        author_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS review_helpful (
        review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
        customer_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (review_id, customer_id)
      );

      CREATE INDEX idx_reviews_product ON reviews(product_id);
      CREATE INDEX idx_reviews_status ON reviews(status);
      CREATE INDEX idx_reviews_rating ON reviews(rating);
      CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
    `;

    console.log('Reviews plugin migrations completed');
  }
}

export default ReviewsPlugin;
