import React from 'react';
import { X } from 'lucide-react';
import { genres, licenseTypes } from '../data/mockSamples';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  selectedGenre, 
  setSelectedGenre, 
  selectedLicense, 
  setSelectedLicense,
  priceRange,
  setPriceRange,
  onlyCleared,
  setOnlyCleared
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-surface rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-bg">
          <h3 className="text-lg font-semibold text-text">Filter Samples</h3>
          <button onClick={onClose} className="p-1 hover:bg-bg rounded-sm">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 bg-bg border border-surface rounded-md text-text"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">License Type</label>
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="w-full p-2 bg-bg border border-surface rounded-md text-text"
            >
              {licenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Max Price: ${priceRange}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="onlyCleared"
              checked={onlyCleared}
              onChange={(e) => setOnlyCleared(e.target.checked)}
              className="accent-primary"
            />
            <label htmlFor="onlyCleared" className="text-sm text-text">
              Only show cleared samples
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSelectedLicense('All');
                setPriceRange('50');
                setOnlyCleared(false);
              }}
              className="btn-secondary flex-1"
            >
              Reset
            </button>
            <button onClick={onClose} className="btn-primary flex-1">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;