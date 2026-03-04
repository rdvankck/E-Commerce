import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService, CreateProductDto, UpdateProductDto } from './product.service';
import { ProductStatus } from './entities/product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ============================================
  // Admin API
  // ============================================

  @Post('admin/products')
  async createAdmin(@Body() dto: CreateProductDto, @Request() req: any) {
    return this.productService.create(dto, req.tenantId);
  }

  @Get('admin/products')
  async findAllAdmin(
    @Request() req: any,
    @Query('status') status?: ProductStatus,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productService.findAll(req.tenantId, {
      status,
      categoryId,
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('admin/products/:id')
  async findOneAdmin(@Param('id') id: string, @Request() req: any) {
    return this.productService.findOne(id, req.tenantId);
  }

  @Put('admin/products/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Request() req: any,
  ) {
    return this.productService.update(id, dto, req.tenantId);
  }

  @Delete('admin/products/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAdmin(@Param('id') id: string, @Request() req: any) {
    return this.productService.remove(id, req.tenantId);
  }

  // ============================================
  // Storefront API (public)
  // ============================================

  @Get('storefront/products')
  async findAllStorefront(
    @Request() req: any,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productService.findAll(req.tenantId, {
      status: ProductStatus.ACTIVE,
      categoryId,
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('storefront/products/:id')
  async findOneStorefront(@Param('id') id: string, @Request() req: any) {
    const product = await this.productService.findOne(id, req.tenantId);
    if (product.status !== ProductStatus.ACTIVE) {
      return null;
    }
    return product;
  }

  @Get('storefront/products/slug/:slug')
  async findBySlugStorefront(
    @Param('slug') slug: string,
    @Request() req: any,
  ) {
    const product = await this.productService.findBySlug(slug, req.tenantId);
    if (product.status !== ProductStatus.ACTIVE) {
      return null;
    }
    return product;
  }
}
