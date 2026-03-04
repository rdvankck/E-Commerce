'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

// Mock data - in real app, fetch from API based on slug
const products = {
  'wireless-headphones': {
    id: '1',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.',
    price: 79.99,
    compareAtPrice: 99.99,
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    variants: [
      { id: '1', sku: 'WH-BLK', name: 'Black', price: 79.99, inventory: 50 },
      { id: '2', sku: 'WH-WHT', name: 'White', price: 79.99, inventory: 30 },
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    ],
  },
  'smart-watch': {
    id: '2',
    name: 'Smart Watch',
    slug: 'smart-watch',
    description: 'Feature-packed smartwatch with health monitoring, GPS, and 7-day battery life. Stay connected and track your fitness goals.',
    price: 199.99,
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    variants: [
      { id: '3', sku: 'SW-42', name: '42mm', price: 199.99, inventory: 25 },
      { id: '4', sku: 'SW-46', name: '46mm', price: 229.99, inventory: 20 },
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop',
    ],
  },
  'cotton-tshirt': {
    id: '3',
    name: 'Cotton T-Shirt',
    slug: 'cotton-tshirt',
    description: '100% organic cotton t-shirt. Soft, comfortable, and perfect for everyday wear.',
    price: 29.99,
    category: { id: '2', name: 'Clothing', slug: 'clothing' },
    variants: [
      { id: '5', sku: 'TS-S', name: 'Small', price: 29.99, inventory: 100 },
      { id: '6', sku: 'TS-M', name: 'Medium', price: 29.99, inventory: 150 },
      { id: '7', sku: 'TS-L', name: 'Large', price: 29.99, inventory: 100 },
    ],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop',
    ],
  },
  'running-shoes': {
    id: '4',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for performance and comfort.',
    price: 89.99,
    category: { id: '4', name: 'Sports', slug: 'sports' },
    variants: [
      { id: '8', sku: 'RS-9', name: 'Size 9', price: 89.99, inventory: 30 },
      { id: '9', sku: 'RS-10', name: 'Size 10', price: 89.99, inventory: 25 },
      { id: '10', sku: 'RS-11', name: 'Size 11', price: 89.99, inventory: 20 },
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop',
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products[slug as keyof typeof products];

  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link href="/products" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} x ${product.name} (${selectedVariant?.name}) to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <Link href={`/categories/${product.category.slug}`} className="hover:text-gray-900">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            {product.images?.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-400">No image available</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">${selectedVariant?.price.toFixed(2)}</span>
            {product.compareAtPrice && product.compareAtPrice > (selectedVariant?.price || 0) && (
              <span className="text-xl text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Options</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border border-gray-300 rounded-lg text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">2-year warranty included</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
