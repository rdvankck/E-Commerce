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
} from '@nestjs/common';
import { CartService, AddToCartDto, UpdateCartItemDto } from './cart.service';

@Controller('storefront/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(
    @Query('token') token?: string,
    @Request() req?: any,
  ) {
    return this.cartService.getOrCreateCart(token, req?.userId, req?.userEmail);
  }

  @Post('items')
  async addToCart(
    @Body() dto: AddToCartDto,
    @Query('token') token?: string,
    @Request() req?: any,
  ) {
    return this.cartService.addToCart(
      token,
      dto,
      req?.userId,
      req?.userEmail,
    );
  }

  @Put('items/:itemId')
  async updateCartItem(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
    @Query('token') token: string,
  ) {
    return this.cartService.updateCartItem(token, itemId, dto);
  }

  @Delete('items/:itemId')
  async removeCartItem(
    @Param('itemId') itemId: string,
    @Query('token') token: string,
  ) {
    return this.cartService.removeCartItem(token, itemId);
  }

  @Delete()
  async clearCart(@Query('token') token: string) {
    await this.cartService.clearCart(token);
    return { success: true };
  }

  @Post('coupon')
  async applyCoupon(
    @Body('couponCode') couponCode: string,
    @Query('token') token: string,
  ) {
    return this.cartService.applyCoupon(token, couponCode);
  }

  @Delete('coupon')
  async removeCoupon(@Query('token') token: string) {
    return this.cartService.removeCoupon(token);
  }

  @Post('shipping-address')
  async setShippingAddress(
    @Body() address: any,
    @Query('token') token: string,
  ) {
    return this.cartService.setShippingAddress(token, address);
  }

  @Post('billing-address')
  async setBillingAddress(
    @Body() address: any,
    @Query('token') token: string,
  ) {
    return this.cartService.setBillingAddress(token, address);
  }

  @Post('shipping-method')
  async setShippingMethod(
    @Body('method') method: string,
    @Body('cost') cost: number,
    @Query('token') token: string,
  ) {
    return this.cartService.setShippingMethod(token, method, cost);
  }
}
