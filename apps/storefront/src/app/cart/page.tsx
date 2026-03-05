'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    productId: '1',
    productName: 'Wireless Headphones',
    sku: 'WH-BLK',
    quantity: 1,
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Smart Watch',
    sku: 'SW-42',
    quantity: 2,
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getItemTotal = (item: typeof cartItems[0]) => item.price * item.quantity;
  const subtotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">Shopping Cart</span>
      </nav>

      <h1 className="text-2xl font-bold text-white mb-8">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${item.productId}`} className="font-medium text-white hover:text-brand-400 transition-colors">
                  {item.productName}
                </Link>
                <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                <p className="text-lg font-bold text-white mt-2">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity & Price */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-300" />
                  </button>
                  <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-300" />
                  </button>
                </div>

                <p className="font-bold text-white">${getItemTotal(item).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="font-semibold text-white mb-4">Order Summary</h2>

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full bg-brand-500 text-white py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            {shipping > 0 && (
              <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400 text-center">
                  Add <span className="font-bold text-white">${(50 - subtotal).toFixed(2)}</span> more for FREE shipping!
                </p>
              </div>
            )}

            <Link
              href="/products"
              className="mt-4 w-full py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
