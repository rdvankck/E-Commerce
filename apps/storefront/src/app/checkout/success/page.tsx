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
    const orderData = sessionStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
      sessionStorage.removeItem('lastOrder');
    }
  }, []);

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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">Thank you for your purchase!</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 py-3 px-6 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success icon and message */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
        <p className="text-gray-400">
          Thanks for your purchase. Confirmation sent to{' '}
          <span className="text-white">{order.email}</span>
        </p>
      </div>

      {/* Order details */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Order {order.orderNumber}</h2>
          <span className="text-lg font-bold text-white">${order.total.toFixed(2)}</span>
        </div>

        {/* Items */}
        <div className="border-t border-gray-700 pt-4 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <span className="text-gray-300">{item.productName}</span>
              <div className="text-right">
                <span className="text-gray-500 text-sm">× {item.quantity}</span>
                <span className="ml-4 font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Address */}
        <div className="border-t border-gray-700 pt-4 mb-4">
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
        <div className="border-t border-gray-700 pt-4">
          <h3 className="font-medium text-white mb-2">Shipping Method</h3>
          <p className="text-gray-400 text-sm">
            {order.shipping.name} ({order.shipping.price === 0 ? <span className="text-green-400">FREE</span> : `$${order.shipping.price.toFixed(2)}`})
          </p>
        </div>
      </div>

      {/* Shipping timeline */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="font-medium text-white mb-4">Shipping Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="font-medium text-white text-sm">Order Confirmed</p>
              <p className="text-xs text-gray-500">Your order has been received</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-white text-sm">Processing</p>
              <p className="text-xs text-gray-500">We're preparing your order</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-white text-sm">Shipped</p>
              <p className="text-xs text-gray-500">Estimated delivery: {getEstimatedDelivery()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/products"
          className="flex-1 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="flex-1 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors text-center flex items-center justify-center gap-2"
        >
          Track Order
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
