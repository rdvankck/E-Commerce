import { PluginManifest, PluginInstance } from './types';

export abstract class PluginManager {
  abstract install(manifest: PluginManifest, tenantId: string): Promise<PluginInstance>;
  abstract activate(pluginId: string, tenantId: string): Promise<void>;
  abstract deactivate(pluginId: string, tenantId: string): Promise<void>;
  abstract uninstall(pluginId: string, tenantId: string): Promise<void>;
  abstract getPlugin(pluginId: string): PluginInstance | undefined;
  abstract getActivePlugins(tenantId: string): PluginInstance[];
  abstract executeHook<T = any>(event: string, data: any): Promise<T[]>;
  abstract executeRoute(method: string, path: string, data: any): Promise<any>;
}
