import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  getIsMusicPlaying,
  startGlobalMusic,
  toggleGlobalMusic,
  subscribeMusicState,
} from "../utils/audioManager";

interface MusicPlayerProps {
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(getIsMusicPlaying());

  useEffect(() => {
    const unsubscribe = subscribeMusicState((playing) => {
      setIsPlaying(playing);
    });

    if (autoStart && !getIsMusicPlaying()) {
      startGlobalMusic();
    }

    return () => {
      unsubscribe();
    };
  }, [autoStart]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleGlobalMusic}
        aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md border border-[#C5A059] text-[#3A2E2B] shadow-xl hover:bg-[#FAF5EE] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        {/* Animated Equalizer Waveform Bars when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-5">
            <span className="w-1 bg-[#C5A059] rounded-full animate-waveform-1" />
            <span className="w-1 bg-[#C5A059] rounded-full animate-waveform-2" />
            <span className="w-1 bg-[#C5A059] rounded-full animate-waveform-3" />
            <span className="w-1 bg-[#C5A059] rounded-full animate-waveform-4" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#5C534E]" />
        )}

        <span className="font-serif text-xs tracking-wider text-[#3A2E2B] font-medium hidden sm:inline">
          {isPlaying ? "Music Playing" : "Wedding Music"}
        </span>

        {isPlaying && (
          <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
        )}

        {/* Outer subtle glow ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#C5A059]/40 animate-ping pointer-events-none" />
        )}

        {/* Hover Tooltip */}
        <span className="absolute bottom-12 right-0 whitespace-nowrap bg-[#3A2E2B] text-[#FAF7F2] text-[10px] tracking-widest uppercase py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-[#C5A059]/40">
          {isPlaying ? "Pause Wedding Instrumental" : "Play Wedding Instrumental"}
        </span>
      </button>
    </div>
  );
};
