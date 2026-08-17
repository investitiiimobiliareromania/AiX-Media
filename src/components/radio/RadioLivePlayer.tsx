'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon, Signal } from 'lucide-react';
import { StreamConfig, RadioProgram } from '@/types/radio';

interface RadioLivePlayerProps {
  streamConfig: StreamConfig;
  currentProgram: RadioProgram;
  nextProgram?: RadioProgram;
}

export function RadioLivePlayer({ streamConfig, currentProgram, nextProgram }: RadioLivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div className="bg-[#0a0a0a] text-white border-y border-white/10 p-8 md:p-12 shadow-2xl">
      <audio ref={audioRef} src={streamConfig.streamUrl} preload="none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Broadcast & Program Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-neutral-800 text-neutral-400 text-xs font-black uppercase tracking-widest px-3 py-1">
              <Signal className="w-4 h-4 text-neutral-500" /> STANDBY • STREAM OFFLINE
            </span>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
              {streamConfig.provider.toUpperCase()} • {streamConfig.bitrate} KBPS HQ STEREO
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight">
            {currentProgram.title}
          </h2>

          <p className="text-white/60 text-sm md:text-base font-medium max-w-2xl text-pretty leading-relaxed">
            {currentProgram.description}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs font-bold uppercase tracking-wider text-white/50 border-t border-white/10">
            <span>Prezentator: <strong className="text-white">{currentProgram.presenterName}</strong></span>
            <span>•</span>
            <span>Categorie: <strong className="text-white">{currentProgram.category}</strong></span>
          </div>
        </div>

        {/* Player Controls & Next Up */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-6 bg-white/5 p-6 border border-white/10 min-w-[320px]">
          {/* Main Play Button */}
          <div className="flex items-center gap-4 w-full justify-between">
            <button
              onClick={togglePlay}
              className="bg-white text-black p-5 font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-3 w-full"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 fill-current" />
                  <span className="text-xs font-black uppercase tracking-widest">Pauză Emisie</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current ml-1" />
                  <span className="text-xs font-black uppercase tracking-widest">Ascultă</span>
                </>
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-4 text-white/60 hover:text-white border border-white/10 hover:bg-white/10 transition-colors"
              title={isMuted ? "Dezmutează" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Next Program Teaser */}
          {nextProgram && (
            <div className="w-full pt-4 border-t border-white/10 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1 flex items-center gap-1">
                <RadioIcon className="w-3 h-3 text-red-500" /> Urmează în emisie:
              </span>
              <p className="text-xs font-bold text-white truncate">{nextProgram.title}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">{nextProgram.presenterName} • {nextProgram.duration}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
