import { useState } from 'react';
import { Search, Mail, Eye, Users, ShoppingBag, DollarSign } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  status: 'active' | 'inactive';
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0100', totalOrders: 5, totalSpent: 499.95, createdAt: '2026-01-15', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0101', totalOrders: 3, totalSpent: 249.97, createdAt: '2026-01-20', status: 'active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', totalOrders: 1, totalSpent: 79.99, createdAt: '2026-02-01', status: 'inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 555-0103', totalOrders: 8, totalSpent: 899.92, createdAt: '2026-02-10', status: 'active' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', totalOrders: 2, totalSpent: 119.98, createdAt: '2026-02-15', status: 'active' },
  { id: '6', name: 'Eva Martinez', email: 'eva@example.com', phone: '+1 555-0105', totalOrders: 6, totalSpent: 645.94, createdAt: '2026-02-20', status: 'active' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = mockCustomers.length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="text-gray-400 mt-1">Manage your customer base</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalCustomers}</p>
              <p className="text-sm text-gray-400">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalOrders}</p>
              <p className="text-sm text-gray-400">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
      </div>

      {/* Customers Table */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-white">{customer.name}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-700/50 text-gray-400'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-white">{customer.email}</div>
                  {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
                </td>
                <td className="px-6 py-5">
                  <span className="text-white font-medium">{customer.totalOrders}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-lg font-bold text-white">${customer.totalSpent.toFixed(2)}</span>
                </td>
                <td className="px-6 py-5 text-gray-400">
                  {customer.createdAt}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:text-brand-400 hover:bg-gray-700 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
