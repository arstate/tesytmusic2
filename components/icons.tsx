import React from 'react';

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
  </svg>
);

export const MusicNoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v10.5a2.25 2.25 0 1 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" />
        <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3H4.5ZM19.5 6a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 18V7.5a1.5 1.5 0 0 1 1.5-1.5h15Z" />
        <path d="M16.5 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
);

export const GeminiLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.2335 16.3333C11.2335 15.1111 11.7145 13.9777 12.5645 13.1333C13.4145 12.2888 14.5555 11.8333 15.7555 11.8333C16.9555 11.8333 18.0965 12.2888 18.9465 13.1333C19.7965 13.9777 20.2775 15.1111 20.2775 16.3333C20.2775 17.5555 19.7965 18.6888 18.9465 19.5333C18.0965 20.3777 16.9555 20.8333 15.7555 20.8333C15.1402 20.8333 14.5422 20.7107 13.9995 20.4777L11.2335 23.3333L13.9995 26.1888C14.5242 26.0662 15.1402 26 15.7555 26C21.3995 26 26.0115 21.4111 26.0115 15.7777C26.0115 10.1444 21.3995 5.55551 15.7555 5.55551C10.1115 5.55551 5.49951 10.1444 5.49951 15.7777C5.49951 16.3888 5.56451 16.9777 5.67251 17.5555L8.51051 14.7111L11.2335 16.3333Z" fill="#1DB954"></path>
    <path d="M12.1333 10.6667L9.33333 8L2 15.3333L4.8 18.1333L12.1333 10.6667Z" fill="#b3b3b3"></path>
    <path d="M8 2L15.3333 9.33333L12.5333 12.1333L5.2 4.8L8 2Z" fill="#ffffff"></path>
  </svg>
);

export const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.89-1.75 1.75C2 8.76 2 12 2 12s0 3.24.43 4.81c.23.86.9 1.52 1.75 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.89 1.75-1.75C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.5 15.5V8.5l6 3.5-6 3.5z" />
    </svg>
);
