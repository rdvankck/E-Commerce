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
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <span className="text-white">Wishlist</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">Save items you love to your wishlist.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden group hover:border-gray-700 transition-all">
              <Link href={`/products/${item.slug}`} className="block">
                <div className="aspect-square bg-gray-800 relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 bg-gray-900/80 rounded-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.slug}`} className="font-medium text-white hover:text-brand-400 transition-colors">
                  {item.name}
                </Link>
                <p className="text-lg font-bold text-brand-400 mt-1">${item.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    disabled={!item.inStock}
                    className="flex-1 py-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-medium hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 bg-gray-800 border border-gray-700 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-400" />
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
