'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Video, ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '@/config/youtube';

interface YouTubeShortsSectionProps {
  shorts: YouTubeVideo[];
}

export function YouTubeShortsSection({ shorts }: YouTubeShortsSectionProps) {
  if (!shorts || shorts.length === 0) return null;

  return (
    <section className="space-y-6 pt-4 border-t border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-rose-500" />
          <h2 className="font-serif text-2xl font-bold text-white">YouTube Shorts ({shorts.length})</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Vertical Video Format</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shorts.map((short) => (
          <a
            key={short.id}
            href={short.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-rose-500/60 transition-all shadow-xl aspect-[9/16]"
          >
            {/* YouTube Thumbnail */}
            <Image
              src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
              alt={short.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                  SHORTS
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-rose-600/90 text-white flex items-center justify-center mx-auto shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>

                <h3 className="font-serif text-xs font-bold text-white leading-tight line-clamp-3 group-hover:text-rose-300 transition-colors">
                  {short.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
