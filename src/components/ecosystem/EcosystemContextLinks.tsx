import React from "react";
import { getContextualEcosystem } from "@/config/ecosystem";

interface EcosystemContextLinksProps {
  category?: string;
}

export const EcosystemContextLinks: React.FC<EcosystemContextLinksProps> = ({ category }) => {
  const nodes = getContextualEcosystem(category);

  return (
    <div className="my-10 rounded-xl border border-neutral-800 bg-neutral-950 p-6">
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
          className="text-xs font-semibold text-amber-400 hover:underline"
        >
          Overview ↗
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {nodes.map((node) => (
          <a
            key={node.id}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Explore ${node.name}`}
            className="group flex flex-col justify-between rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-4 transition-all hover:border-amber-500/40 hover:bg-neutral-900"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  {node.name}
                </span>
                <span className="text-xs text-neutral-500 group-hover:text-amber-400 transition-colors">
                  ↗
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 line-clamp-2">{node.description}</p>
            </div>
            <span className="mt-3 text-[10px] font-mono text-neutral-500 group-hover:text-amber-400 transition-colors">
              Explore Platform →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
