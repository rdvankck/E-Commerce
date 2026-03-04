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
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
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
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Shopping Cart</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-28 h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link href={`/products/${item.productId}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                    {item.productName}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                  <p className="text-lg font-bold text-primary-600 mt-2">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Item Total - changes with quantity */}
                    <div className="bg-primary-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-600">Item Total</p>
                      <p className="text-xl font-bold text-primary-700">${getItemTotal(item).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            {/* Item breakdown */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.productName} <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium">${getItemTotal(item).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2 text-lg"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            {shipping > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for FREE shipping!
                </p>
              </div>
            )}

            <Link
              href="/products"
              className="mt-4 w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
