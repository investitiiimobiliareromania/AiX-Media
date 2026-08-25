'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Calendar, Clock, ArrowRight, Mic, Headphones } from 'lucide-react';
import { PodcastEpisode } from '@/lib/media/models/media-types';
import { SafeImage } from '@/components/common/SafeImage';

interface PodcastFeaturedHeroProps {
  featuredEpisode: PodcastEpisode;
}

export function PodcastFeaturedHero({ featuredEpisode }: PodcastFeaturedHeroProps) {
  if (!featuredEpisode) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-amber-400" />
          <h2 className="font-serif text-2xl font-bold text-white tracking-tight">Episod Recomandat — Spotlight</h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">Audio &amp; Show Notes</span>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Large Artwork */}
          <div className="relative w-full lg:w-80 aspect-square rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shrink-0 shadow-xl">
            <SafeImage
              src={featuredEpisode.coverImage}
              slug={featuredEpisode.slug}
              alt={featuredEpisode.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-md bg-neutral-950/90 text-amber-400 border border-neutral-800 text-[10px] font-mono font-bold uppercase">
                {featuredEpisode.showName}
              </span>
            </div>
          </div>

          {/* Episode Info */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 font-bold uppercase text-[10px]">
                Episodul #{featuredEpisode.episodeNumber || 1}
              </span>
              <span>Host: <strong className="text-white">{featuredEpisode.host}</strong></span>
              <span>•</span>
              <span>{featuredEpisode.duration}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">
              {featuredEpisode.title}
            </h3>

            <p className="text-neutral-300 font-serif text-sm sm:text-base leading-relaxed line-clamp-3">
              {featuredEpisode.description}
            </p>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <Link
                href={`/podcast/${featuredEpisode.slug}`}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Headphones className="w-4 h-4" />
                <span>Ascultă Episodul &amp; Show Notes</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <div className="flex items-center gap-4 text-neutral-400 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  {featuredEpisode.publishedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
