import React, { useState } from 'react';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { YouTubeIcon } from './icons';

interface PlayerProps {
  videoId: string;
}

const PLAYER_ELEMENT_ID = 'youtube-player-container';

export const Player: React.FC<PlayerProps> = ({ videoId }) => {
  const [showError, setShowError] = useState(false);

  // Fungsi callback yang akan dipanggil oleh hook jika terjadi galat pemutaran
  const handlePlayerError = React.useCallback(() => {
    setShowError(true);
  }, []);
  
  // Atur ulang status galat setiap kali ID video berubah
  React.useEffect(() => {
    setShowError(false);
  }, [videoId]);

  // Gunakan hook kustom untuk mengelola instance pemutar YouTube
  useYouTubePlayer(PLAYER_ELEMENT_ID, videoId, handlePlayerError);
  
  const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="bg-black/80 backdrop-blur-lg p-2 shadow-2xl shadow-black">
      <div className="w-full h-[80px] relative">
        {/* Div target ini adalah tempat YouTube Player API akan merender iframe */}
        <div id={PLAYER_ELEMENT_ID} className="w-full h-full" />
        
        {/* Tampilkan pesan galat dan tautan fallback jika diperlukan */}
        {showError && (
          <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center text-center p-2">
            <p className="text-sm text-brand-light mb-2">Video tidak tersedia untuk diputar di sini.</p>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 text-white font-bold py-1 px-3 rounded-md text-xs hover:bg-red-700 transition-colors"
            >
              <YouTubeIcon className="w-5 h-5" />
              Tonton di YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
