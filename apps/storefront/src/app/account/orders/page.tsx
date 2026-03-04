'use client';

import Link from 'next/link';
import { Package, Eye, Truck, CheckCircle, Clock } from 'lucide-react';

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
    color: 'bg-yellow-100 text-yellow-700',
    icon: Clock,
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-blue-100 text-blue-700',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle,
  },
};

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        <span>/</span>
        <span className="text-gray-900">Orders</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
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
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    {order.status === 'delivered' && (
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
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
