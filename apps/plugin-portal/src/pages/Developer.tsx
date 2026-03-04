import { Link } from 'react-router-dom';
import { Upload, FileText, Users, Download, DollarSign, TrendingUp, ArrowRight, Sparkles, Zap, Star, Eye } from 'lucide-react';

// Mock developer stats
const stats = {
  totalPlugins: 3,
  totalDownloads: 12847,
  totalRevenue: 4892.50,
  activeUsers: 1243,
};

const myPlugins = [
  {
    id: '1',
    name: 'Analytics Dashboard Pro',
    status: 'published',
    downloads: 5420,
    revenue: 1892.50,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Email Marketing Suite',
    status: 'published',
    downloads: 4890,
    revenue: 2340.00,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Inventory Manager',
    status: 'draft',
    downloads: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
  },
];

export default function Developer() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Developer Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your plugins and track performance</p>
        </div>
        <Link
          to="/developer/submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
        >
          <Upload className="w-5 h-5" />
          Submit New Plugin
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-brand-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalPlugins}</p>
          <p className="text-sm text-gray-400">Total Plugins</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalDownloads.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Total Downloads</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">
            ${stats.totalRevenue.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">Total Revenue</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.activeUsers.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Active Users</p>
        </div>
      </div>

      {/* My plugins */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">My Plugins</h2>
          <Link
            to="/developer/plugins"
            className="text-sm text-brand-400 hover:text-brand-300 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {myPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="px-6 py-5 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                  <span className="text-white font-bold text-lg">
                    {plugin.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{plugin.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className={`
                      px-2.5 py-0.5 rounded-full text-xs font-semibold
                      ${plugin.status === 'published'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                      }
                    `}>
                      {plugin.status}
                    </span>
                    {plugin.rating > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{plugin.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="font-semibold text-white">
                    {plugin.downloads.toLocaleString()}
                  </p>
                  <p className="text-gray-500">downloads</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ${plugin.revenue.toFixed(2)}
                  </p>
                  <p className="text-gray-500">revenue</p>
                </div>
                <Link
                  to={`/developer/plugins/${plugin.id}`}
                  className="p-2 text-gray-400 hover:text-brand-400 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="#"
          className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-brand-500/50 transition-all group"
        >
          <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-500/30 transition-colors">
            <FileText className="w-6 h-6 text-brand-400" />
          </div>
          <h3 className="font-semibold text-white">Documentation</h3>
          <p className="text-sm text-gray-400 mt-2">
            Learn how to build and publish plugins
          </p>
        </a>
        <a
          href="#"
          className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-brand-500/50 transition-all group"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold text-white">Analytics</h3>
          <p className="text-sm text-gray-400 mt-2">
            View detailed plugin analytics
          </p>
        </a>
        <a
          href="#"
          className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-brand-500/50 transition-all group"
        >
          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="font-semibold text-white">Community</h3>
          <p className="text-sm text-gray-400 mt-2">
            Connect with other developers
          </p>
        </a>
      </div>
    </div>
  );
}
