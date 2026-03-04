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
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        <span>/</span>
        <span className="text-gray-900">Addresses</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
        <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
          <Plus className="w-5 h-5" />
          Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h2>
          <p className="text-gray-500 mb-6">Add an address for faster checkout.</p>
          <button className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition">
            <Plus className="w-5 h-5" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className={`bg-white rounded-lg shadow-sm border-2 p-6 ${address.isDefault ? 'border-primary-500' : 'border-gray-200'}`}>
              {address.isDefault && (
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded mb-3">
                  Default
                </span>
              )}
              <p className="font-medium text-gray-900">
                {address.firstName} {address.lastName}
              </p>
              <p className="text-gray-600 mt-1">
                {address.address1}
                {address.address2 && <><br />{address.address2}</>}
              </p>
              <p className="text-gray-600">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-gray-600">{address.country}</p>
              <p className="text-gray-600 mt-2">{address.phone}</p>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                <button className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefault(address.id)}
                    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Set as Default
                  </button>
                )}
                {!address.isDefault && (
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
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
