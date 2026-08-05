import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PodcastEpisode } from "@/lib/media/models/media-types";
import { Play, Mic, Clock, Headphones } from "lucide-react";

interface PodcastCardProps {
  episode: PodcastEpisode;
}

export function PodcastCard({ episode }: PodcastCardProps) {
  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group flex flex-col p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all hover:bg-neutral-900 shadow-lg"
    >
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-neutral-950">
        <Image
          src={episode.coverImage}
          alt={episode.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-amber-400/20 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
          {episode.showName} • EP #{episode.episodeNumber}
        </div>

        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-5 h-5 fill-black ml-0.5" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {episode.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {episode.description}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span className="text-neutral-300 font-medium">Guest: {episode.guest || episode.host}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {episode.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
