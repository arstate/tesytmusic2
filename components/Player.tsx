import React from 'react';

interface PlayerProps {
  videoId: string;
}

export const Player: React.FC<PlayerProps> = ({ videoId }) => {
  if (!videoId) {
    return null;
  }

  // Construct the YouTube embed URL with autoplay and other parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&modestbranding=1`;

  return (
    <div className="bg-black/80 backdrop-blur-lg p-2 shadow-2xl shadow-black">
      {/* The container for the iframe, maintaining the original mini-player height */}
      <div className="w-full h-[80px]">
        <iframe
          key={videoId} // This key is crucial! It tells React to create a new iframe when the videoId changes, ensuring the new video loads.
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
