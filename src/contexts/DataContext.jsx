import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [samples, setSamples] = useState([])
  const [rightsHolders, setRightsHolders] = useState([])
  const [clearanceRequests, setClearanceRequests] = useState([])

  useEffect(() => {
    // Initialize with mock data
    const mockProjects = [
      {
        id: '1',
        name: 'Summer Remix Collection',
        createdAt: '2024-01-15T10:00:00Z',
        samplesCount: 3
      },
      {
        id: '2',
        name: 'Hip-Hop Beats Vol. 2',
        createdAt: '2024-01-10T14:30:00Z',
        samplesCount: 5
      }
    ]

    const mockSamples = [
      {
        id: '1',
        projectId: '1',
        title: 'Drum Break - Amen Break',
        originalArtist: 'The Winstons',
        originalSong: 'Amen, Brother',
        rightsHolder: 'Universal Music Group',
        clearanceStatus: 'approved',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        projectId: '1',
        title: 'Bass Line Sample',
        originalArtist: 'James Brown',
        originalSong: 'Funky Drummer',
        rightsHolder: 'Sony Music Entertainment',
        clearanceStatus: 'pending',
        createdAt: '2024-01-15T11:00:00Z'
      },
      {
        id: '3',
        projectId: '2',
        title: 'Vocal Sample',
        originalArtist: 'Diana Ross',
        originalSong: 'Love Hangover',
        rightsHolder: 'Motown Records',
        clearanceStatus: 'negotiating',
        createdAt: '2024-01-10T15:00:00Z'
      }
    ]

    const mockRightsHolders = [
      {
        id: '1',
        name: 'Universal Music Group',
        contactEmail: 'clearances@umg.com',
        contactPhone: '+1-555-0123',
        address: '2220 Colorado Avenue, Santa Monica, CA 90404',
        website: 'https://www.universalmusic.com'
      },
      {
        id: '2',
        name: 'Sony Music Entertainment',
        contactEmail: 'licensing@sonymusic.com',
        contactPhone: '+1-555-0124',
        address: '25 Madison Avenue, New York, NY 10010',
        website: 'https://www.sonymusic.com'
      },
      {
        id: '3',
        name: 'Motown Records',
        contactEmail: 'clearances@motown.com',
        contactPhone: '+1-555-0125',
        address: '1755 Broadway, New York, NY 10019',
        website: 'https://www.motown.com'
      }
    ]

    const mockClearanceRequests = [
      {
        id: '1',
        sampleId: '1',
        requestDate: '2024-01-15T12:00:00Z',
        submissionStatus: 'submitted',
        responseStatus: 'approved',
        termsOffered: '$500 upfront + 5% royalties',
        createdAt: '2024-01-15T12:00:00Z'
      },
      {
        id: '2',
        sampleId: '2',
        requestDate: '2024-01-15T13:00:00Z',
        submissionStatus: 'submitted',
        responseStatus: 'pending',
        termsOffered: '$300 upfront + 3% royalties',
        createdAt: '2024-01-15T13:00:00Z'
      }
    ]

    setProjects(mockProjects)
    setSamples(mockSamples)
    setRightsHolders(mockRightsHolders)
    setClearanceRequests(mockClearanceRequests)
  }, [])

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now().toString() }])
  }

  const addSample = (sample) => {
    setSamples(prev => [...prev, { ...sample, id: Date.now().toString() }])
  }

  const updateSample = (id, updates) => {
    setSamples(prev => prev.map(sample => 
      sample.id === id ? { ...sample, ...updates } : sample
    ))
  }

  const addClearanceRequest = (request) => {
    setClearanceRequests(prev => [...prev, { ...request, id: Date.now().toString() }])
  }

  const updateClearanceRequest = (id, updates) => {
    setClearanceRequests(prev => prev.map(request =>
      request.id === id ? { ...request, ...updates } : request
    ))
  }

  const value = {
    projects,
    samples,
    rightsHolders,
    clearanceRequests,
    addProject,
    addSample,
    updateSample,
    addClearanceRequest,
    updateClearanceRequest
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}