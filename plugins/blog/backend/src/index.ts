// Blog Plugin - Backend Entry Point

import { PluginContext, createPluginContext, runInPluginContext } from '@ecommerce/plugin-sdk';
import { BlogService } from './services/blog.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { registerHooks } from './hooks';
import { registerRoutes } from './routes';

export interface BlogPluginConfig {
  postsPerPage: number;
  enableComments: boolean;
  requireApproval: boolean;
  allowGuestPosts: boolean;
  defaultStatus: 'draft' | 'published';
}

export class BlogPlugin {
  private blogService: BlogService;
  private categoryService: CategoryService;
  private tagService: TagService;
  private config: BlogPluginConfig;

  constructor(config: BlogPluginConfig = {
    postsPerPage: 10,
    enableComments: true,
    requireApproval: false,
    allowGuestPosts: false,
    defaultStatus: 'draft',
  }) {
    this.config = config;
    this.blogService = new BlogService();
    this.categoryService = new CategoryService();
    this.tagService = new TagService();
  }

  async activate(context: PluginContext): Promise<void> {
    console.log(`Activating Blog plugin for tenant ${context.tenantId}`);

    // Run migrations
    await this.runMigrations(context);

    // Register hooks
    registerHooks(context, this.blogService);

    // Register routes
    registerRoutes(context, this.blogService, this.categoryService, this.tagService);
  }

  async deactivate(context: PluginContext): Promise<void> {
    console.log(`Deactivating Blog plugin for tenant ${context.tenantId}`);
    // Cleanup would go here
  }

  private async runMigrations(context: PluginContext): Promise<void> {
    // In production, this would run SQL migrations against the tenant schema
    const migrations = `
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        author_id UUID NOT NULL,
        category_id UUID,
        status VARCHAR(20) DEFAULT 'draft',
        featured_image VARCHAR(500),
        seo JSONB,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog_categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        parent_id UUID REFERENCES blog_categories(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog_tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog_post_tags (
        post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
        tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      );

      CREATE TABLE IF NOT EXISTS blog_comments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
        author_name VARCHAR(255),
        author_email VARCHAR(255),
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        parent_id UUID REFERENCES blog_comments(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX idx_blog_posts_status ON blog_posts(status);
      CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
      CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
    `;

    // Execute migrations against tenant schema
    // await context.executeQuery(migrations);
    console.log('Blog plugin migrations completed');
  }
}

export default BlogPlugin;
