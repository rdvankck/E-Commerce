import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Orders',
    value: '2,350',
    change: '+15.3%',
    trend: 'up',
    icon: ShoppingCart,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Products',
    value: '456',
    change: '+4.1%',
    trend: 'up',
    icon: Package,
    gradient: 'from-purple-500 to-brand-600',
  },
  {
    name: 'Customers',
    value: '892',
    change: '+10.2%',
    trend: 'up',
    icon: Users,
    gradient: 'from-orange-500 to-pink-600',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 },
  { month: 'Aug', revenue: 6800 },
  { month: 'Sep', revenue: 8200 },
  { month: 'Oct', revenue: 7500 },
  { month: 'Nov', revenue: 9000 },
  { month: 'Dec', revenue: 8500 },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 125.0, status: 'completed', date: '2026-03-05' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 89.5, status: 'processing', date: '2026-03-05' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 234.0, status: 'pending', date: '2026-03-04' },
  { id: 'ORD-004', customer: 'Alice Brown', total: 56.0, status: 'completed', date: '2026-03-04' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <span className="text-sm font-medium text-brand-400">Welcome back</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`
                  flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full
                  ${stat.trend === 'up' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'}
                `}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Charts and tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <button className="text-sm text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
              View details
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <button className="text-sm text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 text-sm font-medium text-white">{order.id}</td>
                    <td className="py-4 text-sm text-gray-300">{order.customer}</td>
                    <td className="py-4">
                      <span
                        className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'completed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : order.status === 'processing'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-white text-right font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
