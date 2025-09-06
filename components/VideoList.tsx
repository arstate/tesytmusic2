
import React from 'react';
import type { YouTubeVideo } from '../types';
import { VideoListItem } from './VideoListItem';

interface VideoListProps {
  videos: YouTubeVideo[];
  onVideoSelect: (videoId: string) => void;
  currentVideoId: string | null;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, currentVideoId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {videos.map((video) => (
        <VideoListItem 
            key={video.videoId} 
            video={video} 
            onVideoSelect={onVideoSelect}
            isPlaying={currentVideoId === video.videoId}
        />
      ))}
    </div>
  );
};
