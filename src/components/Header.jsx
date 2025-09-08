import React from 'react'
import { Search, Bell, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'

const Header = () => {
  const { user, logout } = useAuth()
  const { subscriptionTier, tiers, clearancesUsed } = useSubscription()
  const currentTier = tiers[subscriptionTier]

  return (
    <header className="bg-dark-surface border-b border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary w-4 h-4" />
            <input
              type="text"
              placeholder="Search samples, artists, or rights holders..."
              className="pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 sm:w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-dark-text-secondary">
            {currentTier.clearances === -1 ? 'Unlimited' : `${clearancesUsed}/${currentTier.clearances}`} clearances
          </div>
          
          <button className="p-2 text-dark-text-secondary hover:text-dark-text transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-dark-text">{user?.email}</div>
              <div className="text-xs text-dark-text-secondary capitalize">{subscriptionTier} Plan</div>
            </div>
            <button 
              onClick={logout}
              className="p-2 bg-dark-bg rounded-full hover:bg-dark-border transition-colors"
            >
              <User className="w-5 h-5 text-dark-text" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header