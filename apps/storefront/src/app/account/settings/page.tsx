'use client';

import Link from 'next/link';
import { Bell, Lock, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    language: 'en',
    theme: 'dark',
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        <span>/</span>
        <span className="text-white">Settings</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="w-5 h-5 text-brand-500 bg-gray-800 border-gray-700 rounded focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">Order Updates</p>
                <p className="text-sm text-gray-500">Get notified about order status changes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.orderUpdates}
                onChange={() => handleToggle('orderUpdates')}
                className="w-5 h-5 text-brand-500 bg-gray-800 border-gray-700 rounded focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">Promotions</p>
                <p className="text-sm text-gray-500">Receive promotional offers and discounts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={() => handleToggle('promotions')}
                className="w-5 h-5 text-brand-500 bg-gray-800 border-gray-700 rounded focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-white">Newsletter</p>
                <p className="text-sm text-gray-500">Subscribe to our weekly newsletter</p>
              </div>
              <input
                type="checkbox"
                checked={settings.newsletter}
                onChange={() => handleToggle('newsletter')}
                className="w-5 h-5 text-brand-500 bg-gray-800 border-gray-700 rounded focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              >
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-all">
              <p className="font-medium text-white">Change Password</p>
              <p className="text-sm text-gray-500">Update your account password</p>
            </button>

            <button className="w-full text-left px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-all">
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </button>

            <button className="w-full text-left px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all">
              <p className="font-medium text-red-400">Delete Account</p>
              <p className="text-sm text-red-400/70">Permanently delete your account and all data</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
