import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Clock, Filter, Grid, List, ChevronRight, Sparkles, Zap, Shield, Users } from 'lucide-react';

// Mock data
const plugins = [
  {
    id: '1',
    name: 'Analytics Dashboard Pro',
    displayName: 'Analytics Dashboard Pro',
    description: 'Advanced analytics with real-time dashboards, custom reports, and export functionality.',
    author: 'DataTools Inc.',
    rating: 4.8,
    reviewCount: 124,
    downloads: 5420,
    price: 29.99,
    isFree: false,
    category: 'analytics',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-03-01',
  },
  {
    id: '2',
    name: 'blog',
    displayName: 'Blog & CMS',
    description: 'Full-featured blog system with categories, tags, SEO optimization, and scheduled publishing.',
    author: 'ContentHQ',
    rating: 4.6,
    reviewCount: 89,
    downloads: 8930,
    price: 0,
    isFree: true,
    category: 'content',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-02-28',
  },
  {
    id: '3',
    name: 'product-reviews',
    displayName: 'Product Reviews',
    description: 'Customer reviews and ratings system with photo uploads, moderation, and review reminders.',
    author: 'ReviewPro',
    rating: 4.5,
    reviewCount: 67,
    downloads: 3210,
    price: 19.99,
    isFree: false,
    category: 'commerce',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-02-25',
  },
  {
    id: '4',
    name: 'email-marketing',
    displayName: 'Email Marketing Suite',
    description: 'Newsletter campaigns, automated emails, customer segmentation, and A/B testing.',
    author: 'MailMaster',
    rating: 4.7,
    reviewCount: 156,
    downloads: 7890,
    price: 49.99,
    isFree: false,
    category: 'marketing',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-03-02',
  },
  {
    id: '5',
    name: 'social-login',
    displayName: 'Social Login',
    description: 'Enable login with Google, Facebook, Apple, and more. Easy setup and secure authentication.',
    author: 'AuthMate',
    rating: 4.9,
    reviewCount: 203,
    downloads: 12450,
    price: 0,
    isFree: true,
    category: 'authentication',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-03-03',
  },
  {
    id: '6',
    name: 'inventory-alerts',
    displayName: 'Inventory Alerts',
    description: 'Low stock notifications, reorder alerts, and inventory forecasting.',
    author: 'StockWise',
    rating: 4.4,
    reviewCount: 45,
    downloads: 2180,
    price: 14.99,
    isFree: false,
    category: 'inventory',
    iconUrl: null,
    screenshots: [],
    updatedAt: '2026-02-20',
  },
];

const categories = [
  { id: 'all', name: 'All Categories', count: 6 },
  { id: 'commerce', name: 'Commerce', count: 1 },
  { id: 'content', name: 'Content & Media', count: 1 },
  { id: 'marketing', name: 'Marketing', count: 1 },
  { id: 'analytics', name: 'Analytics', count: 1 },
  { id: 'authentication', name: 'Authentication', count: 1 },
  { id: 'inventory', name: 'Inventory', count: 1 },
];

const stats = [
  { icon: Zap, label: 'Active Plugins', value: '150+' },
  { icon: Users, label: 'Developers', value: '2,400+' },
  { icon: Download, label: 'Downloads', value: '1.2M+' },
  { icon: Shield, label: 'Verified', value: '100%' },
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPlugins = plugins
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'price-low') return (a.isFree ? 0 : a.price) - (b.isFree ? 0 : b.price);
      if (sortBy === 'price-high') return (b.isFree ? 0 : b.price) - (a.isFree ? 0 : a.price);
      return 0;
    });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 rounded-3xl p-8 md:p-12 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full text-brand-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Plugin Marketplace 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Extend Your Store with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400">
              Powerful Plugins
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Discover hundreds of plugins to enhance your e-commerce platform. From analytics to marketing, find the perfect tools for your business.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <stat.icon className="w-6 h-6 text-brand-400 mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-4 sticky top-28">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
                      w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all
                      ${selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-brand-600/20 to-brand-500/10 text-brand-400 border border-brand-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <span className="flex items-center justify-between">
                      {cat.name}
                      <span className="text-xs opacity-60">{cat.count}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-400">{filteredPlugins.length} plugins found</p>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Plugins grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPlugins.map((plugin) => (
                <Link
                  key={plugin.id}
                  to={`/plugin/${plugin.id}`}
                  className="group bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 hover:border-brand-500/50 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all">
                      <span className="text-white font-bold text-xl">
                        {plugin.displayName[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-brand-400 transition-colors">{plugin.displayName}</h3>
                      <p className="text-sm text-gray-400">{plugin.author}</p>
                    </div>
                    {plugin.isFree ? (
                      <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 font-medium text-sm px-3 py-1 rounded-full border border-green-500/30">Free</span>
                    ) : (
                      <span className="text-white font-bold text-sm">
                        ${plugin.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-gray-400 line-clamp-2">{plugin.description}</p>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-300">{plugin.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span className="text-gray-300">{plugin.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPlugins.map((plugin) => (
                <Link
                  key={plugin.id}
                  to={`/plugin/${plugin.id}`}
                  className="group flex items-center gap-6 bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-5 hover:border-brand-500/50 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30">
                    <span className="text-white font-bold text-2xl">
                      {plugin.displayName[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-brand-400 transition-colors">{plugin.displayName}</h3>
                        <p className="text-sm text-gray-400">{plugin.author}</p>
                      </div>
                      {plugin.isFree ? (
                        <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 font-medium px-3 py-1 rounded-full border border-green-500/30">Free</span>
                      ) : (
                        <span className="text-white font-bold">
                          ${plugin.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-400 line-clamp-1">{plugin.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300">{plugin.rating.toFixed(1)} ({plugin.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span className="text-gray-300">{plugin.downloads.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-gray-300">Updated {plugin.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-brand-400 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
