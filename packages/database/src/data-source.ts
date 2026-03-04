import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'ecommerce_saas',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.js'],
  subscribers: [],
});

export const createTenantDataSource = (schemaName: string): DataSource => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'ecommerce_saas',
    schema: schemaName,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
  });
};
