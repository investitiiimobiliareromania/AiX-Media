'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { RadioStationItem } from '@/lib/radio-intelligence-service';

interface RadioPersistentAudioPlayerProps {
  currentStation: RadioStationItem | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function RadioPersistentAudioPlayer({
  currentStation,
  isPlaying,
  onTogglePlay,
}: RadioPersistentAudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playbackState, setPlaybackState] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error' | 'reconnecting'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectCountRef = useRef(0);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle station change & play/pause toggle
  useEffect(() => {
    if (!audioRef.current || !currentStation) return;

    if (isPlaying) {
      setPlaybackState('loading');
      setErrorMessage(null);
      audioRef.current.src = currentStation.streamUrl;
      audioRef.current
        .play()
        .then(() => {
          setPlaybackState('playing');
          reconnectCountRef.current = 0;
        })
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setPlaybackState('error');
          setErrorMessage('Stream nepreluat (offline sau blocat)');
        });
    } else {
      audioRef.current.pause();
      setPlaybackState('paused');
    }
  }, [isPlaying, currentStation]);

  const handleAudioError = () => {
    if (reconnectCountRef.current < 2 && currentStation) {
      reconnectCountRef.current += 1;
      setPlaybackState('reconnecting');
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = currentStation.streamUrl;
          audioRef.current.play().catch(() => {
            setPlaybackState('error');
            setErrorMessage('Stream indisponibil momentan');
          });
        }
      }, 2000);
    } else {
      setPlaybackState('error');
      setErrorMessage('Stream indisponibil (Offline)');
    }
  };

  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 p-4 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentStation.streamUrl}
        onWaiting={() => setPlaybackState('loading')}
        onPlaying={() => setPlaybackState('playing')}
        onPause={() => setPlaybackState('paused')}
        onError={handleAudioError}
        preload="none"
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono text-xs text-neutral-100">
        {/* Station Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shrink-0">
            <Image
              src={currentStation.logo}
              alt={currentStation.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm font-serif truncate">{currentStation.name}</span>
              
              {playbackState === 'playing' && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PLAYING
                </span>
              )}

              {playbackState === 'loading' && (
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-bold uppercase flex items-center gap-1">
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  CONNECTING
                </span>
              )}

              {playbackState === 'reconnecting' && (
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[9px] font-bold uppercase flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  RECONNECTING
                </span>
              )}

              {playbackState === 'error' && (
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] font-bold uppercase flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  OFFLINE
                </span>
              )}
            </div>

            <div className="text-[10px] text-neutral-400 truncate mt-0.5">
              {errorMessage || `${currentStation.currentShow || currentStation.frequency} • ${currentStation.city}`}
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
            aria-label={isPlaying ? 'Pauză stream radio' : 'Redare stream radio'}
          >
            {playbackState === 'loading' || playbackState === 'reconnecting' ? (
              <Loader2 className="w-5 h-5 text-neutral-950 animate-spin" />
            ) : isPlaying && playbackState === 'playing' ? (
              <Pause className="w-5 h-5 fill-neutral-950" />
            ) : (
              <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
            )}
          </button>

          {/* Volume Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (audioRef.current) {
                  audioRef.current.muted = nextMuted;
                }
              }}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (val > 0 && isMuted) {
                  setIsMuted(false);
                  if (audioRef.current) audioRef.current.muted = false;
                }
              }}
              className="w-20 accent-amber-500 cursor-pointer"
            />
          </div>

          <a
            href={currentStation.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors hidden md:flex items-center gap-1 font-bold text-[11px]"
          >
            <span>Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

