import { useEffect, useRef } from 'react';

// Menambahkan tipe global untuk YouTube Player API agar TypeScript tidak error
declare global {
  // Fix: Define the YT namespace and Player interface to solve "Cannot find namespace 'YT'".
  namespace YT {
    interface Player {
      destroy: () => void;
    }
  }
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (elementId: string, options: any) => YT.Player;
    };
    isYouTubeApiReady?: boolean;
  }
}

// Fungsi untuk memuat skrip API YouTube. Hanya akan dijalankan sekali.
function loadApi() {
  if (window.isYouTubeApiReady || document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
    return;
  }

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  // YouTube akan memanggil fungsi ini setelah skrip dimuat dan siap
  window.onYouTubeIframeAPIReady = () => {
    window.isYouTubeApiReady = true;
  };
}

// Hook kustom untuk menggunakan pemutar YouTube
export const useYouTubePlayer = (elementId: string, videoId: string, onError?: (event: any) => void) => {
  // Fix: Use the globally defined YT.Player type for the ref.
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    // Pastikan skrip API dimuat
    loadApi();

    const createPlayer = () => {
      // Hancurkan pemutar lama jika ada
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      
      // Buat instance pemutar baru
      if (window.YT) {
        playerRef.current = new window.YT.Player(elementId, {
          height: '100%',
          width: '100%',
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onError: (event: any) => {
               console.error('YouTube Player Error:', event.data, 'for videoId:', videoId);
               if (onError) onError(event);
            },
          },
        });
      }
    };

    // Kita perlu menunggu hingga API siap. Kita periksa secara berkala.
    const intervalId = setInterval(() => {
      if (window.isYouTubeApiReady && window.YT?.Player) {
        clearInterval(intervalId);
        createPlayer();
      }
    }, 100);

    // Fungsi cleanup yang akan dijalankan saat komponen dilepas atau dependensi berubah
    return () => {
      clearInterval(intervalId);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
    // Efek ini akan berjalan kembali setiap kali videoId berubah,
    // secara efektif membuat ulang pemutar untuk video baru.
  }, [elementId, videoId, onError]);
};
