import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Download,
  Clock,
  ArrowLeft,
  ExternalLink,
  Check,
  Globe,
  Lock,
  Database,
  Mail,
  FileText,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';

// Mock plugin data
const mockPlugin = {
  id: '1',
  name: 'analytics',
  displayName: 'Analytics Dashboard Pro',
  description: 'Advanced analytics dashboard with real-time metrics, custom reports, and export functionality.',
  longDescription: `
## Features

- **Real-time Dashboard**: Monitor your store's performance with live updates
- **Custom Reports**: Build and export custom reports with drag-and-drop interface
- **Sales Analytics**: Track revenue, orders, and conversion rates
- **Product Performance**: Identify top-selling products and categories
- **Customer Insights**: Understand your customers' behavior and preferences
- **Marketing Attribution**: Track the effectiveness of your campaigns

## Requirements

- Core Platform v2.0 or higher
- PostgreSQL database access
  `,
  author: 'DataTools Inc.',
  version: '2.5.0',
  rating: 4.8,
  reviewCount: 124,
  downloads: 5420,
  price: 29.99,
  isFree: false,
  category: 'analytics',
  iconUrl: null,
  screenshots: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
  ],
  changelog: `
### v2.5.0 (2026-03-01)
- Added real-time dashboard widgets
- Improved report export performance
- Fixed timezone handling

### v2.4.0 (2026-02-15)
- New marketing attribution feature
- UI improvements
- Bug fixes
  `,
  permissions: {
    database: true,
    externalApi: ['api.analytics.com', 'api.reports.com'],
    fileStorage: false,
    email: false,
  },
  updatedAt: '2026-03-01',
  isInstalled: false,
  isPurchased: false,
};

const reviews = [
  {
    id: '1',
    author: 'John D.',
    rating: 5,
    title: 'Game changer for our business',
    content: 'This plugin has transformed how we analyze our store data. The real-time dashboard is incredible!',
    date: '2026-02-28',
  },
  {
    id: '2',
    author: 'Sarah M.',
    rating: 4,
    title: 'Great tool, minor learning curve',
    content: 'Very powerful analytics but took some time to set up. Once configured, it works perfectly.',
    date: '2026-02-20',
  },
];

export default function PluginDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'changelog'>('overview');
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsInstalling(false);
  };

  return (
    <div>
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/30">
                <span className="text-white font-bold text-3xl">
                  {mockPlugin.displayName[0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{mockPlugin.displayName}</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-brand-500/20 text-brand-400 rounded-full border border-brand-500/30">
                    v{mockPlugin.version}
                  </span>
                </div>
                <p className="text-gray-400">by <span className="text-brand-400">{mockPlugin.author}</span></p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(mockPlugin.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-white">{mockPlugin.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({mockPlugin.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Download className="w-4 h-4" />
                    <span>{mockPlugin.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <nav className="flex gap-8">
              {(['overview', 'reviews', 'changelog'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    pb-4 text-sm font-semibold border-b-2 transition-all
                    ${activeTab === tab
                      ? 'border-brand-500 text-brand-400'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Screenshots */}
              <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPlugin.screenshots.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full rounded-xl border border-gray-700"
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">About this plugin</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                  {mockPlugin.longDescription.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-400" />
                  Required Permissions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${mockPlugin.permissions.database ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800/50 border border-gray-700'}`}>
                    <Database className={`w-5 h-5 ${mockPlugin.permissions.database ? 'text-green-400' : 'text-gray-500'}`} />
                    <span className={mockPlugin.permissions.database ? 'text-white' : 'text-gray-500'}>Database Access</span>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${mockPlugin.permissions.externalApi.length > 0 ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-gray-800/50 border border-gray-700'}`}>
                    <Globe className={`w-5 h-5 ${mockPlugin.permissions.externalApi.length > 0 ? 'text-yellow-400' : 'text-gray-500'}`} />
                    <div>
                      <span className={mockPlugin.permissions.externalApi.length > 0 ? 'text-white' : 'text-gray-500'}>External API</span>
                      {mockPlugin.permissions.externalApi.length > 0 && (
                        <p className="text-xs text-gray-500">{mockPlugin.permissions.externalApi.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${mockPlugin.permissions.fileStorage ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800/50 border border-gray-700'}`}>
                    <FileText className={`w-5 h-5 ${mockPlugin.permissions.fileStorage ? 'text-green-400' : 'text-gray-500'}`} />
                    <span className={mockPlugin.permissions.fileStorage ? 'text-white' : 'text-gray-500'}>File Storage</span>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${mockPlugin.permissions.email ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800/50 border border-gray-700'}`}>
                    <Mail className={`w-5 h-5 ${mockPlugin.permissions.email ? 'text-green-400' : 'text-gray-500'}`} />
                    <span className={mockPlugin.permissions.email ? 'text-white' : 'text-gray-500'}>Email</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-800 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-white">{review.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <h3 className="font-medium text-white mb-2">{review.title}</h3>
                    <p className="text-gray-400">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Changelog</h2>
              <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                {mockPlugin.changelog.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              {mockPlugin.isFree ? (
                <span className="text-3xl font-bold text-green-400">Free</span>
              ) : (
                <span className="text-3xl font-bold text-white">${mockPlugin.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-6">One-time purchase • Lifetime updates</p>

            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30"
            >
              {isInstalling ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Installing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  {mockPlugin.isInstalled ? 'Update Plugin' : 'Install Plugin'}
                </>
              )}
            </button>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-800 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Last updated</span>
                <span className="font-medium text-white">{mockPlugin.updatedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Version</span>
                <span className="font-medium text-white">{mockPlugin.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-white capitalize">{mockPlugin.category}</span>
              </div>
            </div>

            {/* Support */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="font-medium text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                Need help?
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Contact the plugin developer or check the documentation.
              </p>
              <Link
                to="#"
                className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 mt-3 text-sm font-medium"
              >
                View Documentation
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
