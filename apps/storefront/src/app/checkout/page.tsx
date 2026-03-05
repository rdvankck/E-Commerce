'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Mock cart data
const mockCartItems = [
  { id: '1', productName: 'Wireless Headphones', quantity: 1, price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { id: '2', productName: 'Smart Watch', quantity: 1, price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
];

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 15.99, days: '2-3 business days' },
  { id: 'free', name: 'Free Shipping (Orders over $100)', price: 0, days: '7-10 business days' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');
  const [cartItems] = useState(mockCartItems);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
    shippingMethod: 'standard',
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = shippingMethods.find(m => m.id === formData.shippingMethod) || shippingMethods[0];
  const shipping = selectedShipping.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('shipping');
    window.scrollTo(0, 0);
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      email: formData.email,
      total: total,
      items: cartItems,
      shipping: selectedShipping,
      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    router.push('/checkout/success');
  };

  const steps = [
    { id: 'information', label: 'Information' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" />
          Back to cart
        </Link>
        <h1 className="text-2xl font-bold text-white">Checkout</h1>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-4 mb-8">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center gap-2 text-sm ${index <= currentStepIndex ? 'text-white' : 'text-gray-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index < currentStepIndex ? 'bg-green-500 text-white' :
                index === currentStepIndex ? 'bg-brand-500 text-white' :
                'bg-gray-700 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className="font-medium">{s.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px mx-4 ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main content */}
        <div className="lg:col-span-7">
          {step === 'information' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="font-semibold text-white mb-4">Contact Information</h2>
              <form onSubmit={handleInformationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Address</label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                    placeholder="+1 555-123-4567"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Continue to Shipping
                </button>
              </form>
            </div>
          )}

          {step === 'shipping' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="font-semibold text-white mb-4">Shipping Method</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="space-y-2">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.shippingMethod === method.id
                          ? 'bg-gray-700 border border-brand-500'
                          : 'bg-gray-900 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-brand-500 bg-gray-800 border-gray-600"
                        />
                        <div>
                          <p className="font-medium text-white">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.days}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${method.price === 0 ? 'text-green-400' : 'text-white'}`}>
                        {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('information')}
                    className="flex-1 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-gray-400" />
                <h2 className="font-semibold text-white">Payment Details</h2>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 pr-10"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="flex-1 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
            <h2 className="font-semibold text-white mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-700">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-white text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-white pt-2 border-t border-gray-700">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
