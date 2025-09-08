import React, { useState } from 'react'
import { User, CreditCard, Bell, Shield, Download } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'

const Settings = () => {
  const { user, logout } = useAuth()
  const { subscriptionTier, tiers, upgradeTier } = useSubscription()
  const [notifications, setNotifications] = useState({
    clearanceUpdates: true,
    newMatches: false,
    weeklyReports: true
  })

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Settings</h1>
        <p className="text-dark-text-secondary">
          Manage your account preferences and subscription.
        </p>
      </div>

      {/* Account Information */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-dark-text">Account Information</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text-secondary cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">Display Name</label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Update Profile
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-dark-text">Subscription</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
            <div>
              <div className="font-medium text-dark-text capitalize">
                {tiers[subscriptionTier].name} Plan
              </div>
              <div className="text-sm text-dark-text-secondary">
                ${tiers[subscriptionTier].price}/month
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-dark-text-secondary">
                {tiers[subscriptionTier].clearances === -1 ? 'Unlimited' : tiers[subscriptionTier].clearances} clearances/month
              </div>
              <div className="text-sm text-dark-text-secondary">
                {tiers[subscriptionTier].searches === -1 ? 'Unlimited' : tiers[subscriptionTier].searches} searches/month
              </div>
            </div>
          </div>
          
          {subscriptionTier !== 'pro' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(tiers).filter(([key]) => key !== subscriptionTier).map(([key, tier]) => (
                <div key={key} className="border border-dark-border rounded-lg p-4">
                  <div className="font-medium text-dark-text">{tier.name} Plan</div>
                  <div className="text-sm text-dark-text-secondary mb-2">
                    ${tier.price}/month
                  </div>
                  <button
                    onClick={() => upgradeTier(key)}
                    className="w-full px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                  >
                    Upgrade
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-dark-text">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-dark-text">
                  {key === 'clearanceUpdates' && 'Clearance Updates'}
                  {key === 'newMatches' && 'New Sample Matches'}
                  {key === 'weeklyReports' && 'Weekly Reports'}
                </div>
                <div className="text-sm text-dark-text-secondary">
                  {key === 'clearanceUpdates' && 'Get notified when clearance requests are updated'}
                  {key === 'newMatches' && 'Receive alerts for new sample matches'}
                  {key === 'weeklyReports' && 'Weekly summary of your activity'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={value}
                  onChange={() => handleNotificationChange(key)}
                />
                <div className="w-11 h-6 bg-dark-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-dark-text">Data & Privacy</h2>
        </div>
        
        <div className="space-y-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-dark-border rounded-md hover:bg-dark-bg transition-colors">
            <Download className="w-4 h-4 text-dark-text-secondary" />
            <span className="text-dark-text">Export My Data</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-400 rounded-md hover:bg-red-600/10 transition-colors">
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Settings