import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';
import { PaymentModule } from './payment/payment.module';
import { HealthController } from './health.controller';
import { TenantMiddleware } from './common/middleware/tenant.middleware';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),

    // Database with multi-tenancy support
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        database: configService.get('DATABASE_NAME', 'ecommerce_saas'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        // Schema will be set per-request via middleware
      }),
      inject: [ConfigService],
    }),

    // Event emitter for plugin hooks
    EventEmitterModule.forRoot(),

    // Feature modules
    ProductsModule,
    OrdersModule,
    CustomersModule,
    CartModule,
    CategoriesModule,
    SettingsModule,
    PaymentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {
  configure(consumer: any) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
