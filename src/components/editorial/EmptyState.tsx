import React from "react";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  category: string;
  headline: string;
  description: string;
}

export function EmptyState({ category, headline, description }: EmptyStateProps) {
  return (
    <div className="my-10 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 text-center max-w-2xl mx-auto space-y-3 shadow-xs">
      <div className="w-12 h-12 rounded-2xl bg-white text-amber-700 flex items-center justify-center mx-auto mb-2 border border-neutral-200 shadow-xs">
        <Compass className="w-6 h-6" />
      </div>
      <span className="text-xs font-mono uppercase text-amber-800 font-bold tracking-wider">
        {category} Raport Editorial
      </span>
      <h3 className="text-xl font-bold text-neutral-950">{headline}</h3>
      <p className="text-xs text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default EmptyState;
