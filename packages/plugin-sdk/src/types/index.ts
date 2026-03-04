// ============================================
// Plugin SDK Types
// ============================================

export interface PluginManifest {
  name: string;
  version: string;
  displayName: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
  dependencies: {
    core: string;
    plugins: string[];
  };
  hooks: {
    events: string[];
    routes: PluginRouteDefinition[];
    adminPages: PluginPageDefinition[];
    storefrontBlocks: PluginBlockDefinition[];
  };
  permissions: PluginPermissions;
  backend?: {
    main: string;
    hooks?: string;
    routes?: string;
  };
  frontend?: {
    admin?: string;
    storefront?: string;
  };
  migrations?: string;
}

export interface PluginPermissions {
  database: boolean;
  externalApi: string[];
  fileStorage: boolean;
  email: boolean;
  fullAccess?: boolean;
}

export interface PluginRouteDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  handler: string;
  middleware?: string[];
}

export interface PluginPageDefinition {
  path: string;
  component: string;
  title?: string;
  icon?: string;
}

export interface PluginBlockDefinition {
  name: string;
  component: string;
  location: 'product.page.before' | 'product.page.after' | 'cart.sidebar' | 'checkout.steps';
  priority?: number;
}

export interface PluginConfig {
  id: string;
  pluginId: string;
  tenantId: string;
  enabled: boolean;
  settings: Record<string, any>;
  installedAt: Date;
  updatedAt: Date;
}

export interface PluginInstance {
  id: string;
  manifest: PluginManifest;
  config: PluginConfig;
  state: 'installed' | 'active' | 'inactive' | 'error';
  error?: string;
}
