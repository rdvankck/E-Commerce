'use client';

import Link from 'next/link';
import { Package, Heart, Settings, LogOut, User, MapPin, CreditCard, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'January 2024',
  };

  const menuItems = [
    { icon: Package, label: 'Orders', href: '/account/orders', description: 'View order history' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist', description: 'Saved items' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses', description: 'Manage shipping addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payments', description: 'Saved cards' },
    { icon: Settings, label: 'Settings', href: '/account/settings', description: 'Account preferences' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: 'Feb 15, 2024', status: 'Delivered', total: 149.99 },
    { id: 'ORD-002', date: 'Feb 10, 2024', status: 'Shipped', total: 79.99 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">My Account</span>
      </nav>

      {/* User Info */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-gray-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-white">12</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Wishlist</p>
          <p className="text-2xl font-bold text-white">5</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Points</p>
          <p className="text-2xl font-bold text-white">450</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </Link>
        ))}
        <button className="w-full flex items-center gap-3 p-4 text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-brand-400 hover:text-brand-300">
            View all
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                  order.status === 'Delivered'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {order.status}
                </span>
                <p className="text-sm font-medium text-white mt-1">${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
