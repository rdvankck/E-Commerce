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
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 10, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop', gradient: 'from-blue-600 to-indigo-700' },
  { id: '2', name: 'Clothing', slug: 'clothing', productCount: 8, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', gradient: 'from-pink-600 to-rose-700' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', productCount: 8, imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop', gradient: 'from-green-600 to-emerald-700' },
  { id: '4', name: 'Sports', slug: 'sports', productCount: 12, imageUrl: 'https://images.unsplash.com/photo-1461896836934-ebb7b5b5c0e6c?w=400&h=400&fit=crop', gradient: 'from-orange-600 to-red-700' },
  { id: '5', name: 'Books', slug: 'books', productCount: 6, imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop', gradient: 'from-amber-600 to-yellow-700' },
  { id: '6', name: 'Beauty', slug: 'beauty', productCount: 6, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', gradient: 'from-purple-600 to-violet-700' },
  { id: '7', name: 'Toys', slug: 'toys', productCount: 6, imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop', gradient: 'from-cyan-600 to-teal-700' },
  { id: '8', name: 'Food', slug: 'food', productCount: 6, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', gradient: 'from-lime-600 to-green-700' },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full text-brand-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                New Collection 2024
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400">
                  Perfect Style
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-lg">
                Shop the latest trends with exclusive deals. Premium quality products at unbeatable prices.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-brand-500 hover:to-brand-400 transition-all shadow-xl shadow-brand-600/30"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Browse Categories
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                <div className="text-center">
                  <div className="text-8xl mb-4">🛍️</div>
                  <p className="text-xl font-medium text-white/60">Premium Shopping Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
            <p className="text-gray-400 mt-2">Find exactly what you're looking for</p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-xl card-hover"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-xl font-bold text-center">{category.name}</h3>
                <p className="text-sm opacity-90 mt-1">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Products</h2>
              <p className="text-gray-400 mt-2">Handpicked just for you</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-purple-700 rounded-3xl p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/30 rounded-full blur-3xl" />

          <div className="relative text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-brand-100 mb-8 max-w-lg mx-auto">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
