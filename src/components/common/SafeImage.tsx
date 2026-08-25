'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getFallbackImage } from '@/lib/fallbackImage';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  slug?: string;
  fallbackUrl?: string;
}

export function SafeImage({
  src,
  slug = '',
  fallbackUrl,
  alt = '',
  className,
  sizes,
  unoptimized,
  ...props
}: SafeImageProps) {
  const defaultFallback = fallbackUrl || getFallbackImage(slug) || '/fallbacks/story-1.jpg';
  const targetSrc = src && src.trim().length > 0 ? src : defaultFallback;

  const [currentSrc, setCurrentSrc] = useState<string>(targetSrc);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      className={className}
      unoptimized={unoptimized}
      onError={() => {
        if (currentSrc !== '/fallbacks/story-1.jpg') {
          setCurrentSrc('/fallbacks/story-1.jpg');
        }
      }}
    />
  );
}
