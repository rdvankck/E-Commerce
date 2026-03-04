'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from 'lucide-react';

// Mock order data
const orders: Record<string, {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{ name: string; quantity: number; price: number; imageUrl: string }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}> = {
  'ORD-2024-00123': {
    id: 'ORD-2024-00123',
    date: 'March 4, 2024',
    status: 'delivered',
    subtotal: 279.97,
    shipping: 0,
    tax: 22.40,
    total: 302.37,
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { name: 'Smart Watch', quantity: 1, price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: '1Z999AA10123456784',
  },
  'ORD-2024-00118': {
    id: 'ORD-2024-00118',
    date: 'February 28, 2024',
    status: 'shipped',
    subtotal: 149.98,
    shipping: 5.99,
    tax: 12.00,
    total: 167.97,
    items: [
      { name: 'Running Shoes', quantity: 2, price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: '1Z999AA10123456785',
  },
  'ORD-2024-00105': {
    id: 'ORD-2024-00105',
    date: 'February 15, 2024',
    status: 'processing',
    subtotal: 59.98,
    shipping: 9.99,
    tax: 4.80,
    total: 74.77,
    items: [
      { name: 'Cotton T-Shirt', quantity: 2, price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'United States',
    },
    paymentMethod: 'Mastercard ending in 8888',
  },
};

const statusSteps = [
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = orders[orderId];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">Order not found</h1>
        <Link href="/account/orders" className="text-brand-400 hover:text-brand-300 mt-4 inline-block transition-colors">
          Back to orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <Link href="/account/orders" className="hover:text-white transition-colors">Orders</Link>
        <span>/</span>
        <span className="text-white">{order.id}</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <Link href="/account/orders" className="p-2 hover:bg-gray-800 rounded-xl transition-all">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{order.id}</h1>
          <p className="text-gray-500">Placed on {order.date}</p>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-6">Order Status</h2>
        <div className="relative">
          <div className="flex justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              return (
                <div key={step.key} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500'
                  } ${isCurrent ? 'ring-4 ring-green-500/30' : ''}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className={`mt-2 text-sm font-medium ${isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-800">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {order.trackingNumber && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
            <p className="text-sm text-gray-400">Tracking Number</p>
            <p className="font-mono font-medium text-white">{order.trackingNumber}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className={order.shipping === 0 ? 'text-green-400' : 'text-white'}>
                {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
              <span className="text-white">Total</span>
              <span className="text-brand-400">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-6">
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
            </div>
            <p className="text-gray-400">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address1}<br />
              {order.shippingAddress.address2 && <>{order.shippingAddress.address2}<br /></>}
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-semibold text-white">Payment Method</h2>
            </div>
            <p className="text-gray-400">{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
