'use client';

import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.price || 0;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all card-hover"
    >
      {/* Product image */}
      <div className="aspect-square bg-gray-700 relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-500" />
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-gray-900 text-gray-300 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-medium text-white mt-1 group-hover:text-brand-400 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="mt-3 w-full py-2 bg-brand-500 text-white text-sm rounded-lg font-medium hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
