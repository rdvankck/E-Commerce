'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';

// Mock data
const categories: Record<string, { id: string; name: string; slug: string; description: string }> = {
  'electronics': { id: '1', name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech accessories' },
  'clothing': { id: '2', name: 'Clothing', slug: 'clothing', description: 'Fashion for all styles' },
  'home-garden': { id: '3', name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home' },
  'sports': { id: '4', name: 'Sports', slug: 'sports', description: 'Gear up for your active lifestyle' },
  'books': { id: '5', name: 'Books', slug: 'books', description: 'Read something new today' },
  'toys': { id: '6', name: 'Toys', slug: 'toys', description: 'Fun for all ages' },
  'beauty': { id: '7', name: 'Beauty', slug: 'beauty', description: 'Skincare and cosmetics' },
  'food': { id: '8', name: 'Food', slug: 'food', description: 'Gourmet and specialty foods' },
};

const categoryProducts: Record<string, Array<{ id: string; name: string; slug: string; price: number; imageUrl: string | null }>> = {
  'electronics': [
    { id: 'e1', name: 'Wireless Headphones', slug: 'wireless-headphones', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { id: 'e2', name: 'Smart Watch', slug: 'smart-watch', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: 'e3', name: 'Laptop Stand', slug: 'laptop-stand', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
    { id: 'e4', name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { id: 'e5', name: 'Wireless Earbuds', slug: 'wireless-earbuds', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop' },
    { id: 'e6', name: 'Mechanical Keyboard', slug: 'mechanical-keyboard', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop' },
    { id: 'e7', name: 'Gaming Mouse', slug: 'gaming-mouse', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop' },
    { id: 'e8', name: '4K Monitor', slug: '4k-monitor', price: 399.99, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop' },
    { id: 'e9', name: 'USB-C Hub', slug: 'usb-c-hub', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop' },
    { id: 'e10', name: 'Webcam HD', slug: 'webcam-hd', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop' },
  ],
  'clothing': [
    { id: 'c1', name: 'Cotton T-Shirt', slug: 'cotton-tshirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { id: 'c2', name: 'Denim Jeans', slug: 'denim-jeans', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
    { id: 'c3', name: 'Winter Jacket', slug: 'winter-jacket', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    { id: 'c4', name: 'Hoodie', slug: 'hoodie', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
    { id: 'c5', name: 'Dress Shirt', slug: 'dress-shirt', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
    { id: 'c6', name: 'Summer Dress', slug: 'summer-dress', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop' },
    { id: 'c7', name: 'Sneakers', slug: 'sneakers', price: 99.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
    { id: 'c8', name: 'Leather Belt', slug: 'leather-belt', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  ],
  'sports': [
    { id: 's1', name: 'Running Shoes', slug: 'running-shoes', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 's2', name: 'Yoga Mat', slug: 'yoga-mat', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop' },
    { id: 's3', name: 'Dumbbells Set', slug: 'dumbbells-set', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop' },
    { id: 's4', name: 'Tennis Racket', slug: 'tennis-racket', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1617083934555-ac8c2d2be997?w=400&h=400&fit=crop' },
    { id: 's5', name: 'Basketball', slug: 'basketball', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1494199505258-5f95387f933c?w=400&h=400&fit=crop' },
    { id: 's6', name: 'Football', slug: 'football', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop' },
    { id: 's7', name: 'Cycling Helmet', slug: 'cycling-helmet', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1557803175-2f8c4dcb6baa?w=400&h=400&fit=crop' },
    { id: 's8', name: 'Fitness Tracker', slug: 'fitness-tracker', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop' },
    { id: 's9', name: 'Resistance Bands', slug: 'resistance-bands', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop' },
    { id: 's10', name: 'Jump Rope', slug: 'jump-rope', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop' },
    { id: 's11', name: 'Sports Water Bottle', slug: 'sports-water-bottle', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop' },
    { id: 's12', name: 'Gym Bag', slug: 'gym-bag', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  ],
  'home-garden': [
    { id: 'h1', name: 'Coffee Maker', slug: 'coffee-maker', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop' },
    { id: 'h2', name: 'Plant Pot Set', slug: 'plant-pot-set', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop' },
    { id: 'h3', name: 'Throw Blanket', slug: 'throw-blanket', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' },
    { id: 'h4', name: 'Desk Lamp', slug: 'desk-lamp', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop' },
    { id: 'h5', name: 'Wall Art Print', slug: 'wall-art-print', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop' },
    { id: 'h6', name: 'Scented Candles', slug: 'scented-candles', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1602607957883-61c3eb39a0d8?w=400&h=400&fit=crop' },
    { id: 'h7', name: 'Kitchen Knife Set', slug: 'kitchen-knife-set', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop' },
    { id: 'h8', name: 'Garden Tools', slug: 'garden-tools', price: 69.99, imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop' },
  ],
  'books': [
    { id: 'b1', name: 'Novel Book', slug: 'novel-book', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop' },
    { id: 'b2', name: 'Business Strategy', slug: 'business-strategy', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop' },
    { id: 'b3', name: 'Cookbook', slug: 'cookbook', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop' },
    { id: 'b4', name: 'Self-Help Guide', slug: 'self-help-guide', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop' },
    { id: 'b5', name: 'Science Fiction', slug: 'science-fiction', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop' },
    { id: 'b6', name: 'History Book', slug: 'history-book', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop' },
  ],
  'toys': [
    { id: 't1', name: 'Building Blocks', slug: 'building-blocks', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop' },
    { id: 't2', name: 'Teddy Bear', slug: 'teddy-bear', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=400&h=400&fit=crop' },
    { id: 't3', name: 'RC Car', slug: 'rc-car', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop' },
    { id: 't4', name: 'Puzzle Set', slug: 'puzzle-set', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1606503153255-59d7ae8e6e00?w=400&h=400&fit=crop' },
    { id: 't5', name: 'Board Game', slug: 'board-game', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop' },
    { id: 't6', name: 'Art Supplies', slug: 'art-supplies', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop' },
  ],
  'beauty': [
    { id: 'bt1', name: 'Skincare Set', slug: 'skincare-set', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
    { id: 'bt2', name: 'Perfume', slug: 'perfume', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
    { id: 'bt3', name: 'Makeup Palette', slug: 'makeup-palette', price: 45.99, imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' },
    { id: 'bt4', name: 'Hair Dryer', slug: 'hair-dryer', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop' },
    { id: 'bt5', name: 'Nail Polish Set', slug: 'nail-polish-set', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop' },
    { id: 'bt6', name: 'Face Mask Pack', slug: 'face-mask-pack', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
  ],
  'food': [
    { id: 'f1', name: 'Gourmet Coffee', slug: 'gourmet-coffee', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop' },
    { id: 'f2', name: 'Chocolate Box', slug: 'chocolate-box', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop' },
    { id: 'f3', name: 'Olive Oil Set', slug: 'olive-oil-set', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
    { id: 'f4', name: 'Tea Collection', slug: 'tea-collection', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop' },
    { id: 'f5', name: 'Spice Set', slug: 'spice-set', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop' },
    { id: 'f6', name: 'Honey Gift Set', slug: 'honey-gift-set', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop' },
  ],
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories[slug];
  const products = categoryProducts[slug] || [];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        <Link href="/categories" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-gray-900">Categories</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-2">{category.description}</p>
        <p className="text-sm text-primary-600 mt-1">{products.length} products</p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products in this category yet.</p>
          <Link href="/products" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
