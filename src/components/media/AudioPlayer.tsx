'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  return (
    <div className="bg-[#0a0a0a] text-white p-6 md:p-8 border border-white/10 shadow-2xl">
      <audio ref={audioRef} src={audioUrl} preload="none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block mb-1">
            Player Podcast AiX
          </span>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white truncate max-w-xl">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => skip(-15)} className="p-3 text-white/60 hover:text-white transition-colors" title="-15 sec">
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="bg-[var(--surface)] text-[var(--foreground)] p-4 font-bold hover:bg-[var(--surface-editorial)] transition-all flex items-center justify-center gap-2"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>

          <button onClick={() => skip(15)} className="p-3 text-white/60 hover:text-white transition-colors" title="+15 sec">
            <SkipForward className="w-5 h-5" />
          </button>

          <button onClick={toggleMute} className="p-3 text-white/60 hover:text-white transition-colors" title="Mute">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
