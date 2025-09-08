import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  UserCircleIcon,
  EnvelopeIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

export default function Settings() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileForm, setProfileForm] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    company: '',
    bio: ''
  })
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    clearanceUpdates: true,
    marketingEmails: false,
    weeklyDigest: true
  })
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon }
  ]

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // In a real app, update user profile
    alert('Profile updated successfully!')
  }

  const handleNotificationUpdate = () => {
    // In a real app, update notification preferences
    alert('Notification preferences updated!')
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (security.newPassword !== security.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // In a real app, update password
    alert('Password updated successfully!')
    setSecurity({
      ...security,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-text">Settings</h1>
        <p className="text-dark-text-secondary mt-1">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-border'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-dark-text mb-6">Profile Information</h2>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">
                      Change Photo
                    </button>
                    <p className="text-dark-text-secondary text-sm mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="input w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Company/Label
                  </label>
                  <input
                    type="text"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                    className="input w-full"
                    placeholder="Enter your company or record label"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                    className="input w-full h-24 resize-none"
                    placeholder="Tell us about yourself and your music..."
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-dark-text mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text">Email Updates</h3>
                    <p className="text-dark-text-secondary text-sm">
                      Receive general updates about your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailUpdates}
                      onChange={(e) => setNotifications({...notifications, emailUpdates: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text">Clearance Updates</h3>
                    <p className="text-dark-text-secondary text-sm">
                      Get notified when clearance requests are updated
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.clearanceUpdates}
                      onChange={(e) => setNotifications({...notifications, clearanceUpdates: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text">Marketing Emails</h3>
                    <p className="text-dark-text-secondary text-sm">
                      Receive promotional emails and product updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => setNotifications({...notifications, marketingEmails: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text">Weekly Digest</h3>
                    <p className="text-dark-text-secondary text-sm">
                      Weekly summary of your activity and pending items
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyDigest}
                      onChange={(e) => setNotifications({...notifications, weeklyDigest: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button onClick={handleNotificationUpdate} className="btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="card">
                <h2 className="text-xl font-semibold text-dark-text mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={security.currentPassword}
                      onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                      className="input w-full"
                      placeholder="Enter your new password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                      className="input w-full"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="card">
                <h2 className="text-xl font-semibold text-dark-text mb-6">Two-Factor Authentication</h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text">Enable 2FA</h3>
                    <p className="text-dark-text-secondary text-sm">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, twoFactorEnabled: !security.twoFactorEnabled})}
                    className={`btn-primary text-sm ${security.twoFactorEnabled ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  >
                    {security.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="card">
                <h2 className="text-xl font-semibold text-dark-text mb-6">Current Plan</h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-dark-text capitalize">{user?.subscriptionTier} Plan</h3>
                    <p className="text-dark-text-secondary text-sm">
                      {user?.subscriptionTier === 'free' ? 'Free tier' : 
                       user?.subscriptionTier === 'creator' ? '$15/month' : '$49/month'}
                    </p>
                  </div>
                  <button className="btn-primary">
                    Change Plan
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h2 className="text-xl font-semibold text-dark-text mb-6">Payment Method</h2>
                
                {user?.subscriptionTier === 'free' ? (
                  <div className="text-center py-8">
                    <CreditCardIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
                    <p className="text-dark-text-secondary">No payment method required for free plan</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                          <CreditCardIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-dark-text">•••• •••• •••• 4242</p>
                          <p className="text-dark-text-secondary text-sm">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm">
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing History */}
              <div className="card">
                <h2 className="text-xl font-semibold text-dark-text mb-6">Billing History</h2>
                
                {user?.subscriptionTier === 'free' ? (
                  <div className="text-center py-8">
                    <p className="text-dark-text-secondary">No billing history for free plan</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                      <div>
                        <p className="font-medium text-dark-text">January 2024</p>
                        <p className="text-dark-text-secondary text-sm">
                          {user?.subscriptionTier === 'creator' ? 'Creator Plan' : 'Pro Plan'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-dark-text">
                          ${user?.subscriptionTier === 'creator' ? '15.00' : '49.00'}
                        </p>
                        <button className="text-primary hover:text-primary/80 text-sm">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-500/20 bg-red-500/5">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-dark-text-secondary mb-6">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Sign Out
          </button>
          <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}