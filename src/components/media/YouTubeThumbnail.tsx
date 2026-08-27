"use client";

import React, { useState } from "react";
import Image from "next/image";

interface YouTubeThumbnailProps {
  videoId: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function YouTubeThumbnail({
  videoId,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: YouTubeThumbnailProps) {
  const [src, setSrc] = useState<string>(
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  );
  const [errorCount, setErrorCount] = useState<number>(0);

  const handleError = () => {
    if (errorCount === 0) {
      // First fallback: hqdefault
      setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
      setErrorCount(1);
    } else if (errorCount === 1) {
      // Second fallback: mqdefault
      setSrc(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
      setErrorCount(2);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={handleError}
      className={`object-cover ${className}`}
    />
  );
}
