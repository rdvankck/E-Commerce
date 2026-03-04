import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { PluginService } from './plugin.service';
import { InstallPluginDto, UpdatePluginConfigDto } from './plugin.service';

@Controller('admin/plugins')
export class PluginAdminController {
  constructor(private readonly pluginService: PluginService) {}

  @Get()
  async getInstalledPlugins(@Request() req: any) {
    const tenantId = req.tenantId;
    const schemaName = req.schemaName;

    return this.pluginService.getInstalledPlugins(tenantId, schemaName);
  }

  @Get(':id')
  async getPluginConfig(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const schemaName = req.schemaName;
    return this.pluginService.getPluginConfig(id, schemaName);
  }

  @Post(':id/install')
  async installPlugin(
    @Param('id') id: string,
    @Body() dto: InstallPluginDto,
    @Request() req: any,
  ) {
    const tenantId = req.tenantId;
    const schemaName = req.schemaName;

    return this.pluginService.installPlugin(
      id,
      tenantId,
      schemaName,
      dto.settings,
    );
  }

  @Put(':id/config')
  async updatePluginConfig(
    @Param('id') id: string,
    @Body() dto: UpdatePluginConfigDto,
    @Request() req: any,
  ) {
    const tenantId = req.tenantId;
    const schemaName = req.schemaName;

    return this.pluginService.updatePluginConfig(
      id,
      tenantId,
      schemaName,
      dto,
    );
  }

  @Delete(':id')
  async uninstallPlugin(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    const tenantId = req.tenantId;
    const schemaName = req.schemaName;

    await this.pluginService.uninstallPlugin(id, tenantId, schemaName);
    return { success: true };
  }
}
