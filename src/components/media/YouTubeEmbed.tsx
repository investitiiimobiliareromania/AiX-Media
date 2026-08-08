import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  isShort?: boolean;
  lazy?: boolean;
}

export function YouTubeEmbed({ videoId, title, isShort = false, lazy = true }: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div
      className={`relative w-full ${
        isShort ? "aspect-[9/16] max-w-[325px] mx-auto" : "aspect-video"
      } rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl`}
    >
      <iframe
        className="w-full h-full absolute inset-0 border-0"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading={lazy ? "lazy" : undefined}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
