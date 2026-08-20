'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon, Signal } from 'lucide-react';
import { StreamConfig, RadioProgram } from '@/types/radio';
import { useNowPlaying } from '@/hooks/useNowPlaying';

interface RadioLivePlayerProps {
  streamConfig: StreamConfig;
  currentProgram: RadioProgram;
  nextProgram?: RadioProgram;
}

export function RadioLivePlayer({ streamConfig, currentProgram, nextProgram }: RadioLivePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [state, setState] = useState<'IDLE' | 'LOADING' | 'PLAYING' | 'PAUSED' | 'OFFLINE'>('IDLE');

  const nowPlaying = useNowPlaying();

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onCanPlay = () => setState('PLAYING');
    const onPlay = () => setState('PLAYING');
    const onPause = () => setState('PAUSED');
    const onWaiting = () => setState('LOADING');
    const onError = () => setState('OFFLINE');
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (state === 'PLAYING' || state === 'LOADING') {
      audioRef.current.pause();
    } else {
      setState('LOADING');
      audioRef.current.play().catch(() => setState('OFFLINE'));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const retry = () => {
    if (!audioRef.current) return;
    audioRef.current.load();
    setState('IDLE');
  };

  const renderNowPlaying = () => {
    if (nowPlaying.loading) return null;
    if (nowPlaying.error) return <p className="text-xs text-[var(--foreground-muted)]">Now Playing unavailable</p>;
    const { isLive, artist, title, album, art, stationName, listeners } = nowPlaying;
    return (
      <div className="mt-4 p-4 bg-[var(--surface-elevated)] rounded-md border border-[var(--border)]">
        <div className="flex items-center gap-3">
          {art && (
            <img
              src={art}
              alt="Album art"
              className="w-12 h-12 object-cover rounded"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[var(--foreground)]">{isLive ? 'LIVE' : 'OFFLINE / STANDBY'}</span>
            <span className="text-xs text-[var(--foreground-muted)]">
              {artist && title ? `${artist} – ${title}` : stationName}
            </span>
            {typeof listeners === 'number' && (
              <span className="text-xs text-[var(--foreground-muted)]">👂 {listeners.toLocaleString()} listeners</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[var(--surface)] text-[var(--foreground)] border-y border-[var(--border)] p-8 md:p-12 shadow-xl">
      <audio ref={audioRef} src={streamConfig.streamUrl} preload="none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Broadcast & Program Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 bg-[var(--surface-elevated)] text-[var(--foreground-muted)] text-xs font-black uppercase tracking-widest px-3 py-1">
              <Signal className="w-4 h-4 text-neutral-500" /> {state === 'OFFLINE' ? 'STANDBY • STREAM OFFLINE' : 'LIVE'}
            </span>
            <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-widest">
              {streamConfig.provider.toUpperCase()} • {streamConfig.bitrate} KBPS HQ STEREO
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight">
            {currentProgram.title}
          </h2>

          <p className="text-[var(--foreground-muted)] text-sm md:text-base font-medium max-w-2xl text-pretty leading-relaxed">
            {currentProgram.description}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)] border-t border-[var(--border)]">
            <span>
              Prezentator: <strong className="text-[var(--foreground)]">{currentProgram.presenterName}</strong>
            </span>
            <span>•</span>
            <span>
              Categorie: <strong className="text-[var(--foreground)]">{currentProgram.category}</strong>
            </span>
          </div>
        </div>

        {/* Player Controls & Next Up */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-6 bg-[var(--surface-elevated)]/5 p-6 border border-white/10 min-w-[320px]">
          <div className="flex items-center gap-4 w-full justify-between">
            <button
              onClick={togglePlay}
              className="bg-[var(--accent-bronze)] text-white font-bold py-3 px-6 rounded-md hover:bg-[var(--accent-gold)] transition-colors flex items-center justify-center gap-3 w-full"
            >
              {state === 'PLAYING' ? (
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
              className="p-4 text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-editorial)] transition-colors"
              title={isMuted ? 'Dezmutează' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {state === 'OFFLINE' && (
            <button onClick={retry} className="text-xs text-[var(--accent-bronze)] underline mt-2">
              REÎNCEARCĂ
            </button>
          )}

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

      {/* Now Playing UI */}
      {renderNowPlaying()}
    </div>
  );
}
