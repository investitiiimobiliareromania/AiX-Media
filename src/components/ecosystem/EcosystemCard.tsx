import React from "react";
import { EcosystemNode } from "@/config/ecosystem";

interface EcosystemCardProps {
  node: EcosystemNode;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({ node }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/90 bg-neutral-950/90 p-5 sm:p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900 shadow-sm min-w-0">
      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 truncate">
            {node.categoryLabel}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 shrink-0">
            {new URL(node.url).hostname}
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
          {node.name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-neutral-400 break-words">
          {node.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-900/80 flex items-center justify-between gap-3 text-xs">
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Accesează platforma ${node.name} — ${node.description}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black font-semibold font-mono text-xs transition-all duration-200 cursor-pointer min-h-[40px]"
        >
          <span>Accesează</span>
          <span>→</span>
        </a>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
          Sursă Oficială ↗
        </span>
      </div>
    </div>
  );
};
