'use client';

import Link from 'next/link';
import { Package, Heart, Settings, LogOut, User, MapPin, CreditCard } from 'lucide-react';

export default function AccountPage() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'January 2024',
  };

  const menuItems = [
    { icon: Package, label: 'Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payments' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: 'Feb 15, 2024', status: 'Delivered', total: 149.99 },
    { id: 'ORD-002', date: 'Feb 10, 2024', status: 'Shipped', total: 79.99 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white">My Account</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
              <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-brand-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Welcome */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-brand-500/30">
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-brand-100 mt-1">Member since {user.memberSince}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4">
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4">
              <p className="text-sm text-gray-400">Wishlist Items</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4">
              <p className="text-sm text-gray-400">Reward Points</p>
              <p className="text-2xl font-bold text-white">450</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                View all
              </Link>
            </div>

            <div className="divide-y divide-gray-800">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
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
      </div>
    </div>
  );
}
