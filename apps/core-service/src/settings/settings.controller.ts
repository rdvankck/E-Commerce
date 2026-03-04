import { Controller, Get, Put, Body, Request } from '@nestjs/common';
import { SettingsService, StoreSettings } from './settings.service';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // ============================================
  // Admin API
  // ============================================

  @Get('admin/settings')
  async getSettings(@Request() req: any) {
    return this.settingsService.getSettings(req.schemaName);
  }

  @Put('admin/settings')
  async updateSettings(
    @Body() updates: Partial<StoreSettings>,
    @Request() req: any,
  ) {
    return this.settingsService.updateSettings(req.schemaName, updates);
  }

  // ============================================
  // Storefront API (public settings only)
  // ============================================

  @Get('storefront/settings')
  async getPublicSettings(@Request() req: any) {
    return this.settingsService.getPublicSettings(req.schemaName);
  }
}
