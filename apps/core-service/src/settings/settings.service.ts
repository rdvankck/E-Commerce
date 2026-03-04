import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface StoreSettings {
  storeName: string;
  storeDescription?: string;
  currency: string;
  timezone: string;
  locale: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  payment?: {
    stripe?: {
      enabled: boolean;
      publishableKey?: string;
    };
    paypal?: {
      enabled: boolean;
    };
  };
  shipping?: {
    freeShippingThreshold?: number;
    flatRateShipping?: number;
  };
  tax?: {
    enabled: boolean;
    rate: number;
    includeInPrice: boolean;
  };
}

@Injectable()
export class SettingsService {
  private settingsCache: Map<string, StoreSettings> = new Map();

  constructor(private dataSource: DataSource) {}

  async getSettings(schemaName: string): Promise<StoreSettings> {
    // Check cache first
    if (this.settingsCache.has(schemaName)) {
      return this.settingsCache.get(schemaName)!;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      // Create settings table if not exists
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS store_settings (
          key VARCHAR(100) PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const result = await queryRunner.query(
        `SELECT key, value FROM store_settings`,
      );

      const settings: any = {};

      for (const row of result.rows || []) {
        settings[row.key] = row.value;
      }

      const storeSettings: StoreSettings = {
        storeName: settings.storeName || 'My Store',
        storeDescription: settings.storeDescription,
        currency: settings.currency || 'USD',
        timezone: settings.timezone || 'UTC',
        locale: settings.locale || 'en',
        logo: settings.logo,
        favicon: settings.favicon,
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        socialLinks: settings.socialLinks || {},
        seo: settings.seo || {},
        payment: settings.payment || {
          stripe: { enabled: false },
          paypal: { enabled: false },
        },
        shipping: settings.shipping || {},
        tax: settings.tax || { enabled: false, rate: 0, includeInPrice: false },
      };

      // Cache for 5 minutes
      this.settingsCache.set(schemaName, storeSettings);
      setTimeout(() => this.settingsCache.delete(schemaName), 5 * 60 * 1000);

      return storeSettings;
    } finally {
      await queryRunner.release();
    }
  }

  async updateSettings(
    schemaName: string,
    updates: Partial<StoreSettings>,
  ): Promise<StoreSettings> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`SET search_path TO ${schemaName}, public`);

    try {
      // Create settings table if not exists
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS store_settings (
          key VARCHAR(100) PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      for (const [key, value] of Object.entries(updates)) {
        await queryRunner.query(
          `INSERT INTO store_settings (key, value, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
          [key, JSON.stringify(value)],
        );
      }

      // Clear cache
      this.settingsCache.delete(schemaName);

      return this.getSettings(schemaName);
    } finally {
      await queryRunner.release();
    }
  }

  async getPublicSettings(schemaName: string): Promise<Partial<StoreSettings>> {
    const settings = await this.getSettings(schemaName);

    // Only return public-facing settings
    return {
      storeName: settings.storeName,
      storeDescription: settings.storeDescription,
      currency: settings.currency,
      logo: settings.logo,
      favicon: settings.favicon,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      socialLinks: settings.socialLinks,
      seo: settings.seo,
    };
  }
}
