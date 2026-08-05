import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VideoItem } from "@/lib/media/models/media-types";
import { Tv, Play, Film, Clock } from "lucide-react";

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={`/tv`}
      className="group block rounded-2xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all hover:bg-neutral-900 shadow-xl"
    >
      <div className="relative w-full aspect-video bg-neutral-950">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-400/20 backdrop-blur-sm">
          {video.category}
        </span>

        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-medium">
          {video.duration}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-black ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
          {video.description}
        </p>
      </div>
    </Link>
  );
}
