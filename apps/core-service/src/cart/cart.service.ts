import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

export interface AddToCartDto {
  productId: string;
  variantId?: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  attributes?: Record<string, any>;
  imageUrl?: string;
}

export interface UpdateCartItemDto {
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async getOrCreateCart(
    token?: string,
    customerId?: string,
    email?: string,
  ): Promise<Cart> {
    if (token) {
      const cart = await this.cartRepository.findOne({
        where: { token },
        relations: ['items'],
      });

      if (cart) {
        return cart;
      }
    }

    // Create new cart
    const newToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry

    const cart = this.cartRepository.create({
      token: newToken,
      customerId,
      email,
      expiresAt,
    });

    return this.cartRepository.save(cart);
  }

  async addToCart(
    token: string | undefined,
    dto: AddToCartDto,
    customerId?: string,
    email?: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token, customerId, email);

    // Check if item already exists
    const existingItem = cart.items?.find(
      (item) =>
        item.productId === dto.productId &&
        item.variantId === dto.variantId,
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += dto.quantity;
      existingItem.total = existingItem.price * existingItem.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      // Add new item
      const newItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId: dto.productId,
        variantId: dto.variantId,
        productName: dto.productName,
        sku: dto.sku,
        quantity: dto.quantity,
        price: dto.price,
        total: dto.price * dto.quantity,
        attributes: dto.attributes,
        imageUrl: dto.imageUrl,
      });

      await this.cartItemRepository.save(newItem);
    }

    // Recalculate totals
    return this.recalculateCart(cart.id);
  }

  async updateCartItem(
    token: string,
    itemId: string,
    dto: UpdateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    const item = cart.items?.find((i) => i.id === itemId);

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity <= 0) {
      await this.cartItemRepository.remove(item);
    } else {
      item.quantity = dto.quantity;
      item.total = item.price * item.quantity;
      await this.cartItemRepository.save(item);
    }

    return this.recalculateCart(cart.id);
  }

  async removeCartItem(token: string, itemId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    const item = cart.items?.find((i) => i.id === itemId);

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(item);

    return this.recalculateCart(cart.id);
  }

  async clearCart(token: string): Promise<void> {
    const cart = await this.getOrCreateCart(token);

    await this.cartItemRepository.delete({ cartId: cart.id });
    await this.recalculateCart(cart.id);
  }

  async applyCoupon(
    token: string,
    couponCode: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    // Validate coupon (in production, check against coupon service)
    if (couponCode === 'SAVE10') {
      cart.discount = cart.subtotal * 0.1;
      cart.couponCode = couponCode;
    } else if (couponCode === 'FREESHIP') {
      cart.shipping = 0;
      cart.couponCode = couponCode;
    } else {
      throw new BadRequestException('Invalid coupon code');
    }

    return this.recalculateCart(cart.id);
  }

  async removeCoupon(token: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    cart.couponCode = null;
    cart.discount = 0;

    return this.recalculateCart(cart.id);
  }

  async setShippingAddress(
    token: string,
    address: any,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    cart.shippingAddress = address;

    return this.cartRepository.save(cart);
  }

  async setBillingAddress(
    token: string,
    address: any,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    cart.billingAddress = address;

    return this.cartRepository.save(cart);
  }

  async setShippingMethod(
    token: string,
    method: string,
    cost: number,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    cart.shippingMethod = method;
    cart.shipping = cost;

    return this.recalculateCart(cart.id);
  }

  async associateCustomer(
    token: string,
    customerId: string,
    email: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(token);

    cart.customerId = customerId;
    cart.email = email;

    return this.cartRepository.save(cart);
  }

  private async recalculateCart(cartId: string): Promise<Cart> {
    const items = await this.cartItemRepository.find({
      where: { cartId },
    });

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    await this.cartRepository.update(cartId, {
      subtotal,
      tax,
      total,
    });

    return this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    }) as Promise<Cart>;
  }
}
