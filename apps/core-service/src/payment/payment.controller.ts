import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  PaymentService,
  CreatePaymentIntentDto,
  CreateCheckoutSessionDto,
} from './payment.service';

@Controller('storefront/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  async createPaymentIntent(
    @Body() dto: CreatePaymentIntentDto,
    @Request() req: any,
  ) {
    return this.paymentService.createPaymentIntent({
      ...dto,
      metadata: {
        ...dto.metadata,
        tenantId: req.tenantId,
        schemaName: req.schemaName,
      },
    });
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
    @Request() req: any,
  ) {
    return this.paymentService.createCheckoutSession({
      ...dto,
      metadata: {
        ...dto.metadata,
        tenantId: req.tenantId,
        schemaName: req.schemaName,
      },
    });
  }

  @Get('intent/:id')
  async retrievePaymentIntent(@Param('id') id: string) {
    return this.paymentService.retrievePaymentIntent(id);
  }

  @Get('session/:id')
  async retrieveCheckoutSession(@Param('id') id: string) {
    return this.paymentService.retrieveCheckoutSession(id);
  }
}
