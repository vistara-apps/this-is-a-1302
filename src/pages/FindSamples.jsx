import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { 
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  MusicalNoteIcon,
  DocumentPlusIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline'

export default function FindSamples() {
  const { addSample, rightsHolders } = useData()
  const [searchType, setSearchType] = useState('title') // 'title' or 'upload'
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedSample, setSelectedSample] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  // Mock AI sample identification results
  const mockSearchResults = [
    {
      id: 'mock-1',
      title: 'Amen Break',
      originalArtist: 'The Winstons',
      originalSong: 'Amen, Brother',
      year: '1969',
      confidence: 95,
      rightsHolder: rightsHolders.find(rh => rh.name === 'Universal Music Group'),
      bpm: 136,
      key: 'G Major',
      duration: '7 seconds',
      genres: ['Funk', 'Soul']
    },
    {
      id: 'mock-2',
      title: 'Think Break',
      originalArtist: 'Lyn Collins',
      originalSong: 'Think (About It)',
      year: '1972',
      confidence: 88,
      rightsHolder: rightsHolders.find(rh => rh.name === 'Sony Music Entertainment'),
      bpm: 120,
      key: 'F# Minor',
      duration: '5 seconds',
      genres: ['Funk', 'Soul']
    },
    {
      id: 'mock-3',
      title: 'Apache Break',
      originalArtist: 'Incredible Bongo Band',
      originalSong: 'Apache',
      year: '1973',
      confidence: 92,
      rightsHolder: rightsHolders.find(rh => rh.name === 'Universal Music Group'),
      bpm: 126,
      key: 'A Minor',
      duration: '6 seconds',
      genres: ['Funk', 'Break Beat']
    }
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim() && !uploadedFile) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate AI processing delay
    setTimeout(() => {
      // Filter mock results based on search query
      let results = mockSearchResults
      if (searchQuery.trim()) {
        results = mockSearchResults.filter(sample =>
          sample.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sample.originalArtist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sample.originalSong.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      setSearchResults(results)
      setIsSearching(false)
    }, 2000)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file)
      setSearchQuery('')
    }
  }

  const handleSampleSelect = (sample) => {
    setSelectedSample(sample)
  }

  const handleAddToProject = () => {
    if (!selectedSample) return

    const newSample = {
      projectId: '1', // Default to first project for demo
      title: selectedSample.title,
      originalArtist: selectedSample.originalArtist,
      originalSong: selectedSample.originalSong,
      rightsHolder: selectedSample.rightsHolder?.name || 'Unknown',
      clearanceStatus: 'pending',
      createdAt: new Date().toISOString()
    }

    addSample(newSample)
    setSelectedSample(null)
    setSearchResults([])
    setSearchQuery('')
    setUploadedFile(null)

    // Show success message (in a real app, use a toast notification)
    alert('Sample added to your project successfully!')
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-text">Find Samples</h1>
        <p className="text-dark-text-secondary mt-1">
          Identify samples using AI-powered audio matching or search by title
        </p>
      </div>

      {/* Search Interface */}
      <div className="card">
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-1 bg-dark-bg rounded-lg p-1">
            <button
              onClick={() => setSearchType('title')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchType === 'title'
                  ? 'bg-primary text-white'
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Search by Title
            </button>
            <button
              onClick={() => setSearchType('upload')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchType === 'upload'
                  ? 'bg-primary text-white'
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Upload Audio
            </button>
          </div>
        </div>

        {searchType === 'title' ? (
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter song title, artist, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="btn-primary flex items-center space-x-2"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center">
              <CloudArrowUpIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text mb-2">
                {uploadedFile ? uploadedFile.name : 'Drag and drop an audio file, or click to browse'}
              </p>
              <p className="text-dark-text-secondary text-sm mb-4">
                Supports MP3, WAV, FLAC (max 10MB)
              </p>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="btn-secondary cursor-pointer inline-block"
              >
                {uploadedFile ? 'Change File' : 'Choose File'}
              </label>
            </div>
            
            {uploadedFile && (
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <MusicalNoteIcon className="h-4 w-4" />
                <span>{isSearching ? 'Analyzing Audio...' : 'Identify Sample'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-dark-text mb-2">
            {searchType === 'upload' ? 'Analyzing your audio...' : 'Searching database...'}
          </h3>
          <p className="text-dark-text-secondary">
            This may take a few moments while our AI processes the audio
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-dark-text">Search Results</h2>
          
          <div className="grid gap-6">
            {searchResults.map((sample) => (
              <div
                key={sample.id}
                className={`card cursor-pointer transition-all duration-fast ${
                  selectedSample?.id === sample.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : 'hover:bg-dark-bg'
                }`}
                onClick={() => handleSampleSelect(sample)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <MusicalNoteIcon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-dark-text">
                          {sample.title}
                        </h3>
                        <p className="text-dark-text-secondary">
                          {sample.originalArtist} - {sample.originalSong} ({sample.year})
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm px-2 py-1 bg-green-500/10 text-green-500 rounded">
                            {sample.confidence}% match
                          </span>
                          <span className="text-dark-text-secondary text-sm">
                            {sample.bpm} BPM • {sample.key} • {sample.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-dark-text mb-2">Rights Holder</h4>
                        <div className="bg-dark-bg rounded-lg p-3">
                          <p className="font-medium text-dark-text">{sample.rightsHolder?.name}</p>
                          <p className="text-dark-text-secondary text-sm">{sample.rightsHolder?.contactEmail}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-dark-text mb-2">Genres</h4>
                        <div className="flex flex-wrap gap-2">
                          {sample.genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-2 py-1 bg-accent/10 text-accent text-sm rounded"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedSample?.id === sample.id && (
                    <div className="ml-4">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedSample && (
            <div className="card bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-dark-text">
                    Add "{selectedSample.title}" to your project?
                  </h3>
                  <p className="text-dark-text-secondary">
                    This will create a new sample entry and prepare it for clearance requests.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedSample(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToProject}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <DocumentPlusIcon className="h-4 w-4" />
                    <span>Add to Project</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!isSearching && searchResults.length === 0 && (searchQuery || uploadedFile) && (
        <div className="card text-center py-12">
          <MagnifyingGlassIcon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-text mb-2">No samples found</h3>
          <p className="text-dark-text-secondary">
            Try a different search term or upload a different audio file
          </p>
        </div>
      )}
    </div>
  )
}