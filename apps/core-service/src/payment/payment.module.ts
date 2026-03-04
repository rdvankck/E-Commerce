import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController, WebhookController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
