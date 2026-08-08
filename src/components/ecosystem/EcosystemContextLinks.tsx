import React from "react";
import { getContextualEcosystem } from "@/config/ecosystem";

interface EcosystemContextLinksProps {
  category?: string;
}

export const EcosystemContextLinks: React.FC<EcosystemContextLinksProps> = ({ category }) => {
  const nodes = getContextualEcosystem(category);

  return (
    <div className="my-10 rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Wider Intelligence Network
          </span>
          <h4 className="text-sm font-serif font-bold text-white">Explore the AiX Ecosystem</h4>
        </div>
        <a
          href="https://cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
        >
          <span>Overview</span>
          <span>↗</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="group flex flex-col justify-between rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-4 transition-all hover:border-amber-500/40 hover:bg-neutral-900 min-w-0"
          >
            <div>
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 shrink-0">
                  {node.categoryLabel}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 mb-3">{node.description}</p>
            </div>
            
            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Accesează ${node.name}`}
              className="inline-flex items-center justify-between px-3 py-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black font-semibold font-mono text-xs transition-all cursor-pointer min-h-[32px]"
            >
              <span>Accesează</span>
              <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
