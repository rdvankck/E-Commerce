import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { PluginService } from './plugin.service';

import { Public } from '@ecommerce/plugin-sdk';

@Controller()
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  // Public marketplace routes (no auth required)
  @Public()
  @Get('plugins')
  async getMarketplacePlugins(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.pluginService.getMarketplacePlugins({
      category,
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Public()
  @Get('plugins/:id')
  async getPluginDetails(@Param('id') id: string) {
    return this.pluginService.getPluginDetails(id);
  }

  // Custom plugin routes (requires tenant context)
  @Post('plugin/:pluginId/invoke/:hook')
  async invokePluginHook(
    @Param('pluginId') pluginId: string,
    @Param('hook') hook: string,
    @Body() data: any,
    @Request() req: any,
  ) {
    const tenantId = req.tenantId;
    const schemaName = req.schemaName;

    const results = await this.pluginService.executeHook(
      hook,
      tenantId,
      schemaName,
      data,
    );

    return { results };
  }
}
