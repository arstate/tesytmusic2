
import React from 'react';
import type { YouTubeVideo } from '../types';
import { PlayIcon, MusicNoteIcon } from './icons';


interface VideoListItemProps {
  video: YouTubeVideo;
  onVideoSelect: (videoId: string) => void;
  isPlaying: boolean;
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video, onVideoSelect, isPlaying }) => {
  return (
    <div 
      onClick={() => onVideoSelect(video.videoId)}
      className="bg-brand-surface rounded-lg p-4 cursor-pointer group hover:bg-gray-800/60 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
    >
      <div className="relative mb-4">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-auto object-cover rounded-md aspect-square shadow-lg"
        />
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {isPlaying ? (
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg">
                <MusicNoteIcon className="w-6 h-6 text-white animate-pulse"/>
              </div>
          ) : (
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayIcon className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-brand-light font-semibold truncate" title={video.title}>{video.title}</h3>
        <p className="text-sm text-brand-secondary truncate" title={video.channelTitle}>{video.channelTitle}</p>
      </div>
    </div>
  );
};
