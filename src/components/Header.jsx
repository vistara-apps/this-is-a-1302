import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { 
  BellIcon, 
  UserCircleIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-dark-surface border-b border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-dark-text">
            Welcome back, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-dark-text-secondary">
            Subscription: <span className="capitalize font-medium text-accent">{user?.subscriptionTier}</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            to="/subscription"
            className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
          >
            <CreditCardIcon className="h-4 w-4" />
            <span>Upgrade</span>
          </Link>
          
          <button className="p-2 text-dark-text-secondary hover:text-dark-text rounded-lg hover:bg-dark-border transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 text-dark-text-secondary hover:text-dark-text rounded-lg hover:bg-dark-border transition-colors">
              <UserCircleIcon className="h-5 w-5" />
              <span className="hidden sm:block">{user?.email}</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast">
              <Link
                to="/settings"
                className="block px-4 py-2 text-dark-text hover:bg-dark-border transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={signOut}
                className="w-full text-left px-4 py-2 text-dark-text hover:bg-dark-border transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}