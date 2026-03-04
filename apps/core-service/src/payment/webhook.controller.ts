import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('stripe')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    this.logger.log('Received Stripe webhook');

    try {
      const event = this.paymentService.constructWebhookEvent(
        req.rawBody || Buffer.from(''),
        signature,
      );

      await this.paymentService.handleWebhookEvent(event);

      return { received: true };
    } catch (error: any) {
      this.logger.error(`Webhook error: ${error.message}`);
      return { received: false, error: error.message };
    }
  }
}
