import { useState } from 'react';
import { Search, Filter, Eye, ShoppingCart, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
}

const mockOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-2026-001', customerName: 'John Doe', email: 'john@example.com', status: 'pending', total: 99.99, createdAt: '2026-03-01' },
  { id: '2', orderNumber: 'ORD-2026-002', customerName: 'Jane Smith', email: 'jane@example.com', status: 'processing', total: 149.99, createdAt: '2026-03-02' },
  { id: '3', orderNumber: 'ORD-2026-003', customerName: 'Bob Wilson', email: 'bob@example.com', status: 'shipped', total: 79.99, createdAt: '2026-03-03' },
  { id: '4', orderNumber: 'ORD-2026-004', customerName: 'Alice Brown', email: 'alice@example.com', status: 'delivered', total: 199.99, createdAt: '2026-03-04' },
  { id: '5', orderNumber: 'ORD-2026-005', customerName: 'Charlie Davis', email: 'charlie@example.com', status: 'pending', total: 59.99, createdAt: '2026-03-05' },
  { id: '6', orderNumber: 'ORD-2026-006', customerName: 'Eva Martinez', email: 'eva@example.com', status: 'delivered', total: 249.99, createdAt: '2026-03-05' },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  pending: { color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', icon: Clock, label: 'Pending' },
  processing: { color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', icon: ShoppingCart, label: 'Processing' },
  shipped: { color: 'bg-purple-500/20 text-purple-400 border border-purple-500/30', icon: Truck, label: 'Shipped' },
  delivered: { color: 'bg-green-500/20 text-green-400 border border-green-500/30', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'bg-red-500/20 text-red-400 border border-red-500/30', icon: XCircle, label: 'Cancelled' },
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 mt-1">Manage customer orders</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = mockOrders.filter(o => o.status === status).length;
          const Icon = config.icon;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              className={`
                p-4 rounded-2xl border transition-all
                ${statusFilter === status
                  ? 'bg-gray-800 border-brand-500/50'
                  : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${config.color.split(' ')[1]}`} />
                <span className="text-2xl font-bold text-white">{count}</span>
              </div>
              <span className="text-sm text-gray-400">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;
              return (
                <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="font-semibold text-white">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <div className="font-medium text-white">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${config.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-lg font-bold text-white">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5 text-gray-400">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2.5 rounded-xl bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
