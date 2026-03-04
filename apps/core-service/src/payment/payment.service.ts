import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface CreatePaymentIntentDto {
  orderId: string;
  amount: number;
  currency: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface CreateCheckoutSessionDto {
  orderId: string;
  items: Array<{
    name: string;
    description?: string;
    images?: string[];
    amount: number;
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  id: string;
  status: string;
  amount: number;
  currency: string;
  clientSecret?: string;
  checkoutUrl?: string;
}

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (stripeSecretKey) {
      this.stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
      });
    } else {
      this.logger.warn('STRIPE_SECRET_KEY not configured. Payment functionality will be limited.');
    }
  }

  async createPaymentIntent(dto: CreatePaymentIntentDto): Promise<PaymentResult> {
    if (!this.stripe) {
      throw new BadRequestException('Payment processing not configured');
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(dto.amount * 100), // Convert to cents
        currency: dto.currency.toLowerCase(),
        metadata: {
          orderId: dto.orderId,
          ...dto.metadata,
        },
        receipt_email: dto.customerEmail,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        clientSecret: paymentIntent.client_secret || undefined,
      };
    } catch (error: any) {
      this.logger.error(`Failed to create payment intent: ${error.message}`);
      throw new InternalServerErrorException('Failed to create payment intent');
    }
  }

  async createCheckoutSession(dto: CreateCheckoutSessionDto): Promise<PaymentResult> {
    if (!this.stripe) {
      throw new BadRequestException('Payment processing not configured');
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: dto.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: item.description,
              images: item.images,
            },
            unit_amount: Math.round(item.amount * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: dto.successUrl,
        cancel_url: dto.cancelUrl,
        customer_email: dto.customerEmail,
        metadata: {
          orderId: dto.orderId,
          ...dto.metadata,
        },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU'],
        },
        billing_address_collection: 'required',
      });

      return {
        id: session.id,
        status: 'open',
        amount: dto.items.reduce((sum, item) => sum + item.amount * item.quantity, 0),
        currency: 'USD',
        checkoutUrl: session.url || undefined,
      };
    } catch (error: any) {
      this.logger.error(`Failed to create checkout session: ${error.message}`);
      throw new InternalServerErrorException('Failed to create checkout session');
    }
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    if (!this.stripe) {
      throw new BadRequestException('Payment processing not configured');
    }

    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    if (!this.stripe) {
      throw new BadRequestException('Payment processing not configured');
    }

    return this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    });
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    this.logger.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'checkout.session.expired':
        await this.handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        this.logger.debug(`Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const { orderId, tenantId, schemaName } = paymentIntent.metadata;

    if (!orderId || !schemaName) {
      this.logger.error('Missing metadata in payment intent');
      return;
    }

    // Update order payment status
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `UPDATE orders SET payment_status = 'paid', payment_transaction_id = $1, paid_at = NOW() WHERE id = $2`,
        [paymentIntent.id, orderId],
      );

      // Emit event for plugins
      await this.eventEmitter.emitAsync('payment.received', {
        orderId,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        tenantId,
        schemaName,
      });

      this.logger.log(`Payment succeeded for order ${orderId}`);
    } finally {
      await queryRunner.release();
    }
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const { orderId, schemaName } = paymentIntent.metadata;

    if (!orderId || !schemaName) {
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `UPDATE orders SET payment_status = 'failed' WHERE id = $1`,
        [orderId],
      );

      this.logger.log(`Payment failed for order ${orderId}`);
    } finally {
      await queryRunner.release();
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const { orderId, tenantId, schemaName } = session.metadata || {};

    if (!orderId || !schemaName) {
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `UPDATE orders SET payment_status = 'paid', payment_transaction_id = $1, payment_method = 'stripe', paid_at = NOW() WHERE id = $2`,
        [session.payment_intent as string, orderId],
      );

      // Emit event for plugins
      await this.eventEmitter.emitAsync('payment.received', {
        orderId,
        sessionId: session.id,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency?.toUpperCase() || 'USD',
        customerEmail: session.customer_email,
        tenantId,
        schemaName,
      });

      this.logger.log(`Checkout completed for order ${orderId}`);
    } finally {
      await queryRunner.release();
    }
  }

  private async handleCheckoutExpired(session: Stripe.Checkout.Session): Promise<void> {
    const { orderId, schemaName } = session.metadata || {};

    if (!orderId || !schemaName) {
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      await queryRunner.query(
        `UPDATE orders SET status = 'cancelled', payment_status = 'failed' WHERE id = $1 AND payment_status = 'pending'`,
        [orderId],
      );

      this.logger.log(`Checkout expired for order ${orderId}`);
    } finally {
      await queryRunner.release();
    }
  }

  constructWebhookEvent(payload: string | Buffer, signature: string): Stripe.Event {
    if (!this.stripe) {
      throw new BadRequestException('Payment processing not configured');
    }

    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new InternalServerErrorException('Webhook secret not configured');
    }

    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (error: any) {
      this.logger.error(`Webhook signature verification failed: ${error.message}`);
      throw new BadRequestException('Invalid webhook signature');
    }
  }
}
