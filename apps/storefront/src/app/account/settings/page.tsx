'use client';

import Link from 'next/link';
import { Bell, Lock, Globe, Moon, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    language: 'en',
    theme: 'light',
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
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/account" className="hover:text-gray-900">Account</Link>
        <span>/</span>
        <span className="text-gray-900">Settings</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Order Updates</p>
                <p className="text-sm text-gray-500">Get notified about order status changes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.orderUpdates}
                onChange={() => handleToggle('orderUpdates')}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Promotions</p>
                <p className="text-sm text-gray-500">Receive promotional offers and discounts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={() => handleToggle('promotions')}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">Newsletter</p>
                <p className="text-sm text-gray-500">Subscribe to our weekly newsletter</p>
              </div>
              <input
                type="checkbox"
                checked={settings.newsletter}
                onChange={() => handleToggle('newsletter')}
                className="w-5 h-5 text-primary-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-500">Update your account password</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 transition">
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-red-500">Permanently delete your account and all data</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
