import React from "react";
import Link from "next/link";
import { VideoItem } from "@/lib/media/models/media-types";
import { Play } from "lucide-react";
import { YouTubeThumbnail } from "./YouTubeThumbnail";

interface VideoCardProps {
  video: VideoItem;
  priority?: boolean;
}

export function VideoCard({ video, priority = false }: VideoCardProps) {
  return (
    <Link
      href="/tv"
      className="group block rounded-2xl overflow-hidden bg-[var(--surface-elevated)] border border-neutral-200 hover:border-amber-600/40 transition-all hover:shadow-md"
    >
      <div className="relative w-full aspect-video bg-[var(--surface-elevated)] overflow-hidden">
        <YouTubeThumbnail
          videoId={video.youtubeId}
          alt={video.title}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover:scale-103 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-[var(--surface-elevated)]/15 group-hover:bg-transparent transition-colors" />

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--surface-elevated)]/95 text-neutral-900 text-[10px] font-mono font-bold uppercase tracking-wider border border-neutral-200 shadow-xs z-10">
          {video.category}
        </span>

        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[var(--surface-elevated)]/90 text-white text-[11px] font-mono font-semibold z-10">
          {video.duration}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-elevated)]/90 text-white flex items-center justify-center shadow-lg group-hover:bg-amber-600 group-hover:scale-108 transition-all">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-1.5 bg-[var(--surface-elevated)]">
        <h3 className="text-base font-bold text-neutral-950 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        )}
      </div>
    </Link>
  );
}
