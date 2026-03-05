import Link from 'next/link';
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

// Mock data
const featuredProducts = [
  { id: '1', name: 'Wireless Headphones', slug: 'wireless-headphones', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '2', name: 'Smart Watch', slug: 'smart-watch', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '3', name: 'Cotton T-Shirt', slug: 'cotton-tshirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: { id: '2', name: 'Clothing', slug: 'clothing' } },
  { id: '4', name: 'Running Shoes', slug: 'running-shoes', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
];

const categories = [
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 10, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop' },
  { id: '2', name: 'Clothing', slug: 'clothing', productCount: 8, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', productCount: 8, imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop' },
  { id: '4', name: 'Sports', slug: 'sports', productCount: 12, imageUrl: 'https://images.unsplash.com/photo-1461896836934-ebb7b5b5c0e6c?w=400&h=400&fit=crop' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', description: '100% protected' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day guarantee' },
  { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Your Perfect Style
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Shop the latest trends with exclusive deals. Premium quality products at unbeatable prices.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-800/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm text-brand-400 hover:text-brand-300"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gray-800"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-300">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <Link
              href="/products"
              className="text-sm text-brand-400 hover:text-brand-300"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-6">
            Subscribe to get special offers and exclusive deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-white bg-gray-900 border border-gray-700 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
