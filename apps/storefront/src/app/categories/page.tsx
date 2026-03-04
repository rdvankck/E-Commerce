import Link from 'next/link';

const categories = [
  { id: '1', name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech accessories', productCount: 45, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { id: '2', name: 'Clothing', slug: 'clothing', description: 'Fashion for all styles', productCount: 120, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home', productCount: 78, imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop' },
  { id: '4', name: 'Sports', slug: 'sports', description: 'Gear up for your active lifestyle', productCount: 34, imageUrl: 'https://images.unsplash.com/photo-1461896836934-ebb7b5b5c0e6c?w=400&h=300&fit=crop' },
  { id: '5', name: 'Books', slug: 'books', description: 'Read something new today', productCount: 200, imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop' },
  { id: '6', name: 'Toys', slug: 'toys', description: 'Fun for all ages', productCount: 56, imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop' },
  { id: '7', name: 'Beauty', slug: 'beauty', description: 'Skincare and cosmetics', productCount: 89, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' },
  { id: '8', name: 'Food', slug: 'food', description: 'Gourmet and specialty foods', productCount: 45, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop' },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Categories</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              <p className="text-sm text-primary-600 mt-2">{category.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
