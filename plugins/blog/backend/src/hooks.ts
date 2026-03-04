import { PluginContext } from '@ecommerce/plugin-sdk';
import { BlogService } from './services/blog.service';

export function registerHooks(context: PluginContext, blogService: BlogService) {
  // Listen for product creation to auto-generate blog content suggestions
  context.onEvent('product.afterCreate', async (data: any) => {
    console.log(`Product created: ${data.product.name} - Blog plugin notified`);
    // Could auto-suggest blog posts for new products
  });

  context.onEvent('product.afterUpdate', async (data: any) => {
    console.log(`Product updated: ${data.product.name} - Blog plugin notified`);
  });
}
