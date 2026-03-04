import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  sortOrder?: number;
  seo?: { title: string; description: string };
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  isActive?: boolean;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto, tenantId: string): Promise<Category> {
    const slug = dto.slug || this.generateSlug(dto.name);

    // Check if slug exists
    const existing = await this.categoryRepository.findOne({ where: { slug } });
    if (existing) {
      throw new BadRequestException(`Category with slug ${slug} already exists`);
    }

    const category = this.categoryRepository.create({
      name: dto.name,
      slug,
      description: dto.description,
      parentId: dto.parentId,
      imageUrl: dto.imageUrl,
      sortOrder: dto.sortOrder || 0,
      seo: dto.seo,
      isActive: true,
    });

    return this.categoryRepository.save(category);
  }

  async findAll(tenantId: string): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['parent', 'children'],
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return category;
  }

  async findBySlug(slug: string, tenantId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['parent', 'children'],
    });

    if (!category) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }

    return category;
  }

  async getTree(tenantId: string): Promise<Category[]> {
    // Get root categories (no parent)
    const rootCategories = await this.categoryRepository.find({
      where: { parentId: null },
      relations: ['children'],
      order: { sortOrder: 'ASC' },
    });

    return rootCategories;
  }

  async update(id: string, dto: UpdateCategoryDto, tenantId: string): Promise<Category> {
    const category = await this.findOne(id, tenantId);

    Object.assign(category, {
      name: dto.name ?? category.name,
      slug: dto.slug ?? category.slug,
      description: dto.description ?? category.description,
      parentId: dto.parentId !== undefined ? dto.parentId : category.parentId,
      imageUrl: dto.imageUrl ?? category.imageUrl,
      sortOrder: dto.sortOrder ?? category.sortOrder,
      seo: dto.seo ?? category.seo,
      isActive: dto.isActive ?? category.isActive,
    });

    return this.categoryRepository.save(category);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const category = await this.findOne(id, tenantId);

    // Check for children
    const children = await this.categoryRepository.find({
      where: { parentId: id },
    });

    if (children.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with children. Move or delete children first.',
      );
    }

    await this.categoryRepository.remove(category);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
