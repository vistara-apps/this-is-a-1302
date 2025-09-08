import React, { useState } from 'react'
import { Filter, Download, Eye } from 'lucide-react'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import ActionForm from '../components/ActionForm'

const MyClearances = () => {
  const [selectedClearance, setSelectedClearance] = useState(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock clearance data
  const clearances = [
    {
      clearanceRequestId: '1',
      sampleTitle: 'Apache (Jump On It)',
      originalArtist: 'The Sugarhill Gang',
      rightsHolder: 'Sugar Hill Records',
      requestDate: '2024-01-15',
      responseStatus: 'pending',
      termsOffered: 'Pending response',
      projectName: 'Summer Beats EP'
    },
    {
      clearanceRequestId: '2',
      sampleTitle: 'Funky Drummer',
      originalArtist: 'James Brown',
      rightsHolder: 'Universal Music Group',
      requestDate: '2024-01-10',
      responseStatus: 'approved',
      termsOffered: '$500 + 15% royalties',
      projectName: 'Hip Hop Collection'
    },
    {
      clearanceRequestId: '3',
      sampleTitle: 'Amen Break',
      originalArtist: 'The Winstons',
      rightsHolder: 'Independent',
      requestDate: '2024-01-08',
      responseStatus: 'negotiating',
      termsOffered: 'Counter-offer: $200 + 10%',
      projectName: 'Drum & Bass Mix'
    },
    {
      clearanceRequestId: '4',
      sampleTitle: 'Think (About It)',
      originalArtist: 'Lyn Collins',
      rightsHolder: 'Sony Music',
      requestDate: '2024-01-05',
      responseStatus: 'rejected',
      termsOffered: 'Not available for licensing',
      projectName: 'Remix Series'
    }
  ]

  const filteredClearances = filterStatus === 'all' 
    ? clearances 
    : clearances.filter(c => c.responseStatus === filterStatus)

  const clearanceColumns = [
    { 
      key: 'sampleTitle', 
      header: 'Sample',
      render: (value, row) => (
        <div>
          <div className="font-medium text-dark-text">{value}</div>
          <div className="text-sm text-dark-text-secondary">{row.originalArtist}</div>
        </div>
      )
    },
    { key: 'rightsHolder', header: 'Rights Holder' },
    { key: 'projectName', header: 'Project' },
    { key: 'requestDate', header: 'Requested' },
    { 
      key: 'responseStatus', 
      header: 'Status',
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedClearance(row)}
            className="p-1 text-dark-text-secondary hover:text-primary transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-dark-text-secondary hover:text-primary transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const handleNewClearanceRequest = (formData) => {
    console.log('New clearance request:', formData)
    setShowRequestForm(false)
    // Here you would typically send the request to your backend
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-text">My Clearances</h1>
          <p className="text-dark-text-secondary">
            Track and manage all your sample clearance requests.
          </p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 bg-dark-surface border border-dark-border rounded-lg p-4">
        <Filter className="w-5 h-5 text-dark-text-secondary" />
        <span className="text-sm font-medium text-dark-text">Filter by status:</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-dark-bg border border-dark-border rounded-md px-3 py-1 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="negotiating">Negotiating</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Clearances Table */}
      <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
        <DataTable 
          data={filteredClearances} 
          columns={clearanceColumns} 
          variant="bordered" 
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: clearances.length, color: 'text-dark-text' },
          { label: 'Approved', value: clearances.filter(c => c.responseStatus === 'approved').length, color: 'text-green-400' },
          { label: 'Pending', value: clearances.filter(c => c.responseStatus === 'pending').length, color: 'text-yellow-400' },
          { label: 'Rejected', value: clearances.filter(c => c.responseStatus === 'rejected').length, color: 'text-red-400' }
        ].map((stat, index) => (
          <div key={index} className="bg-dark-surface border border-dark-border rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-dark-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-bg border border-dark-border rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-text">New Clearance Request</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-dark-text-secondary hover:text-dark-text"
                >
                  ✕
                </button>
              </div>
              <ActionForm variant="clearanceRequest" onSubmit={handleNewClearanceRequest} />
            </div>
          </div>
        </div>
      )}

      {/* Clearance Detail Modal */}
      {selectedClearance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-bg border border-dark-border rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-text">Clearance Details</h2>
                <button
                  onClick={() => setSelectedClearance(null)}
                  className="text-dark-text-secondary hover:text-dark-text"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-dark-text mb-2">Sample Information</h3>
                  <p className="text-dark-text-secondary">
                    <strong>Title:</strong> {selectedClearance.sampleTitle}
                  </p>
                  <p className="text-dark-text-secondary">
                    <strong>Artist:</strong> {selectedClearance.originalArtist}
                  </p>
                  <p className="text-dark-text-secondary">
                    <strong>Rights Holder:</strong> {selectedClearance.rightsHolder}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-text mb-2">Request Status</h3>
                  <StatusBadge status={selectedClearance.responseStatus} />
                  <p className="text-dark-text-secondary mt-2">
                    <strong>Terms:</strong> {selectedClearance.termsOffered}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-text mb-2">Project</h3>
                  <p className="text-dark-text-secondary">{selectedClearance.projectName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyClearances