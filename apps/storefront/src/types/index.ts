export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  name?: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export interface Cart {
  id: string;
  token: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  imageUrl?: string;
}
