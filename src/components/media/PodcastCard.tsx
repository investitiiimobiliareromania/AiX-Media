import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PodcastEpisode } from "@/lib/media/models/media-types";
import { Play, Clock } from "lucide-react";

interface PodcastCardProps {
  episode: PodcastEpisode;
}

export function PodcastCard({ episode }: PodcastCardProps) {
  return (
    <Link
      href={`/podcast/${episode.slug}`}
      className="group flex flex-col p-5 rounded-2xl bg-white border border-neutral-200 hover:border-amber-600/40 transition-all hover:shadow-md"
    >
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-neutral-100">
        <Image
          src={episode.coverImage}
          alt={episode.title}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/95 border border-neutral-200 text-neutral-900 text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
          {episode.showName} • EP #{episode.episodeNumber}
        </div>

        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-md group-hover:bg-amber-600 transition-colors">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-neutral-950 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            {episode.title}
          </h3>
          <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
            {episode.description}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span className="text-neutral-700 font-medium truncate max-w-[180px]">
            {episode.host}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            {episode.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
