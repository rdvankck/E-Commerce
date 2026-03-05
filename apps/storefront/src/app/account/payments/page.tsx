'use client';

import Link from 'next/link';
import { CreditCard, Plus, Star, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const initialCards = [
  { id: '1', brand: 'Visa', last4: '4242', expiryMonth: 12, expiryYear: 2025, isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '8888', expiryMonth: 6, expiryYear: 2026, isDefault: false },
];

const getCardIcon = (brand: string) => {
  const colors: Record<string, string> = {
    Visa: 'bg-blue-600',
    Mastercard: 'bg-red-500',
    Amex: 'bg-blue-400',
  };
  return colors[brand] || 'bg-gray-600';
};

export default function PaymentsPage() {
  const [cards, setCards] = useState(initialCards);

  const setDefault = (id: string) => {
    setCards(cards.map(card => ({ ...card, isDefault: card.id === id })));
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
        <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
        <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-600 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No payment methods</h2>
          <p className="text-gray-400 mb-6">Add a card for faster checkout.</p>
          <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors">
            <Plus className="w-5 h-5" />
            Add Card
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-8 rounded ${getCardIcon(card.brand)} flex items-center justify-center text-white text-xs font-bold`}>
                  {card.brand}
                </div>
                <div>
                  <p className="font-medium text-white">{card.brand} ending in {card.last4}</p>
                  <p className="text-sm text-gray-500">Expires {card.expiryMonth}/{card.expiryYear}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {card.isDefault ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-500/20 text-brand-400 text-xs font-medium rounded">
                    <Star className="w-3 h-3" />
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => setDefault(card.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
