import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const { projects, samples, clearanceRequests } = useData()
  const { user } = useAuth()

  const stats = {
    totalSamples: samples.length,
    pendingClearances: clearanceRequests.filter(r => r.responseStatus === 'pending').length,
    approvedClearances: clearanceRequests.filter(r => r.responseStatus === 'approved').length,
    totalProjects: projects.length
  }

  const recentSamples = samples.slice(0, 5)
  const recentClearances = clearanceRequests.slice(0, 5)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'negotiating':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending'
      case 'rejected':
        return 'Rejected'
      case 'negotiating':
        return 'Negotiating'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-text">Dashboard</h1>
          <p className="text-dark-text-secondary mt-1">
            Overview of your sample clearance activity
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/find-samples"
            className="btn-primary flex items-center space-x-2"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
            <span>Find Samples</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary/10">
              <DocumentCheckIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-dark-text">{stats.totalSamples}</p>
              <p className="text-dark-text-secondary">Total Samples</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <ClockIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-dark-text">{stats.pendingClearances}</p>
              <p className="text-dark-text-secondary">Pending Clearances</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-dark-text">{stats.approvedClearances}</p>
              <p className="text-dark-text-secondary">Approved Clearances</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-accent/10">
              <PlusIcon className="h-6 w-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-dark-text">{stats.totalProjects}</p>
              <p className="text-dark-text-secondary">Active Projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Samples */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-dark-text">Recent Samples</h2>
            <Link
              to="/find-samples"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          {recentSamples.length > 0 ? (
            <div className="space-y-4">
              {recentSamples.map((sample) => (
                <div key={sample.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-dark-text">{sample.title}</h3>
                    <p className="text-dark-text-secondary text-sm">
                      {sample.originalArtist} - {sample.originalSong}
                    </p>
                    <p className="text-dark-text-secondary text-xs mt-1">
                      Rights Holder: {sample.rightsHolder}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(sample.clearanceStatus)}
                    <span className="text-sm text-dark-text-secondary">
                      {getStatusText(sample.clearanceStatus)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MagnifyingGlassIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">No samples found yet</p>
              <Link
                to="/find-samples"
                className="text-primary hover:text-primary/80 text-sm font-medium mt-2 inline-block"
              >
                Start finding samples
              </Link>
            </div>
          )}
        </div>

        {/* Recent Clearance Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-dark-text">Recent Clearance Requests</h2>
            <Link
              to="/clearances"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          {recentClearances.length > 0 ? (
            <div className="space-y-4">
              {recentClearances.map((request) => {
                const sample = samples.find(s => s.id === request.sampleId)
                return (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-dark-text">
                        {sample?.title || 'Unknown Sample'}
                      </h3>
                      <p className="text-dark-text-secondary text-sm">
                        Submitted: {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                      {request.termsOffered && (
                        <p className="text-dark-text-secondary text-xs mt-1">
                          Terms: {request.termsOffered}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.responseStatus)}
                      <span className="text-sm text-dark-text-secondary">
                        {getStatusText(request.responseStatus)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <DocumentCheckIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">No clearance requests yet</p>
              <Link
                to="/find-samples"
                className="text-primary hover:text-primary/80 text-sm font-medium mt-2 inline-block"
              >
                Create your first request
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark-text mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/find-samples"
            className="flex items-center p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors group"
          >
            <MagnifyingGlassIcon className="h-8 w-8 text-primary group-hover:scale-105 transition-transform" />
            <div className="ml-4">
              <h3 className="font-medium text-dark-text">Find New Samples</h3>
              <p className="text-dark-text-secondary text-sm">Upload audio or search by title</p>
            </div>
          </Link>

          <Link
            to="/clearances"
            className="flex items-center p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors group"
          >
            <DocumentCheckIcon className="h-8 w-8 text-accent group-hover:scale-105 transition-transform" />
            <div className="ml-4">
              <h3 className="font-medium text-dark-text">Manage Clearances</h3>
              <p className="text-dark-text-secondary text-sm">Track request progress</p>
            </div>
          </Link>

          <Link
            to="/rights-holders"
            className="flex items-center p-4 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors group"
          >
            <DocumentCheckIcon className="h-8 w-8 text-green-500 group-hover:scale-105 transition-transform" />
            <div className="ml-4">
              <h3 className="font-medium text-dark-text">Browse Rights Holders</h3>
              <p className="text-dark-text-secondary text-sm">Access contact database</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}