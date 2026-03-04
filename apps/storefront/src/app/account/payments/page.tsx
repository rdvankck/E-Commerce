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
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <span className="text-white">Payment Methods</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Payment Methods</h1>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-2 rounded-xl font-medium hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30">
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No payment methods</h2>
          <p className="text-gray-400 mb-6">Add a card for faster checkout.</p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30">
            <Plus className="w-5 h-5" />
            Add Card
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Card Visual */}
                  <div className={`w-16 h-10 rounded-lg bg-gradient-to-br ${getCardIcon(card.brand)} flex items-center justify-center text-white text-xs font-bold`}>
                    {card.brand}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {card.brand} ending in {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {card.isDefault && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-500/20 text-brand-400 text-xs font-medium rounded-full">
                      <Star className="w-3 h-3" />
                      Default
                    </span>
                  )}
                  <button className="p-2 hover:bg-gray-800 rounded-xl transition-all">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              {!card.isDefault && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => setDefault(card.id)}
                    className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
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
