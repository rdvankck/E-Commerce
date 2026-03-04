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
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <span className="text-gray-900">My Account</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Welcome */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-primary-100 mt-1">Member since {user.memberSince}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Reward Points</p>
              <p className="text-2xl font-bold text-gray-900">450</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>

            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mt-1">${order.total.toFixed(2)}</p>
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
