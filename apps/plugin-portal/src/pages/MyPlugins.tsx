import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Settings, Power, Trash2, Play, Pause, Check, AlertCircle, Sparkles } from 'lucide-react';

// Mock installed plugins
const installedPlugins = [
  {
    id: '1',
    name: 'Analytics Dashboard',
    version: '2.5.0',
    status: 'active',
    installedAt: '2026-02-15',
    settings: {
      trackVisitors: true,
      exportFormat: 'csv',
    },
  },
  {
    id: '2',
    name: 'Blog & CMS',
    version: '1.3.0',
    status: 'active',
    installedAt: '2026-01-20',
    settings: {
      postsPerPage: 10,
      enableComments: true,
    },
  },
  {
    id: '3',
    name: 'Product Reviews',
    version: '3.1.0',
    status: 'inactive',
    installedAt: '2026-01-10',
    settings: {
      requirePurchase: false,
      moderateReviews: true,
    },
  },
];

export default function MyPlugins() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [plugins, setPlugins] = useState(installedPlugins);

  const filteredPlugins = plugins.filter(
    (p) => filter === 'all' || p.status === filter
  );

  const handleToggle = (id: string) => {
    setPlugins(plugins.map(p =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const handleUninstall = (id: string) => {
    setPlugins(plugins.filter(p => p.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Plugins</h1>
          <p className="text-gray-400 mt-2">Manage installed plugins for your store</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
        >
          <Package className="w-5 h-5" />
          Browse Plugins
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-bold text-white">{plugins.length}</p>
          <p className="text-sm text-gray-400 mt-1">Total Installed</p>
        </div>
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-bold text-green-400">{plugins.filter(p => p.status === 'active').length}</p>
          <p className="text-sm text-gray-400 mt-1">Active</p>
        </div>
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-5">
          <p className="text-3xl font-bold text-gray-400">{plugins.filter(p => p.status === 'inactive').length}</p>
          <p className="text-sm text-gray-400 mt-1">Inactive</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'active', 'inactive'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${filter === f
                ? 'bg-gradient-to-r from-brand-600/20 to-brand-500/10 text-brand-400 border border-brand-500/30'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
              }
            `}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Plugin list */}
      {filteredPlugins.length > 0 ? (
        <div className="space-y-4">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <span className="text-white font-bold text-xl">
                      {plugin.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{plugin.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span>v{plugin.version}</span>
                      <span>•</span>
                      <span>Installed {plugin.installedAt}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                    ${plugin.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                    }
                  `}
                >
                  {plugin.status === 'active' ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  {plugin.status}
                </span>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(plugin.id)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                      ${plugin.status === 'active'
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                      }
                    `}
                  >
                    {plugin.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Activate
                      </>
                    )}
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>

                <button
                  onClick={() => handleUninstall(plugin.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Uninstall
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No plugins found</h3>
          <p className="text-gray-400 mb-6">
            {filter === 'all'
              ? "You haven't installed any plugins yet."
              : `No ${filter} plugins.`}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
          >
            <Sparkles className="w-5 h-5" />
            Browse Plugins
          </Link>
        </div>
      )}
    </div>
  );
}
