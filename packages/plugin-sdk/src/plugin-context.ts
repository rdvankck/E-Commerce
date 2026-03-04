import { AsyncLocalStorage } from 'async_hooks';

export interface PluginContext {
  pluginId: string;
  tenantId: string;
  schemaName: string;
  config: Record<string, any>;
}

const contextStorage = new AsyncLocalStorage<PluginContext>();

export function getPluginContext(): PluginContext | undefined {
  return contextStorage.getStore();
}

export function runInPluginContext<T>(context: PluginContext, fn: () => T): T {
  return contextStorage.run(context, fn);
}

export function createPluginContext(pluginId: string, tenantId: string, config: Record<string, any> = {}): PluginContext {
  return {
    pluginId,
    tenantId,
    schemaName: `plugin_${pluginId}`,
    config,
  };
}
