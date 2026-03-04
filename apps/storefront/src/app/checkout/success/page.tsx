'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react';

interface OrderData {
  orderNumber: string;
  email: string;
  total: number;
  items: Array<{ id: string; productName: string; quantity: number; price: number }>;
  shipping: { name: string; price: number; days: string };
  address: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Get order data from sessionStorage
    const orderData = sessionStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
      // Clear the order from sessionStorage
      sessionStorage.removeItem('lastOrder');
    }
  }, []);

  // Calculate estimated delivery based on shipping method
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDays = order?.shipping.days.match(/(\d+)/)?.[0] || '5';
    const maxDays = order?.shipping.days.match(/-(\d+)/)?.[1] || '7';

    const minDate = new Date(today);
    minDate.setDate(today.getDate() + parseInt(minDays));

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + parseInt(maxDays));

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  if (!order) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
          <p className="text-gray-400 mb-8">Thank you for your purchase!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 py-4 px-8 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success icon and message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
          <p className="text-gray-400">
            Thanks for your purchase. We've sent a confirmation email to{' '}
            <span className="text-brand-400 font-medium">{order.email}</span>
          </p>
        </div>

        {/* Order details */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Order {order.orderNumber}</h2>
            <span className="text-xl font-bold text-brand-400">${order.total.toFixed(2)}</span>
          </div>

          {/* Items */}
          <div className="border-t border-gray-800 pt-4 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <span className="text-gray-300">{item.productName}</span>
                <div className="text-right">
                  <span className="text-gray-500">× {item.quantity}</span>
                  <span className="ml-4 font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="border-t border-gray-800 pt-4 mb-4">
            <h3 className="font-medium text-white mb-2">Shipping Address</h3>
            <p className="text-gray-400 text-sm">
              {order.address.firstName} {order.address.lastName}<br />
              {order.address.address1}<br />
              {order.address.address2 && <>{order.address.address2}<br /></>}
              {order.address.city}, {order.address.state} {order.address.postalCode}<br />
              {order.address.country}
            </p>
          </div>

          {/* Shipping method */}
          <div className="border-t border-gray-800 pt-4 mb-4">
            <h3 className="font-medium text-white mb-2">Shipping Method</h3>
            <p className="text-gray-400 text-sm">
              {order.shipping.name} ({order.shipping.price === 0 ? <span className="text-green-400 font-medium">FREE</span> : `$${order.shipping.price.toFixed(2)}`})
            </p>
          </div>

          {/* Shipping timeline */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="font-medium text-white mb-3">Shipping Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Your order has been received</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Processing</p>
                  <p className="text-sm text-gray-500">We're preparing your order</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-white">Shipped</p>
                  <p className="text-sm text-gray-500">Estimated delivery: {getEstimatedDelivery()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="flex-1 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            className="flex-1 py-4 bg-gray-800/50 border border-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-700 hover:text-white transition-all text-center flex items-center justify-center gap-2"
          >
            Track Order
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Questions about your order?{' '}
          <Link href="/contact" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
