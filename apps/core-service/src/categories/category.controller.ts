import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService, CreateCategoryDto, UpdateCategoryDto } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // ============================================
  // Admin API
  // ============================================

  @Post('admin/categories')
  async createAdmin(@Body() dto: CreateCategoryDto, @Request() req: any) {
    return this.categoryService.create(dto, req.tenantId);
  }

  @Get('admin/categories')
  async findAllAdmin(@Request() req: any) {
    return this.categoryService.findAll(req.tenantId);
  }

  @Get('admin/categories/tree')
  async getCategoryTree(@Request() req: any) {
    return this.categoryService.getTree(req.tenantId);
  }

  @Get('admin/categories/:id')
  async findOneAdmin(@Param('id') id: string, @Request() req: any) {
    return this.categoryService.findOne(id, req.tenantId);
  }

  @Put('admin/categories/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @Request() req: any,
  ) {
    return this.categoryService.update(id, dto, req.tenantId);
  }

  @Delete('admin/categories/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAdmin(@Param('id') id: string, @Request() req: any) {
    return this.categoryService.remove(id, req.tenantId);
  }

  // ============================================
  // Storefront API
  // ============================================

  @Get('storefront/categories')
  async findAllStorefront(@Request() req: any) {
    const categories = await this.categoryService.findAll(req.tenantId);
    return categories.filter((c) => c.isActive);
  }

  @Get('storefront/categories/tree')
  async getStorefrontCategoryTree(@Request() req: any) {
    const categories = await this.categoryService.getTree(req.tenantId);
    return this.filterActive(categories);
  }

  @Get('storefront/categories/:id')
  async findOneStorefront(@Param('id') id: string, @Request() req: any) {
    const category = await this.categoryService.findOne(id, req.tenantId);
    if (!category.isActive) return null;
    return category;
  }

  @Get('storefront/categories/slug/:slug')
  async findBySlugStorefront(
    @Param('slug') slug: string,
    @Request() req: any,
  ) {
    try {
      const category = await this.categoryService.findBySlug(slug, req.tenantId);
      if (!category.isActive) return null;
      return category;
    } catch {
      return null;
    }
  }

  private filterActive(categories: any[]): any[] {
    return categories
      .filter((c) => c.isActive)
      .map((c) => ({
        ...c,
        children: c.children ? this.filterActive(c.children) : [],
      }));
  }
}
