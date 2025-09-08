import React, { useState, useMemo } from 'react';
import AppShell from './components/AppShell';
import SearchInput from './components/SearchInput';
import SampleCard from './components/SampleCard';
import FilterPanel from './components/FilterPanel';
import SampleDetail from './components/SampleDetail';
import { mockSamples } from './data/mockSamples';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLicense, setSelectedLicense] = useState('All');
  const [priceRange, setPriceRange] = useState('50');
  const [onlyCleared, setOnlyCleared] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);

  const filteredSamples = useMemo(() => {
    return mockSamples.filter(sample => {
      const matchesSearch = sample.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sample.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sample.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === 'All' || sample.genre === selectedGenre;
      const matchesLicense = selectedLicense === 'All' || sample.licenseType === selectedLicense;
      const matchesPrice = sample.price <= parseInt(priceRange);
      const matchesCleared = !onlyCleared || sample.cleared;

      return matchesSearch && matchesGenre && matchesLicense && matchesPrice && matchesCleared;
    });
  }, [searchQuery, selectedGenre, selectedLicense, priceRange, onlyCleared]);

  if (selectedSample) {
    return (
      <AppShell>
        <SampleDetail 
          sample={selectedSample} 
          onBack={() => setSelectedSample(null)} 
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="text-center py-8">
          <h1 className="text-3xl font-bold text-text mb-2">SampleSecure</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Legally clear music samples for your remixes, instantly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="card text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="font-medium text-text mb-1">Search & Discover</h3>
              <p className="text-muted-foreground">Find samples by genre, mood, or instrument</p>
            </div>
            <div className="card text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent font-bold">2</span>
              </div>
              <h3 className="font-medium text-text mb-1">Verify Clearance</h3>
              <p className="text-muted-foreground">Check legal status and usage rights</p>
            </div>
            <div className="card text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent font-bold">3</span>
              </div>
              <h3 className="font-medium text-text mb-1">Create Safely</h3>
              <p className="text-muted-foreground">Use samples with confidence</p>
            </div>
          </div>
        </section>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterClick={() => setShowFilters(true)}
          placeholder="Search samples by title, artist, or tags..."
        />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">
            Sample Library
            <span className="text-sm text-muted-foreground ml-2">
              ({filteredSamples.length} samples)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredSamples.map((sample) => (
            <SampleCard
              key={sample.sampleId}
              sample={sample}
              onSampleSelect={setSelectedSample}
            />
          ))}
        </div>

        {filteredSamples.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-muted-foreground">🎵</span>
            </div>
            <h3 className="text-lg font-medium text-text mb-2">No samples found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLicense={selectedLicense}
        setSelectedLicense={setSelectedLicense}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onlyCleared={onlyCleared}
        setOnlyCleared={setOnlyCleared}
      />
    </AppShell>
  );
}

export default App;