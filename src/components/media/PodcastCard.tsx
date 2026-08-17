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
      className="group flex flex-col p-5 rounded-2xl bg-[#111317] border border-[#262932] hover:border-amber-500/50 transition-all hover:bg-[#171920] shadow-lg hover:shadow-2xl"
    >
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-[#0c0d12]">
        <Image
          src={episode.coverImage}
          alt={episode.title}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#111317]/90 border border-[#262932] text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
          {episode.showName} • EP #{episode.episodeNumber}
        </div>

        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/80 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md group-hover:bg-amber-500 group-hover:text-black transition-all">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {episode.title}
          </h3>
          <p className="text-xs text-neutral-400 font-serif line-clamp-2 mt-1.5 leading-relaxed">
            {episode.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#262932] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span className="text-neutral-300 font-medium truncate max-w-[180px]">
            {episode.host}
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            {episode.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}

