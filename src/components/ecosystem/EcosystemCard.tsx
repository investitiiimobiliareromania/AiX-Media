import React from "react";
import { EcosystemNode } from "@/config/ecosystem";

interface EcosystemCardProps {
  node: EcosystemNode;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({ node }) => {
  return (
    <a
      href={node.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Explore ${node.name} — ${node.description}`}
      className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900 shadow-sm"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500/90">
            {node.categoryLabel}
          </span>
          <span className="text-xs text-neutral-500 group-hover:text-amber-400 transition-colors">
            ↗
          </span>
        </div>

        <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors">
          {node.name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-neutral-400">
          {node.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs">
        <span className="font-semibold text-amber-400/90 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
          Explore →
        </span>
        <span className="font-mono text-[10px] text-neutral-500 group-hover:text-neutral-400 transition-colors">
          {new URL(node.url).hostname}
        </span>
      </div>
    </a>
  );
};
