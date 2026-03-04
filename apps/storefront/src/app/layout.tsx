import { ReactNode } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Header } from '@/components/Header';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">My Store</h3>
                <p className="text-sm">Your one-stop shop for all your needs.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                  <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                  <li><Link href="/deals" className="hover:text-white">Deals</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link href="/shipping" className="hover:text-white">Shipping</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
              <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
