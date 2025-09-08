import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchInput = ({ value, onChange, onFilterClick, placeholder = "Search samples..." }) => {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-surface border border-surface rounded-md text-text placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
        />
        <button
          onClick={onFilterClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-bg rounded-sm transition-colors duration-150"
        >
          <Filter className="w-4 h-4 text-muted-foreground hover:text-text" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;