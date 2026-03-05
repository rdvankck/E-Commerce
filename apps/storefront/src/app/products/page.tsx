import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

// Mock data - in real app, fetch from API
const allProducts = [
  { id: '1', name: 'Wireless Headphones', slug: 'wireless-headphones', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '2', name: 'Smart Watch', slug: 'smart-watch', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '3', name: 'Cotton T-Shirt', slug: 'cotton-tshirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', category: { id: '2', name: 'Clothing', slug: 'clothing' } },
  { id: '4', name: 'Running Shoes', slug: 'running-shoes', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: '5', name: 'Laptop Stand', slug: 'laptop-stand', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '6', name: 'Yoga Mat', slug: 'yoga-mat', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: '7', name: 'Coffee Maker', slug: 'coffee-maker', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop', category: { id: '3', name: 'Home & Garden', slug: 'home-garden' } },
  { id: '8', name: 'Novel Book', slug: 'novel-book', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop', category: { id: '5', name: 'Books', slug: 'books' } },
  { id: '9', name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', category: { id: '1', name: 'Electronics', slug: 'electronics' } },
  { id: '10', name: 'Denim Jeans', slug: 'denim-jeans', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', category: { id: '2', name: 'Clothing', slug: 'clothing' } },
  { id: '11', name: 'Winter Jacket', slug: 'winter-jacket', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', category: { id: '2', name: 'Clothing', slug: 'clothing' } },
  { id: '12', name: 'Plant Pot Set', slug: 'plant-pot-set', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', category: { id: '3', name: 'Home & Garden', slug: 'home-garden' } },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <h2 className="font-semibold text-white mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Categories</h3>
              <div className="space-y-2">
                {['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-brand-500 focus:ring-brand-500" />
                    <span className="text-sm text-gray-400">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
                <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white" />
              </div>
            </div>

            <button className="w-full bg-brand-500 text-white py-2 rounded-lg font-medium hover:bg-brand-600 transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">All Products</h1>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
