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

  // Calculate totals dynamically
  const getItemTotal = (item: typeof cartItems[0]) => item.price * item.quantity;
  const subtotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
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

      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-28 h-28 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No image</div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/products/${item.productId}`} className="text-lg font-semibold text-white hover:text-brand-400 transition-colors">
                    {item.productName}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                  <p className="text-lg font-bold text-brand-400 mt-2">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-700 hover:border-gray-600 transition-all"
                      >
                        <Minus className="w-4 h-4 text-gray-300" />
                      </button>
                      <span className="w-12 text-center text-lg font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-700 hover:border-gray-600 transition-all"
                      >
                        <Plus className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                    {/* Item Total - changes with quantity */}
                    <div className="bg-brand-500/10 border border-brand-500/20 px-4 py-2 rounded-xl">
                      <p className="text-sm text-gray-400">Item Total</p>
                      <p className="text-xl font-bold text-white">${getItemTotal(item).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 sticky top-28">
            <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>

            {/* Item breakdown */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-800">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {item.productName} <span className="text-gray-600">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-white">${getItemTotal(item).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium text-lg text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="font-medium text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-800 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-brand-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white py-4 rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-lg"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            {shipping > 0 && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-400 text-center">
                  Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for FREE shipping!
                </p>
              </div>
            )}

            <Link
              href="/products"
              className="mt-4 w-full py-3 bg-gray-800/50 border border-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-700 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
