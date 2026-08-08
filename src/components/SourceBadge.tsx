import React from "react";

interface SourceBadgeProps {
  source?: string;
  date?: string;
  className?: string;
}

export function SourceBadge({ source, date, className = "" }: SourceBadgeProps) {
  if (!source) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900/80 text-neutral-400 border border-neutral-800/60 font-mono text-[9px] uppercase tracking-wider ${className}`}>
      <span>Source: {source}</span>
      {date && (
        <>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span>{date}</span>
        </>
      )}
    </span>
  );
}
