'use client';

import React from 'react';
import { VideoProvider } from '@/types/media';

interface VideoPlayerProps {
  provider: VideoProvider;
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ provider, videoUrl, title }: VideoPlayerProps) {
  if (provider === 'self_hosted') {
    return (
      <div className="w-full aspect-video bg-black border border-border overflow-hidden">
        <video 
          controls 
          className="w-full h-full object-contain"
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Browser-ul tău nu suportă elementul video.
        </video>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black border border-border overflow-hidden">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
