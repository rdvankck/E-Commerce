import { PluginContext } from '@ecommerce/plugin-sdk';
import { BlogService, CreatePostDto, UpdatePostDto } from './services/blog.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';

export function registerRoutes(
  context: PluginContext,
  blogService: BlogService,
  categoryService: CategoryService,
  tagService: TagService,
) {
  // Storefront routes (public)
  context.registerRoute('GET', '/blog/posts', async (req: any, res: any) => {
    const result = await blogService.findAll(context, {
      status: 'published',
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
    });
    return result;
  });

  context.registerRoute('GET', '/blog/posts/:slug', async (req: any, res: any) => {
    const post = await blogService.findBySlug(req.params.slug, context);
    if (!post || post.status !== 'published') {
      return { error: 'Post not found' };
    }
    return post;
  });

  context.registerRoute('GET', '/blog/categories', async (req: any, res: any) => {
    return categoryService.findAll(context);
  });

  context.registerRoute('GET', '/blog/tags', async (req: any, res: any) => {
    return tagService.findAll(context);
  });

  // Admin routes (require authentication)
  context.registerRoute('GET', '/admin/blog/posts', async (req: any, res: any) => {
    return blogService.findAll(context, {
      status: req.query.status,
      categoryId: req.query.categoryId,
      search: req.query.search,
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 20,
    });
  });

  context.registerRoute('POST', '/admin/blog/posts', async (req: any, res: any) => {
    return blogService.create(req.body as CreatePostDto, req.userId, context);
  });

  context.registerRoute('PUT', '/admin/blog/posts/:id', async (req: any, res: any) => {
    return blogService.update(req.params.id, req.body as UpdatePostDto, context);
  });

  context.registerRoute('DELETE', '/admin/blog/posts/:id', async (req: any, res: any) => {
    await blogService.delete(req.params.id, context);
    return { success: true };
  });

  context.registerRoute('POST', '/admin/blog/posts/:id/publish', async (req: any, res: any) => {
    return blogService.publish(req.params.id, context);
  });

  context.registerRoute('POST', '/admin/blog/posts/:id/unpublish', async (req: any, res: any) => {
    return blogService.unpublish(req.params.id, context);
  });

  // Category management
  context.registerRoute('POST', '/admin/blog/categories', async (req: any, res: any) => {
    return categoryService.create(req.body, context);
  });

  context.registerRoute('PUT', '/admin/blog/categories/:id', async (req: any, res: any) => {
    return categoryService.update(req.params.id, req.body, context);
  });

  context.registerRoute('DELETE', '/admin/blog/categories/:id', async (req: any, res: any) => {
    await categoryService.delete(req.params.id, context);
    return { success: true };
  });
}
