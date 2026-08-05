import React from "react";
import { FileText, Compass } from "lucide-react";

interface EmptyStateProps {
  category: string;
  headline: string;
  description: string;
}

export function EmptyState({ category, headline, description }: EmptyStateProps) {
  return (
    <div className="my-10 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center max-w-2xl mx-auto space-y-3">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
        <Compass className="w-6 h-6" />
      </div>
      <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
        {category} Featured Briefing
      </span>
      <h3 className="text-xl font-bold text-white">{headline}</h3>
      <p className="text-xs text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default EmptyState;
