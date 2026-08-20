"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  isShort?: boolean;
  lazy?: boolean;
}

export function YouTubeEmbed({ videoId, title, isShort = false }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full ${
        isShort ? "aspect-[9/16] max-w-[325px] mx-auto" : "aspect-video"
      } rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl group`}
    >
      {!isLoaded ? (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="w-full h-full relative block text-left cursor-pointer focus:outline-none"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-[var(--surface-elevated)]/40 group-hover:bg-[var(--surface-elevated)]/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-amber-500 text-[var(--foreground)] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-black ml-1" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          className="w-full h-full absolute inset-0 border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
