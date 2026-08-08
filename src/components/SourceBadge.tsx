import React from "react";

interface SourceBadgeProps {
  source?: string;
  publishedAt?: string;
  fetchedAt?: string;
  isDelayed?: boolean;
  className?: string;
}

export function SourceBadge({ source, publishedAt, fetchedAt, isDelayed, className = "" }: SourceBadgeProps) {
  if (!source) return null;
  return (
    <div className={`flex flex-col gap-0.5 text-neutral-500 font-mono text-[9px] uppercase tracking-wider ${className}`}>
      <span className="text-neutral-400 font-semibold">Source: {source}</span>
      {publishedAt && <span>Published: {publishedAt}</span>}
      {fetchedAt && (
        <span>
          Fetched: {fetchedAt.includes("T") ? fetchedAt.split("T")[0] : fetchedAt}
        </span>
      )}
      {isDelayed && <span className="text-amber-500/70 font-semibold">Delayed</span>}
    </div>
  );
}
