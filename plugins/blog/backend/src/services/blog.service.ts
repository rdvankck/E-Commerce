import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PluginContext } from '@ecommerce/plugin-sdk';

export interface CreatePostDto {
  title: string;
  content: string;
  excerpt?: string;
  categoryId?: string;
  tagIds?: string[];
  status?: 'draft' | 'published';
  featuredImage?: string;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface UpdatePostDto extends Partial<CreatePostDto> {
  publishedAt?: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  authorId: string;
  categoryId?: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  seo?: any;
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);

  async create(
    dto: CreatePostDto,
    authorId: string,
    context: PluginContext,
  ): Promise<BlogPost> {
    const slug = this.generateSlug(dto.title);

    const post: BlogPost = {
      id: crypto.randomUUID(),
      title: dto.title,
      slug,
      content: dto.content,
      excerpt: dto.excerpt || this.generateExcerpt(dto.content),
      authorId,
      categoryId: dto.categoryId,
      status: dto.status || 'draft',
      featuredImage: dto.featuredImage,
      seo: dto.seo || {
        title: dto.title,
        description: dto.excerpt || this.generateExcerpt(dto.content),
        keywords: [],
      },
      tags: dto.tagIds || [],
      publishedAt: dto.status === 'published' ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In production, insert into database
    this.logger.log(`Created blog post: ${post.id} for tenant ${context.tenantId}`);

    return post;
  }

  async findAll(
    context: PluginContext,
    options?: {
      status?: 'draft' | 'published';
      categoryId?: string;
      tagId?: string;
      search?: string;
      page?: number;
      limit?: number;
    },
  ): Promise<{ posts: BlogPost[]; total: number }> {
    // In production, query from database
    return { posts: [], total: 0 };
  }

  async findBySlug(slug: string, context: PluginContext): Promise<BlogPost | null> {
    // In production, query from database
    return null;
  }

  async update(
    id: string,
    dto: UpdatePostDto,
    context: PluginContext,
  ): Promise<BlogPost> {
    // In production, update in database
    this.logger.log(`Updated blog post: ${id}`);
    return {} as BlogPost;
  }

  async delete(id: string, context: PluginContext): Promise<void> {
    // In production, delete from database
    this.logger.log(`Deleted blog post: ${id}`);
  }

  async publish(id: string, context: PluginContext): Promise<BlogPost> {
    return this.update(id, { status: 'published', publishedAt: new Date() }, context);
  }

  async unpublish(id: string, context: PluginContext): Promise<BlogPost> {
    return this.update(id, { status: 'draft' }, context);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private generateExcerpt(content: string, maxLength: number = 160): string {
    const stripped = content.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength).trim() + '...';
  }
}
