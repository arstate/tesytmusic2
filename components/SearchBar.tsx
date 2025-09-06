
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs, artists..."
        className="w-full bg-brand-surface border border-transparent rounded-full py-3 pl-12 pr-4 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-300"
        disabled={isLoading}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <SearchIcon className="w-5 h-5 text-brand-secondary" />
      </div>
       <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary text-white font-bold rounded-full px-4 py-1.5 text-sm hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={isLoading}
       >
        {isLoading ? '...' : 'Search'}
      </button>
    </form>
  );
};
