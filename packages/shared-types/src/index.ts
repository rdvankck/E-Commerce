// ============================================
// Core Domain Types
// ============================================

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  schemaName: string;
  status: 'active' | 'suspended' | 'trial';
  planId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  tenantId: string;
  role: 'platform_admin' | 'store_admin' | 'customer';
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  status: 'draft' | 'active' | 'archived';
  categoryId?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  seo?: ProductSeo;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name?: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  attributes?: Record<string, unknown>;
  imageUrl?: string;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface ProductSeo {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  customerNote?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  attributes?: Record<string, unknown>;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  defaultShippingAddress?: Address;
  defaultBillingAddress?: Address;
  isVerified: boolean;
  acceptsMarketing: boolean;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Cart {
  id: string;
  token: string;
  customerId?: string;
  email?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  expiresAt?: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId?: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

// ============================================
// Plugin System Types
// ============================================

export interface PluginManifest {
  name: string;
  version: string;
  displayName: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
  dependencies: {
    core: string;
    plugins: string[];
  };
  hooks: PluginHooks;
  permissions: PluginPermissions;
  backend?: {
    main: string;
    hooks?: string;
    routes?: PluginRouteDefinition[];
    adminPages?: PluginPageDefinition[];
    storefrontBlocks?: PluginBlockDefinition[];
  };
  frontend?: {
    admin?: PluginFrontendConfig;
    storefront?: PluginFrontendConfig;
  };
}

export interface PluginHooks {
  events: string[];
  routes: PluginRouteDefinition[];
  adminPages: PluginPageDefinition[];
  storefrontBlocks: PluginBlockDefinition[];
}

export interface PluginPermissions {
  database: boolean;
  externalApi: string[];
  fileStorage: boolean;
  email: boolean;
  fullAccess?: boolean;
}

export interface PluginRouteDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  handler: string;
  middleware?: string[];
}

export interface PluginPageDefinition {
  path: string;
  component: string;
  title?: string;
  icon?: string;
}

export interface PluginBlockDefinition {
  name: string;
  component: string;
  props?: Record<string, unknown>;
  priority?: number;
}

export interface PluginFrontendConfig {
  main: string;
  styles?: string;
}

// ============================================
// Event Types
// ============================================

export interface ProductCreatedEvent {
  productId: string;
  tenantId: string;
  product: Product;
}

export interface ProductUpdatedEvent {
  productId: string;
  tenantId: string;
  product: Product;
  changes: string[];
}

export interface OrderCreatedEvent {
  orderId: string;
  tenantId: string;
  order: Order;
}

export interface OrderStatusChangedEvent {
  orderId: string;
  tenantId: string;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
}

// ============================================
// API Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ============================================
// Settings Types
// ============================================

export interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone?: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  weightUnit: string;
  lengthUnit: string;
  taxRate: number;
  taxIncluded: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
