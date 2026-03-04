'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product & {
    imageUrl?: string;
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.price || product.variants?.[0]?.price || 0;
  const compareAtPrice = product.variants?.[0]?.compareAtPrice;
  const discount = compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-gray-900/80 backdrop-blur rounded-2xl shadow-xl border border-gray-800 overflow-hidden card-hover"
    >
      {/* Product image */}
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-600" />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gray-900/80 backdrop-blur text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick add to cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute bottom-3 right-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:shadow-brand-500/50"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Product info */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-semibold text-white mt-1.5 group-hover:text-brand-400 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-1">(128)</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
