'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialWishlistItems = [
  { id: '1', name: 'Wireless Headphones', slug: 'wireless-headphones', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', inStock: true },
  { id: '2', name: 'Smart Watch', slug: 'smart-watch', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', inStock: true },
  { id: '3', name: 'Vintage Camera', slug: 'vintage-camera', price: 299.99, imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', inStock: false },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        <span>/</span>
        <span className="text-gray-900">Wishlist</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              <Link href={`/products/${item.slug}`} className="block">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.slug}`} className="font-medium text-gray-900 hover:text-primary-600">
                  {item.name}
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    disabled={!item.inStock}
                    className="flex-1 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
