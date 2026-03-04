import { PluginContext } from '@ecommerce/plugin-sdk';
import { ReviewService, CreateReviewDto } from './services/review.service';
import { ReviewsPluginConfig } from './index';

export function registerRoutes(
  context: PluginContext,
  reviewService: ReviewService,
  config: ReviewsPluginConfig,
) {
  // Public routes
  context.registerRoute('GET', '/reviews/product/:productId', async (req: any) => {
    const { productId } = req.params;
    return reviewService.findByProductId(productId, context, {
      status: 'approved',
      sortBy: req.query.sortBy || 'newest',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    });
  });

  context.registerRoute('POST', '/reviews', async (req: any) => {
    const dto: CreateReviewDto = req.body;
    return reviewService.create(dto, context);
  });

  context.registerRoute('PUT', '/reviews/:id', async (req: any) => {
    // Update own review
    return reviewService.moderate(req.params.id, 'approved', context);
  });

  context.registerRoute('DELETE', '/reviews/:id', async (req: any) => {
    await reviewService.delete(req.params.id, req.userId, context);
    return { success: true };
  });

  context.registerRoute('POST', '/reviews/:id/helpful', async (req: any) => {
    await reviewService.markHelpful(req.params.id, req.userId, context);
    return { success: true };
  });

  // Admin routes
  context.registerRoute('GET', '/admin/reviews', async (req: any) => {
    return {
      reviews: [],
      total: 0,
      pendingCount: 0,
    };
  });

  context.registerRoute('PUT', '/admin/reviews/:id/moderate', async (req: any) => {
    const { status } = req.body;
    return reviewService.moderate(req.params.id, status, context);
  });

  context.registerRoute('GET', '/admin/reviews/stats', async (req: any) => {
    return {
      totalReviews: 0,
      averageRating: 0,
      pendingCount: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  });
}
