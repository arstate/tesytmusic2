
import React from 'react';
import { MusicNoteIcon } from './icons';

export const Welcome: React.FC = () => {
  return (
    <div className="text-center mt-16 flex flex-col items-center">
        <MusicNoteIcon className="w-24 h-24 text-brand-primary mb-6"/>
      <h2 className="text-4xl font-bold text-brand-light mb-2">Start Your Listening Journey</h2>
      <p className="text-brand-secondary text-lg max-w-xl mx-auto">
        Search for your favorite songs, artists, or albums and Gemini will find them for you on YouTube. Let the music play.
      </p>
    </div>
  );
};
