import React, { useState } from 'react'
import { Upload, Search, Send } from 'lucide-react'
import clsx from 'clsx'

const ActionForm = ({ variant = 'sampleSearch', onSubmit }) => {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (variant === 'sampleSearch') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-surface p-6 rounded-lg border border-dark-border">
        <h3 className="text-lg font-semibold text-dark-text">Identify Sample</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Upload Audio File
            </label>
            <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-dark-text-secondary mx-auto mb-2" />
              <p className="text-sm text-dark-text-secondary">
                Drop your audio file here or click to browse
              </p>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => handleChange('audioFile', e.target.files[0])}
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-surface text-dark-text-secondary">Or</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Song Title & Artist
            </label>
            <input
              type="text"
              placeholder="Enter song title and artist..."
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) => handleChange('songQuery', e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Identify Sample</span>
        </button>
      </form>
    )
  }

  if (variant === 'clearanceRequest') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-dark-surface p-6 rounded-lg border border-dark-border">
        <h3 className="text-lg font-semibold text-dark-text">Clearance Request</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) => handleChange('requestorName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Project Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={(e) => handleChange('projectTitle', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Usage Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe how you plan to use this sample..."
              onChange={(e) => handleChange('usageDescription', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Proposed License Fee
              </label>
              <input
                type="text"
                placeholder="$0 - $1000"
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => handleChange('licenseFee', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Royalty Percentage
              </label>
              <input
                type="text"
                placeholder="0% - 50%"
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => handleChange('royaltyPercentage', e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Send Clearance Request</span>
        </button>
      </form>
    )
  }

  return null
}

export default ActionForm