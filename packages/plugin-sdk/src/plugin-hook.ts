import { PluginContext } from './plugin-context';

export type EventHandler<T = unknown> = (data: T, context: PluginContext) => Promise<void> | void;

export interface PluginHook<TInput = unknown> {
  event: string;
  handler: EventHandler<TInput>;
  priority?: number;
}

export abstract class BaseHook {
  abstract get event(): string;
  abstract get priority(): number;

  constructor(protected readonly context: PluginContext) {}

  abstract handle(data: unknown): Promise<void | unknown>;
}

// ============================================
// Core Plugin Hooks
// ============================================

export abstract class ProductBeforeCreateHook extends BaseHook {
  get event(): string {
    return 'product.beforeCreate';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class ProductAfterCreateHook extends BaseHook {
  get event(): string {
    return 'product.afterCreate';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class ProductBeforeUpdateHook extends BaseHook {
  get event(): string {
    return 'product.beforeUpdate';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class ProductAfterUpdateHook extends BaseHook {
  get event(): string {
    return 'product.afterUpdate';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class OrderCreatedHook extends BaseHook {
  get event(): string {
    return 'order.created';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class OrderStatusChangedHook extends BaseHook {
  get event(): string {
    return 'order.statusChanged';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class CartCheckoutStartHook extends BaseHook {
  get event(): string {
    return 'cart.checkoutStart';
  }
  get priority(): number {
    return 10;
  }
}

export abstract class PaymentReceivedHook extends BaseHook {
  get event(): string {
    return 'payment.received';
  }
  get priority(): number {
    return 10;
  }
}
