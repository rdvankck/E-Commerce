'use client';

import Link from 'next/link';
import { Package, Eye, Truck, CheckCircle, Clock, ArrowRight } from 'lucide-react';

// Mock orders data
const orders = [
  {
    id: 'ORD-2024-00123',
    date: 'March 4, 2024',
    status: 'delivered',
    total: 279.97,
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { name: 'Smart Watch', quantity: 1, price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ORD-2024-00118',
    date: 'February 28, 2024',
    status: 'shipped',
    total: 149.98,
    items: [
      { name: 'Running Shoes', quantity: 2, price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    ],
  },
  {
    id: 'ORD-2024-00105',
    date: 'February 15, 2024',
    status: 'processing',
    total: 59.98,
    items: [
      { name: 'Cotton T-Shirt', quantity: 2, price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    ],
  },
];

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'bg-yellow-500/20 text-yellow-400',
    icon: Clock,
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-blue-500/20 text-blue-400',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-500/20 text-green-400',
    icon: CheckCircle,
  },
};

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <span className="text-white">Orders</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
          <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-semibold text-white">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-white">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-brand-400">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    {order.status === 'delivered' && (
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm transition-colors"
                      >
                        Buy Again
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
