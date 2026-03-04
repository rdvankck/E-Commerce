// Event Bus Package - Simple event bus implementation

export interface EventPayload {
  tenantId: string;
  timestamp: Date;
  data: unknown;
}

export interface EventHandler<T = any> {
  (data: T): void | Promise<void>;
}

export class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  async emit<T = any>(event: string, data: T): Promise<void> {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        await handler(data);
      }
    }
  }

  emitSync<T = any>(event: string, data: T): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }

  on<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  once<T = any>(event: string, handler: EventHandler<T>): void {
    const onceHandler: EventHandler<T> = (data) => {
      this.off(event, onceHandler);
      return handler(data);
    };
    this.on(event, onceHandler);
  }

  off<T = any>(event: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

// Event names constants
export const Events = {
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_STATUS_CHANGED: 'order.statusChanged',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  PAYMENT_RECEIVED: 'payment.received',
  CART_CHECKOUT_START: 'cart.checkoutStart',
} as const;
