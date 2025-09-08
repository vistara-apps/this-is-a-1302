import React, { useState } from 'react'
import { Search, Mail, Phone, Globe, Building } from 'lucide-react'
import DataTable from '../components/DataTable'

const RightsHolders = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock rights holders data
  const rightsHolders = [
    {
      rightsHolderId: '1',
      name: 'Universal Music Group',
      contactEmail: 'licensing@umg.com',
      contactPhone: '+1 (212) 373-0600',
      website: 'https://www.universalmusic.com',
      address: '2220 Colorado Avenue, Santa Monica, CA',
      artists: ['James Brown', 'Eminem', 'Drake'],
      responseTime: '5-7 days'
    },
    {
      rightsHolderId: '2',
      name: 'Sony Music Entertainment',
      contactEmail: 'samples@sonymusic.com',
      contactPhone: '+1 (212) 833-8000',
      website: 'https://www.sonymusic.com',
      address: '25 Madison Avenue, New York, NY',
      artists: ['Michael Jackson', 'Alicia Keys', 'Travis Scott'],
      responseTime: '3-5 days'
    },
    {
      rightsHolderId: '3',
      name: 'Sugar Hill Records',
      contactEmail: 'licensing@sugarhillrecords.com',
      contactPhone: '+1 (201) 456-7890',
      website: 'https://www.sugarhillrecords.com',
      address: '96 West Street, Englewood, NJ',
      artists: ['The Sugarhill Gang', 'Grandmaster Flash'],
      responseTime: '7-10 days'
    },
    {
      rightsHolderId: '4',
      name: 'Warner Music Group',
      contactEmail: 'clearances@wmg.com',
      contactPhone: '+1 (212) 275-2000',
      website: 'https://www.wmg.com',
      address: '1633 Broadway, New York, NY',
      artists: ['Led Zeppelin', 'Prince', 'Bruno Mars'],
      responseTime: '5-7 days'
    }
  ]

  const filteredRightsHolders = rightsHolders.filter(rh =>
    rh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rh.artists.some(artist => artist.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const rightsHolderColumns = [
    {
      key: 'name',
      header: 'Rights Holder',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-dark-text">{value}</div>
            <div className="text-sm text-dark-text-secondary">
              Avg. response: {row.responseTime}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'artists',
      header: 'Key Artists',
      render: (value) => (
        <div className="text-sm text-dark-text-secondary">
          {value.slice(0, 2).join(', ')}
          {value.length > 2 && ` +${value.length - 2} more`}
        </div>
      )
    },
    {
      key: 'contactEmail',
      header: 'Contact',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-3 h-3 text-dark-text-secondary" />
            <a href={`mailto:${value}`} className="text-primary hover:text-primary/80">
              {value}
            </a>
          </div>
          {row.contactPhone && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-3 h-3 text-dark-text-secondary" />
              <span className="text-dark-text-secondary">{row.contactPhone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'website',
      header: 'Website',
      render: (value) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-primary hover:text-primary/80"
        >
          <Globe className="w-3 h-3" />
          <span className="text-sm">Visit</span>
        </a>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-text">Rights Holders</h1>
        <p className="text-dark-text-secondary">
          Search and connect with music rights holders for sample clearance.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary w-4 h-4" />
        <input
          type="text"
          placeholder="Search by company or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-dark-surface border border-dark-border rounded-md text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Rights Holders Table */}
      <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
        <DataTable 
          data={filteredRightsHolders} 
          columns={rightsHolderColumns} 
          variant="striped" 
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-surface border border-dark-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-dark-text">{rightsHolders.length}</div>
          <div className="text-sm text-dark-text-secondary">Total Rights Holders</div>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">87%</div>
          <div className="text-sm text-dark-text-secondary">Response Rate</div>
        </div>
        <div className="bg-dark-surface border border-dark-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">6 days</div>
          <div className="text-sm text-dark-text-secondary">Avg. Response Time</div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-dark-text mb-4">Clearance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-dark-text-secondary">
          <div>
            <h4 className="font-medium text-dark-text mb-2">Before Contacting</h4>
            <ul className="space-y-1">
              <li>• Prepare detailed usage information</li>
              <li>• Know your budget and royalty expectations</li>
              <li>• Have sample timestamps and duration ready</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-dark-text mb-2">Best Practices</h4>
            <ul className="space-y-1">
              <li>• Be professional and concise in your requests</li>
              <li>• Follow up respectfully if no response</li>
              <li>• Consider hiring a clearance specialist for major labels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightsHolders