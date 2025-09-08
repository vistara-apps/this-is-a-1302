import React from 'react'
import { TrendingUp, Music, FileText, Users } from 'lucide-react'
import { useSubscription } from '../contexts/SubscriptionContext'
import SampleCard from '../components/SampleCard'
import DataTable from '../components/DataTable'

const Dashboard = () => {
  const { subscriptionTier, tiers, clearancesUsed } = useSubscription()
  const currentTier = tiers[subscriptionTier]

  // Mock data
  const recentSamples = [
    {
      sampleId: '1',
      identifiedSongTitle: 'Apache (Jump On It)',
      originalArtist: 'The Sugarhill Gang',
      rightsHolderName: 'Sugar Hill Records',
      clearanceStatus: 'pending',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      sampleId: '2',
      identifiedSongTitle: 'Funky Drummer',
      originalArtist: 'James Brown',
      rightsHolderName: 'Universal Music',
      clearanceStatus: 'approved',
      createdAt: '2024-01-14T15:30:00Z'
    },
    {
      sampleId: '3',
      identifiedSongTitle: 'Amen Break',
      originalArtist: 'The Winstons',
      rightsHolderName: 'Independent',
      clearanceStatus: 'negotiating',
      createdAt: '2024-01-13T09:15:00Z'
    }
  ]

  const recentActivity = [
    { action: 'Sample identified', details: 'Apache (Jump On It) - The Sugarhill Gang', time: '2 hours ago' },
    { action: 'Clearance approved', details: 'Funky Drummer - James Brown', time: '1 day ago' },
    { action: 'Rights holder contacted', details: 'Amen Break - The Winstons', time: '2 days ago' },
    { action: 'New project created', details: 'Summer Remix Collection', time: '3 days ago' }
  ]

  const activityColumns = [
    { key: 'action', header: 'Action' },
    { key: 'details', header: 'Details' },
    { key: 'time', header: 'Time' }
  ]

  const stats = [
    {
      label: 'Total Samples',
      value: '12',
      icon: Music,
      change: '+3 this week'
    },
    {
      label: 'Active Clearances',
      value: '5',
      icon: FileText,
      change: '+2 this week'
    },
    {
      label: 'Rights Holders',
      value: '8',
      icon: Users,
      change: '+1 this week'
    },
    {
      label: 'Success Rate',
      value: '73%',
      icon: TrendingUp,
      change: '+5% this month'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Dashboard</h1>
        <p className="text-dark-text-secondary">
          Welcome back! Here's what's happening with your samples.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-surface border border-dark-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-text-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-dark-text">{stat.value}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
              <stat.icon className="w-8 h-8 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Status */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-dark-text mb-4">Subscription Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-text-secondary">Current Plan: <span className="font-medium text-dark-text capitalize">{subscriptionTier}</span></p>
            <p className="text-dark-text-secondary">
              Clearances Used: {currentTier.clearances === -1 ? 'Unlimited' : `${clearancesUsed}/${currentTier.clearances}`}
            </p>
          </div>
          {subscriptionTier === 'free' && (
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              Upgrade Plan
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Samples */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-dark-text mb-4">Recent Samples</h2>
          <div className="space-y-4">
            {recentSamples.map((sample) => (
              <SampleCard key={sample.sampleId} sample={sample} variant="compactWithImage" />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-dark-text mb-4">Recent Activity</h2>
          <DataTable data={recentActivity} columns={activityColumns} variant="striped" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard