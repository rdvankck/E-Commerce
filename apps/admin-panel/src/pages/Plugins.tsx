import { useState } from 'react';
import { Search, Download, Settings, Power, ExternalLink, Star, Zap, Check, X } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  author: string;
  isInstalled: boolean;
  isActive: boolean;
  rating: number;
  downloads: number;
}

const mockPlugins: Plugin[] = [
  { id: '1', name: 'analytics', displayName: 'Analytics Dashboard', description: 'Track your store performance with detailed insights', version: '1.2.0', author: 'DataTools', isInstalled: true, isActive: true, rating: 4.8, downloads: 5420 },
  { id: '2', name: 'reviews', displayName: 'Product Reviews', description: 'Customer reviews and ratings system', version: '2.0.1', author: 'ReviewPro', isInstalled: true, isActive: false, rating: 4.5, downloads: 3200 },
  { id: '3', name: 'blog', displayName: 'Blog & CMS', description: 'Content management for your store', version: '1.5.0', author: 'ContentHub', isInstalled: false, isActive: false, rating: 4.6, downloads: 2800 },
  { id: '4', name: 'email-marketing', displayName: 'Email Marketing', description: 'Automated email campaigns and newsletters', version: '3.1.0', author: 'MailMaster', isInstalled: false, isActive: false, rating: 4.3, downloads: 4100 },
  { id: '5', name: 'shipping', displayName: 'Advanced Shipping', description: 'Multiple shipping carriers and tracking', version: '2.2.0', author: 'ShipEasy', isInstalled: true, isActive: true, rating: 4.7, downloads: 6800 },
  { id: '6', name: 'social-login', displayName: 'Social Login', description: 'Enable login with Google, Facebook, Apple', version: '1.8.0', author: 'AuthMate', isInstalled: false, isActive: false, rating: 4.9, downloads: 9200 },
];

export default function PluginsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'installed' | 'available'>('all');

  const filteredPlugins = mockPlugins.filter(plugin => {
    const matchesSearch = plugin.displayName.toLowerCase().includes(search.toLowerCase()) ||
      plugin.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'installed' && plugin.isInstalled) ||
      (filter === 'available' && !plugin.isInstalled);
    return matchesSearch && matchesFilter;
  });

  const installedCount = mockPlugins.filter(p => p.isInstalled).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Plugins</h1>
          <p className="text-gray-400 mt-1">{installedCount} plugins installed</p>
        </div>
        <a
          href="http://localhost:3002"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
        >
          Browse Marketplace
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Search plugins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-400 transition-colors" />
          </div>
          <div className="flex gap-2">
            {(['all', 'installed', 'available'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-brand-600/20 to-brand-500/10 text-brand-400 border border-brand-500/30'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                <span className="text-white font-bold text-xl">{plugin.displayName[0]}</span>
              </div>
              {plugin.isInstalled && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  plugin.isActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                }`}>
                  {plugin.isActive ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {plugin.isActive ? 'Active' : 'Inactive'}
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{plugin.displayName}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{plugin.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>v{plugin.version}</span>
              <span>by {plugin.author}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-5">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {plugin.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {plugin.downloads.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-2">
              {plugin.isInstalled ? (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all font-semibold flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    plugin.isActive
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                  }`}>
                    <Power className="w-4 h-4" />
                    {plugin.isActive ? 'Disable' : 'Enable'}
                  </button>
                </>
              ) : (
                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Install
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
