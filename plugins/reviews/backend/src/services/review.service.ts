import { Logger } from '@nestjs/common';
import { PluginContext } from '@ecommerce/plugin-sdk';
import { ReviewsPluginConfig } from '../index';

export interface CreateReviewDto {
  productId: string;
  customerId: string;
  orderId?: string;
  rating: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  photos?: string[];
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  orderId?: string;
  rating: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  photos?: string[];
  status: 'pending' | 'approved' | 'rejected';
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(private config: ReviewsPluginConfig) {}

  async create(dto: CreateReviewDto, context: PluginContext): Promise<Review> {
    // Validate rating
    if (dto.rating < 1 || dto.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Validate content length
    if (dto.content.length < this.config.minReviewLength) {
      throw new Error(`Review must be at least ${this.config.minReviewLength} characters`);
    }
    if (dto.content.length > this.config.maxReviewLength) {
      throw new Error(`Review must be less than ${this.config.maxReviewLength} characters`);
    }

    // Validate photos
    if (dto.photos && dto.photos.length > this.config.maxPhotos) {
      throw new Error(`Maximum ${this.config.maxPhotos} photos allowed`);
    }

    // Check if purchase is required
    let verifiedPurchase = false;
    if (this.config.requirePurchase && dto.orderId) {
      // In production, verify the order contains this product
      verifiedPurchase = true;
    }

    const review: Review = {
      id: crypto.randomUUID(),
      productId: dto.productId,
      customerId: dto.customerId,
      orderId: dto.orderId,
      rating: dto.rating,
      title: dto.title,
      content: dto.content,
      pros: dto.pros,
      cons: dto.cons,
      photos: dto.photos,
      status: this.config.moderateReviews ? 'pending' : 'approved',
      verifiedPurchase,
      helpfulCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.logger.log(`Created review: ${review.id} for product ${review.productId}`);

    return review;
  }

  async findByProductId(
    productId: string,
    context: PluginContext,
    options?: {
      status?: 'pending' | 'approved' | 'rejected';
      sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
      page?: number;
      limit?: number;
    },
  ): Promise<{ reviews: Review[]; total: number; stats: ReviewStats }> {
    // In production, query from database
    const stats: ReviewStats = {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };

    return { reviews: [], total: 0, stats };
  }

  async moderate(
    id: string,
    status: 'approved' | 'rejected',
    context: PluginContext,
  ): Promise<Review> {
    this.logger.log(`Moderated review ${id}: ${status}`);
    // In production, update in database
    return {} as Review;
  }

  async markHelpful(
    reviewId: string,
    customerId: string,
    context: PluginContext,
  ): Promise<void> {
    // In production, insert into review_helpful table
    this.logger.log(`Marked review ${reviewId} as helpful by ${customerId}`);
  }

  async delete(id: string, customerId: string, context: PluginContext): Promise<void> {
    // In production, delete from database (only by review author or admin)
    this.logger.log(`Deleted review ${id}`);
  }
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}
