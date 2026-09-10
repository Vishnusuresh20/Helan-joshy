import React, { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;

    if (autoStart) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Autoplay blocked or waiting for user interaction:", err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [autoStart]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio playback error:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#C5A059] text-[#3A2E2B] shadow-lg hover:bg-[#FAF5EE] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <span className="font-serif text-lg text-[#C5A059] font-bold group-hover:scale-110 transition-transform">
          ♪
        </span>

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#C5A059]/60 animate-ping pointer-events-none" />
        )}

        {/* Status tooltip */}
        <span className="absolute right-14 whitespace-nowrap bg-[#3A2E2B] text-white text-[10px] tracking-wider uppercase py-1 px-2.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          {isPlaying ? "Pause Music" : "Play Wedding Audio"}
        </span>
      </button>
    </div>
  );
};
