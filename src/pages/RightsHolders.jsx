import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { 
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

export default function RightsHolders() {
  const { rightsHolders } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHolder, setSelectedHolder] = useState(null)

  const filteredHolders = rightsHolders.filter(holder =>
    holder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    holder.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-text">Rights Holders</h1>
        <p className="text-dark-text-secondary mt-1">
          Searchable database of music rights holder contact information
        </p>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Search rights holders by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
          </div>
        </div>
      </div>

      {/* Rights Holders Grid */}
      {filteredHolders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHolders.map((holder) => (
            <div
              key={holder.id}
              className="card hover:bg-dark-bg transition-colors cursor-pointer"
              onClick={() => setSelectedHolder(holder)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BuildingOffice2Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-dark-text mb-2">
                {holder.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center text-dark-text-secondary text-sm">
                  <EnvelopeIcon className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{holder.contactEmail}</span>
                </div>
                
                {holder.contactPhone && (
                  <div className="flex items-center text-dark-text-secondary text-sm">
                    <PhoneIcon className="h-4 w-4 mr-2 shrink-0" />
                    <span>{holder.contactPhone}</span>
                  </div>
                )}
                
                {holder.website && (
                  <div className="flex items-center text-dark-text-secondary text-sm">
                    <GlobeAltIcon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="truncate">{holder.website}</span>
                  </div>
                )}
              </div>
              
              <button className="w-full mt-4 btn-primary text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BuildingOffice2Icon className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-text mb-2">
            {searchQuery ? 'No rights holders found' : 'No rights holders available'}
          </h3>
          <p className="text-dark-text-secondary">
            {searchQuery 
              ? `No rights holders match "${searchQuery}"`
              : 'The rights holder database is being updated'
            }
          </p>
        </div>
      )}

      {/* Rights Holder Detail Modal */}
      {selectedHolder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-surface rounded-lg shadow-modal w-full max-w-2xl">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-dark-text">
                {selectedHolder.name}
              </h2>
              <p className="text-dark-text-secondary mt-1">
                Rights holder contact information
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-dark-text mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-dark-text-secondary mr-3" />
                      <div>
                        <p className="text-dark-text">{selectedHolder.contactEmail}</p>
                        <a
                          href={`mailto:${selectedHolder.contactEmail}`}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                    
                    {selectedHolder.contactPhone && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-dark-text-secondary mr-3" />
                        <div>
                          <p className="text-dark-text">{selectedHolder.contactPhone}</p>
                          <a
                            href={`tel:${selectedHolder.contactPhone}`}
                            className="text-primary hover:text-primary/80 text-sm"
                          >
                            Call Now
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {selectedHolder.website && (
                      <div className="flex items-center">
                        <GlobeAltIcon className="h-5 w-5 text-dark-text-secondary mr-3" />
                        <div>
                          <p className="text-dark-text">{selectedHolder.website}</p>
                          <a
                            href={selectedHolder.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 text-sm"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-dark-text mb-3">Address</h3>
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-dark-text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="text-dark-text">{selectedHolder.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-bg rounded-lg p-4">
                <h3 className="font-medium text-dark-text mb-2">Sample Clearance Tips</h3>
                <ul className="text-dark-text-secondary text-sm space-y-1">
                  <li>• Be specific about your intended use and distribution plans</li>
                  <li>• Include proposed terms and royalty percentages</li>
                  <li>• Provide context about your project and anticipated reach</li>
                  <li>• Allow 2-4 weeks for initial response</li>
                  <li>• Be prepared to negotiate terms</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-dark-border flex justify-end space-x-4">
              <button
                onClick={() => setSelectedHolder(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedHolder.contactEmail}?subject=Sample Clearance Request`}
                className="btn-primary flex items-center space-x-2"
              >
                <EnvelopeIcon className="h-4 w-4" />
                <span>Contact for Clearance</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}