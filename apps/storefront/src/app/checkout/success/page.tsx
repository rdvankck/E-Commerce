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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 py-3 px-6 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success icon and message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thanks for your purchase. We've sent a confirmation email to{' '}
            <span className="font-medium">{order.email}</span>
          </p>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Order {order.orderNumber}</h2>
            <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
          </div>

          {/* Items */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{item.productName}</span>
                <div className="text-right">
                  <span className="text-gray-500">× {item.quantity}</span>
                  <span className="ml-4 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-gray-600 text-sm">
              {order.address.firstName} {order.address.lastName}<br />
              {order.address.address1}<br />
              {order.address.address2 && <>{order.address.address2}<br /></>}
              {order.address.city}, {order.address.state} {order.address.postalCode}<br />
              {order.address.country}
            </p>
          </div>

          {/* Shipping method */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Shipping Method</h3>
            <p className="text-gray-600 text-sm">
              {order.shipping.name} ({order.shipping.price === 0 ? 'FREE' : `$${order.shipping.price.toFixed(2)}`})
            </p>
          </div>

          {/* Shipping timeline */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Shipping Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Your order has been received</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Processing</p>
                  <p className="text-sm text-gray-500">We're preparing your order</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipped</p>
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
            className="flex-1 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition text-center flex items-center justify-center gap-2"
          >
            Track Order
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Questions about your order?{' '}
          <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
