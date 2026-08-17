import React from "react";
import { ExternalLink } from "lucide-react";

export interface SourceProvenanceProps {
  source?: string;
  sourceUrl?: string;
  referencePeriod?: string;
  publishedAt?: string;
  fetchedAt?: string;
  isDelayed?: boolean;
  className?: string;
}

export function SourceBadge({
  source,
  sourceUrl,
  referencePeriod,
  publishedAt,
  fetchedAt,
  isDelayed,
  className = "",
}: SourceProvenanceProps) {
  if (!source) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-neutral-500 font-mono text-[10px] uppercase tracking-wider ${className}`}>
      <span className="flex items-center gap-1 font-semibold text-neutral-700">
        Sursă:{" "}
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 underline hover:text-amber-700 inline-flex items-center gap-0.5"
          >
            {source}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        ) : (
          <span className="text-neutral-800">{source}</span>
        )}
      </span>

      {referencePeriod && (
        <>
          <span className="text-neutral-300">•</span>
          <span>Perioadă: {referencePeriod}</span>
        </>
      )}

      {publishedAt && (
        <>
          <span className="text-neutral-300">•</span>
          <span>Publicat: {publishedAt}</span>
        </>
      )}

      {fetchedAt && (
        <>
          <span className="text-neutral-300">•</span>
          <span>
            Actualizat: {fetchedAt.includes("T") ? fetchedAt.split("T")[0] : fetchedAt}
          </span>
        </>
      )}

      {isDelayed && (
        <>
          <span className="text-neutral-300">•</span>
          <span className="text-amber-800 font-medium bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
            Date Raportate Oficial
          </span>
        </>
      )}
    </div>
  );
}

export { SourceBadge as SourceProvenance };
