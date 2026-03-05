'use client';

import Link from 'next/link';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialAddresses = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phone: '555-123-4567',
    isDefault: true,
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    address1: '456 Oak Ave',
    address2: '',
    city: 'Los Angeles',
    state: 'CA',
    postalCode: '90001',
    country: 'United States',
    phone: '555-987-6543',
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);

  const setDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <span className="text-white">Addresses</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Addresses</h1>
        <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-600 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No addresses saved</h2>
          <p className="text-gray-400 mb-6">Add an address for faster checkout.</p>
          <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-600 transition-colors">
            <Plus className="w-5 h-5" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className={`bg-gray-800 rounded-lg p-4 ${address.isDefault ? 'ring-2 ring-brand-500' : ''}`}>
              {address.isDefault && (
                <span className="inline-block px-2 py-0.5 bg-brand-500/20 text-brand-400 text-xs font-medium rounded mb-2">
                  Default
                </span>
              )}
              <p className="font-medium text-white">
                {address.firstName} {address.lastName}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {address.address1}
                {address.address2 && <>, {address.address2}</>}
              </p>
              <p className="text-gray-400 text-sm">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-gray-400 text-sm">{address.country}</p>
              <p className="text-gray-400 text-sm mt-2">{address.phone}</p>

              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-700">
                <button className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefault(address.id)}
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                {!address.isDefault && (
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
