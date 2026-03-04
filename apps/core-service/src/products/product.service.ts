import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';

export interface CreateProductDto {
  name: string;
  slug?: string;
  description?: string;
  attributes?: Record<string, any>;
  categoryId?: string;
  status?: ProductStatus;
  tags?: string[];
  seo?: { title: string; description: string };
  variants?: CreateVariantDto[];
  images?: CreateImageDto[];
}

export interface CreateVariantDto {
  sku: string;
  name?: string;
  price: number;
  compareAtPrice?: number;
  inventory?: number;
  attributes?: Record<string, any>;
  imageUrl?: string;
}

export interface CreateImageDto {
  url: string;
  alt?: string;
  sortOrder?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private variantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateProductDto, tenantId: string): Promise<Product> {
    const slug = dto.slug || this.generateSlug(dto.name);

    const product = this.productRepository.create({
      name: dto.name,
      slug,
      description: dto.description,
      attributes: dto.attributes,
      categoryId: dto.categoryId,
      status: dto.status || ProductStatus.DRAFT,
      tags: dto.tags || [],
      seo: dto.seo,
    });

    // Create variants
    if (dto.variants && dto.variants.length > 0) {
      product.variants = dto.variants.map((v) =>
        this.variantRepository.create({
          sku: v.sku,
          name: v.name,
          price: v.price,
          compareAtPrice: v.compareAtPrice,
          inventory: v.inventory || 0,
          attributes: v.attributes,
          imageUrl: v.imageUrl,
        }),
      );
    } else {
      // Create default variant
      product.variants = [
        this.variantRepository.create({
          sku: `${slug}-default`,
          name: 'Default',
          price: 0,
          inventory: 0,
        }),
      ];
    }

    // Create images
    if (dto.images && dto.images.length > 0) {
      product.images = dto.images.map((img, index) =>
        this.imageRepository.create({
          url: img.url,
          alt: img.alt,
          sortOrder: img.sortOrder || index,
        }),
      );
    }

    const savedProduct = await this.productRepository.save(product);

    // Emit event for plugins
    await this.eventEmitter.emitAsync('product.afterCreate', {
      product: savedProduct,
      tenantId,
    });

    this.logger.log(`Created product ${savedProduct.id} for tenant ${tenantId}`);
    return savedProduct;
  }

  async findAll(tenantId: string, options?: {
    status?: ProductStatus;
    categoryId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category');

    if (options?.status) {
      query.andWhere('product.status = :status', { status: options.status });
    }

    if (options?.categoryId) {
      query.andWhere('product.categoryId = :categoryId', {
        categoryId: options.categoryId,
      });
    }

    if (options?.search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${options.search}%` },
      );
    }

    query.orderBy('product.createdAt', 'DESC').skip(skip).take(limit);

    const [products, total] = await query.getManyAndCount();

    return { products, total };
  }

  async findOne(id: string, tenantId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['variants', 'images', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async findBySlug(slug: string, tenantId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['variants', 'images', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }

  async update(
    id: string,
    dto: UpdateProductDto,
    tenantId: string,
  ): Promise<Product> {
    const product = await this.findOne(id, tenantId);

    // Emit before update event
    await this.eventEmitter.emitAsync('product.beforeUpdate', {
      product,
      updates: dto,
      tenantId,
    });

    Object.assign(product, {
      name: dto.name ?? product.name,
      slug: dto.slug ?? product.slug,
      description: dto.description ?? product.description,
      attributes: dto.attributes ?? product.attributes,
      categoryId: dto.categoryId ?? product.categoryId,
      status: dto.status ?? product.status,
      tags: dto.tags ?? product.tags,
      seo: dto.seo ?? product.seo,
    });

    const updatedProduct = await this.productRepository.save(product);

    // Emit after update event
    await this.eventEmitter.emitAsync('product.afterUpdate', {
      product: updatedProduct,
      tenantId,
    });

    return updatedProduct;
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const product = await this.findOne(id, tenantId);

    await this.eventEmitter.emitAsync('product.beforeDelete', {
      product,
      tenantId,
    });

    await this.productRepository.remove(product);

    this.logger.log(`Deleted product ${id} for tenant ${tenantId}`);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
