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
  // Sports Products
  { id: 's1', name: 'Dumbbells Set', slug: 'dumbbells-set', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's2', name: 'Tennis Racket', slug: 'tennis-racket', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1617083934555-ac8c2d2be997?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's3', name: 'Basketball', slug: 'basketball', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1494199505258-5f95387f933c?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's4', name: 'Football', slug: 'football', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's5', name: 'Cycling Helmet', slug: 'cycling-helmet', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1557803175-2f8c4dcb6baa?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's6', name: 'Fitness Tracker', slug: 'fitness-tracker', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's7', name: 'Resistance Bands', slug: 'resistance-bands', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's8', name: 'Jump Rope', slug: 'jump-rope', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's9', name: 'Sports Water Bottle', slug: 'sports-water-bottle', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's10', name: 'Gym Bag', slug: 'gym-bag', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's11', name: 'Swimming Goggles', slug: 'swimming-goggles', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
  { id: 's12', name: 'Golf Clubs Set', slug: 'golf-clubs-set', price: 399.99, imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop', category: { id: '4', name: 'Sports', slug: 'sports' } },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-gray-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>

            <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
