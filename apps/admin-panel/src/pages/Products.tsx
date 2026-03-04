import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Package } from 'lucide-react';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    status: 'active',
    variants: [
      { sku: 'WBH-BLK', price: 79.99, inventory: 45 },
      { sku: 'WBH-WHT', price: 79.99, inventory: 32 },
    ],
    category: { name: 'Electronics' },
    createdAt: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    status: 'active',
    variants: [
      { sku: 'OCT-S', price: 29.99, inventory: 120 },
      { sku: 'OCT-M', price: 29.99, inventory: 85 },
      { sku: 'OCT-L', price: 29.99, inventory: 60 },
    ],
    category: { name: 'Clothing' },
    createdAt: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    status: 'draft',
    variants: [
      { sku: 'SWP-BLK', price: 199.99, inventory: 0 },
    ],
    category: { name: 'Electronics' },
    createdAt: '2026-03-01',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'Running Shoes',
    slug: 'running-shoes',
    status: 'active',
    variants: [
      { sku: 'RS-42', price: 89.99, inventory: 23 },
    ],
    category: { name: 'Sports' },
    createdAt: '2026-03-03',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      product.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">Manage your product catalog</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-gray-800 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all"
          >
            {/* Product image */}
            <div className="aspect-video bg-gray-800 relative">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-600" />
                </div>
              )}
              <span
                className={`
                  absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                  ${product.status === 'active'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : product.status === 'draft'
                    ? 'bg-gray-700/50 text-gray-400 border border-gray-600'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }
                `}
              >
                {product.status}
              </span>
            </div>

            {/* Product info */}
            <div className="p-5">
              <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
                {product.category.name}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.variants.length} variants</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-2xl font-bold text-white">
                    ${product.variants[0].price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.variants.reduce((sum, v) => sum + v.inventory, 0)} units in stock
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
