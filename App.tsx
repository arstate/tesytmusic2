
import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { VideoList } from './components/VideoList';
import { Player } from './components/Player';
import { Loader } from './components/Loader';
import { Welcome } from './components/Welcome';
import { searchYoutubeVideos } from './services/geminiService';
import type { YouTubeVideo } from './types';
import { GeminiLogo } from './components/icons';


export default function App() {
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchResults([]);

    try {
      const videos = await searchYoutubeVideos(query);
      setSearchResults(videos);
      if (videos.length === 0) {
          setError("No results found. Try a different search.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch music. The model may be busy. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVideoSelect = useCallback((videoId: string) => {
    setSelectedVideoId(videoId);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      <header className="bg-black/50 backdrop-blur-md p-4 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <GeminiLogo className="w-8 h-8"/>
            <h1 className="text-2xl font-bold text-brand-light tracking-tight">GeminiTube Music</h1>
        </div>
        <div className="w-full max-w-lg">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {isLoading && <Loader />}
          {error && <p className="text-center text-red-400 mt-8">{error}</p>}
          
          {!hasSearched && !isLoading && <Welcome />}

          {!isLoading && searchResults.length > 0 && (
            <VideoList 
              videos={searchResults} 
              onVideoSelect={handleVideoSelect}
              currentVideoId={selectedVideoId}
            />
          )}
        </div>
      </main>

      {selectedVideoId && (
        <footer className="sticky bottom-0 z-20">
          <Player videoId={selectedVideoId} />
        </footer>
      )}
    </div>
  );
}
