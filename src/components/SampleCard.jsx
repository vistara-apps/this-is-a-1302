import React from 'react'
import { Play, Clock, User, FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'
import clsx from 'clsx'

const SampleCard = ({ sample, variant = 'default' }) => {
  const isCompact = variant === 'compactWithImage'
  const withStatus = variant === 'withStatus'

  return (
    <div className={clsx(
      'bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200',
      'shadow-dark-card hover:shadow-dark-modal'
    )}>
      {isCompact ? (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-dark-text truncate">
              {sample.identifiedSongTitle || 'Unknown Track'}
            </h3>
            <p className="text-xs text-dark-text-secondary truncate">
              {sample.originalArtist || 'Unknown Artist'}
            </p>
          </div>
          {withStatus && (
            <StatusBadge status={sample.clearanceStatus} />
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-dark-text mb-1">
                {sample.identifiedSongTitle || 'Unknown Track'}
              </h3>
              <p className="text-sm text-dark-text-secondary">
                {sample.originalArtist || 'Unknown Artist'}
              </p>
            </div>
            {withStatus && (
              <StatusBadge status={sample.clearanceStatus} />
            )}
          </div>

          <div className="flex items-center space-x-4 text-xs text-dark-text-secondary">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(sample.createdAt).toLocaleDateString()}</span>
            </div>
            {sample.rightsHolderName && (
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{sample.rightsHolderName}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-dark-border">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm">
              <Play className="w-3 h-3" />
              <span>Play Sample</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-1.5 border border-dark-border text-dark-text rounded-md hover:bg-dark-bg transition-colors text-sm">
              <FileText className="w-3 h-3" />
              <span>Request Clearance</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SampleCard