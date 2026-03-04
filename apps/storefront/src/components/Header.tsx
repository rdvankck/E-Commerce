'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Shopify</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="search"
                placeholder="Search for products, brands..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:bg-gray-800 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all">
              Home
            </Link>
            <Link href="/products" className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all">
              Products
            </Link>
            <Link href="/categories" className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all">
              Categories
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="md:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              className="lg:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
          <nav className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/account"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
