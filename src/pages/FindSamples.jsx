import React, { useState } from 'react'
import ActionForm from '../components/ActionForm'
import SampleCard from '../components/SampleCard'
import { useSubscription } from '../contexts/SubscriptionContext'

const FindSamples = () => {
  const { canUseClearance } = useSubscription()
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSampleSearch = async (formData) => {
    setIsSearching(true)
    
    // Mock AI sample identification
    setTimeout(() => {
      const mockResults = [
        {
          sampleId: 'sample-1',
          identifiedSongTitle: 'Apache (Jump On It)',
          originalArtist: 'The Sugarhill Gang',
          rightsHolderName: 'Sugar Hill Records',
          rightsHolderContact: 'licensing@sugarhillrecords.com',
          clearanceStatus: 'not_requested',
          confidence: 0.95,
          createdAt: new Date().toISOString()
        },
        {
          sampleId: 'sample-2',
          identifiedSongTitle: 'Funky Drummer',
          originalArtist: 'James Brown',
          rightsHolderName: 'Universal Music Group',
          rightsHolderContact: 'samples@umg.com',
          clearanceStatus: 'not_requested',
          confidence: 0.87,
          createdAt: new Date().toISOString()
        },
        {
          sampleId: 'sample-3',
          identifiedSongTitle: 'Amen Break',
          originalArtist: 'The Winstons',
          rightsHolderName: 'Independent',
          rightsHolderContact: 'contact@winstons.com',
          clearanceStatus: 'not_requested',
          confidence: 0.92,
          createdAt: new Date().toISOString()
        }
      ]
      
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Find Samples</h1>
        <p className="text-dark-text-secondary">
          Upload audio or enter song details to identify samples and their rights holders.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl">
        <ActionForm variant="sampleSearch" onSubmit={handleSampleSearch} />
      </div>

      {/* Search Status */}
      {isSearching && (
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-dark-text">Analyzing audio and searching for matches...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-dark-text mb-4">
            Search Results ({searchResults.length} matches found)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((sample) => (
              <div key={sample.sampleId} className="space-y-4">
                <SampleCard sample={sample} variant="withStatus" />
                <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-dark-text">Match Confidence</span>
                    <span className="text-sm text-primary">{Math.round(sample.confidence * 100)}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${sample.confidence * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-dark-text-secondary">
                    <p><strong>Rights Holder:</strong> {sample.rightsHolderName}</p>
                    <p><strong>Contact:</strong> {sample.rightsHolderContact}</p>
                  </div>
                  <button
                    className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
                      canUseClearance()
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canUseClearance()}
                  >
                    {canUseClearance() ? 'Request Clearance' : 'Upgrade to Request Clearance'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-dark-text mb-4">How Sample Identification Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-dark-text-secondary">
          <div>
            <h4 className="font-medium text-dark-text mb-2">1. Upload or Search</h4>
            <p>Upload an audio file or enter song details you want to analyze for samples.</p>
          </div>
          <div>
            <h4 className="font-medium text-dark-text mb-2">2. AI Analysis</h4>
            <p>Our AI analyzes the audio against our database of known tracks and samples.</p>
          </div>
          <div>
            <h4 className="font-medium text-dark-text mb-2">3. Get Results</h4>
            <p>Receive identified samples with rights holder information and confidence scores.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindSamples