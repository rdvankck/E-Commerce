'use client';

import Link from 'next/link';
import { CreditCard, Plus, Star, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const initialCards = [
  {
    id: '1',
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: '2',
    brand: 'Mastercard',
    last4: '8888',
    expiryMonth: 6,
    expiryYear: 2026,
    isDefault: false,
  },
];

const getCardIcon = (brand: string) => {
  const colors: Record<string, string> = {
    Visa: 'from-blue-600 to-blue-800',
    Mastercard: 'from-red-500 to-yellow-500',
    Amex: 'from-blue-400 to-blue-600',
  };
  return colors[brand] || 'from-gray-600 to-gray-800';
};

export default function PaymentsPage() {
  const [cards, setCards] = useState(initialCards);

  const setDefault = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id,
    })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        <span>/</span>
        <span className="text-gray-900">Payment Methods</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
        <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-16">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No payment methods</h2>
          <p className="text-gray-500 mb-6">Add a card for faster checkout.</p>
          <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition">
            <Plus className="w-5 h-5" />
            Add Card
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Card Visual */}
                  <div className={`w-16 h-10 rounded-lg bg-gradient-to-br ${getCardIcon(card.brand)} flex items-center justify-center text-white text-xs font-bold`}>
                    {card.brand}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {card.brand} ending in {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {card.isDefault && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                      <Star className="w-3 h-3" />
                      Default
                    </span>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              {!card.isDefault && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setDefault(card.id)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Set as Default
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
