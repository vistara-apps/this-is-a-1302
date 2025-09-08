import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { 
  DocumentCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  PaperAirplaneIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

export default function MyClearances() {
  const { samples, clearanceRequests, addClearanceRequest, updateClearanceRequest } = useData()
  const [filter, setFilter] = useState('all')
  const [selectedSample, setSelectedSample] = useState(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({
    intendedUse: '',
    distributionType: '',
    estimatedCopies: '',
    proposedTerms: '',
    additionalNotes: ''
  })

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'negotiating':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const filteredSamples = samples.filter(sample => {
    if (filter === 'all') return true
    return sample.clearanceStatus === filter
  })

  const handleRequestClearance = (sample) => {
    setSelectedSample(sample)
    setShowRequestForm(true)
  }

  const handleSubmitRequest = () => {
    if (!selectedSample) return

    const newRequest = {
      sampleId: selectedSample.id,
      requestDate: new Date().toISOString(),
      submissionStatus: 'submitted',
      responseStatus: 'pending',
      termsOffered: requestForm.proposedTerms,
      intendedUse: requestForm.intendedUse,
      distributionType: requestForm.distributionType,
      estimatedCopies: requestForm.estimatedCopies,
      additionalNotes: requestForm.additionalNotes,
      createdAt: new Date().toISOString()
    }

    addClearanceRequest(newRequest)
    
    // Update sample status
    const updatedSample = { ...selectedSample, clearanceStatus: 'pending' }
    // In a real app, you'd call updateSample here

    setShowRequestForm(false)
    setSelectedSample(null)
    setRequestForm({
      intendedUse: '',
      distributionType: '',
      estimatedCopies: '',
      proposedTerms: '',
      additionalNotes: ''
    })

    alert('Clearance request submitted successfully!')
  }

  const sampleWithRequests = filteredSamples.map(sample => {
    const requests = clearanceRequests.filter(req => req.sampleId === sample.id)
    return { ...sample, requests }
  })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-text">My Clearances</h1>
          <p className="text-dark-text-secondary mt-1">
            Track and manage your sample clearance requests
          </p>
        </div>
        
        {/* Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4 text-dark-text-secondary" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="negotiating">Negotiating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clearance List */}
      {sampleWithRequests.length > 0 ? (
        <div className="space-y-6">
          {sampleWithRequests.map((sample) => (
            <div key={sample.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-dark-text">{sample.title}</h3>
                  <p className="text-dark-text-secondary">
                    {sample.originalArtist} - {sample.originalSong}
                  </p>
                  <p className="text-dark-text-secondary text-sm mt-1">
                    Rights Holder: {sample.rightsHolder}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(sample.clearanceStatus)}`}>
                    {getStatusIcon(sample.clearanceStatus)}
                    <span className="text-sm font-medium">
                      {getStatusText(sample.clearanceStatus)}
                    </span>
                  </div>
                  
                  {sample.clearanceStatus === 'pending' ? (
                    <button className="btn-secondary text-sm">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRequestClearance(sample)}
                      className="btn-primary text-sm flex items-center space-x-2"
                    >
                      <PaperAirplaneIcon className="h-4 w-4" />
                      <span>Request Clearance</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Request History */}
              {sample.requests.length > 0 && (
                <div className="mt-4 border-t border-dark-border pt-4">
                  <h4 className="font-medium text-dark-text mb-3">Request History</h4>
                  <div className="space-y-3">
                    {sample.requests.map((request) => (
                      <div key={request.id} className="bg-dark-bg rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.responseStatus)}
                            <span className="font-medium text-dark-text">
                              {getStatusText(request.responseStatus)}
                            </span>
                          </div>
                          <span className="text-dark-text-secondary text-sm">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {request.termsOffered && (
                          <p className="text-dark-text-secondary text-sm">
                            <strong>Terms:</strong> {request.termsOffered}
                          </p>
                        )}
                        
                        {request.responseStatus === 'approved' && (
                          <div className="mt-3 p-3 bg-green-500/10 rounded-lg">
                            <p className="text-green-500 text-sm font-medium">
                              ✓ Clearance approved! You can now use this sample in your project.
                            </p>
                          </div>
                        )}
                        
                        {request.responseStatus === 'rejected' && (
                          <div className="mt-3 p-3 bg-red-500/10 rounded-lg">
                            <p className="text-red-500 text-sm font-medium">
                              ✗ Request was rejected. Consider adjusting your terms and resubmitting.
                            </p>
                          </div>
                        )}
                        
                        {request.responseStatus === 'negotiating' && (
                          <div className="mt-3 p-3 bg-orange-500/10 rounded-lg">
                            <p className="text-orange-500 text-sm font-medium">
                              ⚡ Rights holder is open to negotiation. Check your email for details.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <DocumentCheckIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-text mb-2">No clearances found</h3>
          <p className="text-dark-text-secondary">
            {filter === 'all' 
              ? "You haven't created any clearance requests yet"
              : `No clearances with status "${filter}"`
            }
          </p>
        </div>
      )}

      {/* Clearance Request Form Modal */}
      {showRequestForm && selectedSample && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-surface rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-dark-text">
                Request Clearance for "{selectedSample.title}"
              </h2>
              <p className="text-dark-text-secondary mt-1">
                Fill out this form to request sample clearance from {selectedSample.rightsHolder}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Intended Use *
                </label>
                <select
                  value={requestForm.intendedUse}
                  onChange={(e) => setRequestForm({...requestForm, intendedUse: e.target.value})}
                  className="input w-full"
                  required
                >
                  <option value="">Select intended use</option>
                  <option value="commercial-single">Commercial Single Release</option>
                  <option value="commercial-album">Commercial Album Release</option>
                  <option value="promotional">Promotional Use</option>
                  <option value="remix-competition">Remix Competition</option>
                  <option value="live-performance">Live Performance</option>
                  <option value="educational">Educational Purpose</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Distribution Type *
                </label>
                <select
                  value={requestForm.distributionType}
                  onChange={(e) => setRequestForm({...requestForm, distributionType: e.target.value})}
                  className="input w-full"
                  required
                >
                  <option value="">Select distribution type</option>
                  <option value="digital-only">Digital Only (Streaming/Download)</option>
                  <option value="physical-digital">Physical + Digital</option>
                  <option value="sync-licensing">Sync Licensing</option>
                  <option value="broadcast">Broadcast/Radio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Estimated Copies/Streams
                </label>
                <input
                  type="text"
                  value={requestForm.estimatedCopies}
                  onChange={(e) => setRequestForm({...requestForm, estimatedCopies: e.target.value})}
                  placeholder="e.g., 10,000 copies or 1M streams"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Proposed Terms *
                </label>
                <textarea
                  value={requestForm.proposedTerms}
                  onChange={(e) => setRequestForm({...requestForm, proposedTerms: e.target.value})}
                  placeholder="e.g., $500 upfront fee + 5% royalties"
                  className="input w-full h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={requestForm.additionalNotes}
                  onChange={(e) => setRequestForm({...requestForm, additionalNotes: e.target.value})}
                  placeholder="Any additional information about your project..."
                  className="input w-full h-24 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-dark-border flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowRequestForm(false)
                  setSelectedSample(null)
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                className="btn-primary flex items-center space-x-2"
                disabled={!requestForm.intendedUse || !requestForm.distributionType || !requestForm.proposedTerms}
              >
                <PaperAirplaneIcon className="h-4 w-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}