import { useState } from 'react';
import { Save, Store, Mail, Phone, Globe, Clock, Languages, AlertTriangle, Check } from 'lucide-react';

interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeDescription: string;
  currency: string;
  timezone: string;
  language: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: 'My Store',
    storeEmail: 'contact@mystore.com',
    storePhone: '+1 555-0100',
    storeDescription: 'Your one-stop shop for amazing products',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof StoreSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Success message */}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400">
          <Check className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      {/* General Settings */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center">
            <Store className="w-5 h-5 text-brand-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">General Settings</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Store Description</label>
            <textarea
              value={settings.storeDescription}
              onChange={(e) => handleChange('storeDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Email
                </div>
              </label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => handleChange('storeEmail', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Phone
                </div>
              </label>
              <input
                type="tel"
                value={settings.storePhone}
                onChange={(e) => handleChange('storePhone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Regional Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="TRY">TRY (₺)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timezone
              </div>
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Istanbul">Istanbul (GMT+3)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Language
              </div>
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-red-900/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-500/20 transition-all">
            Reset to Defaults
          </button>
          <button className="px-5 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all">
            Delete Store
          </button>
        </div>
      </div>
    </div>
  );
}
