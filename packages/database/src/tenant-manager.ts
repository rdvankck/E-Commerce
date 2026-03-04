import { DataSource } from 'typeorm';

export class TenantManager {
  private schemaCache: Map<string, DataSource> = new Map();

  constructor(private readonly rootDataSource: DataSource) {}

  async createTenantSchema(schemaName: string): Promise<void> {
    console.log(`Creating schema: ${schemaName}`);

    const queryRunner = this.rootDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
      console.log(`Schema created: ${schemaName}`);
    } finally {
      await queryRunner.release();
    }
  }

  async getTenantDataSource(schemaName: string): Promise<DataSource> {
    if (this.schemaCache.has(schemaName)) {
      return this.schemaCache.get(schemaName)!;
    }

    const tenantDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'ecommerce_saas',
      schema: schemaName,
      synchronize: false,
    });

    this.schemaCache.set(schemaName, tenantDataSource);
    return tenantDataSource;
  }

  async dropTenantSchema(schemaName: string): Promise<void> {
    console.log(`Dropping schema: ${schemaName}`);
    this.schemaCache.delete(schemaName);

    const queryRunner = this.rootDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
      console.log(`Schema dropped: ${schemaName}`);
    } finally {
      await queryRunner.release();
    }
  }
}
