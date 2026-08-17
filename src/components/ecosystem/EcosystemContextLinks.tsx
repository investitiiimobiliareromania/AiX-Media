import React from "react";
import { getContextualEcosystem } from "@/config/ecosystem";
import { ExternalLink } from "lucide-react";

interface EcosystemContextLinksProps {
  category?: string;
}

export const EcosystemContextLinks: React.FC<EcosystemContextLinksProps> = ({ category }) => {
  const nodes = getContextualEcosystem(category);

  return (
    <div className="my-8 rounded-2xl border border-[#262932] bg-[#111317] p-5 sm:p-6 shadow-xl text-neutral-100">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262932]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
            Ecosistemul AiX
          </span>
          <h4 className="font-serif text-sm font-bold text-white mt-0.5">Platforme și Rețele Asociate</h4>
        </div>
        <a
          href="https://cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-neutral-300 underline hover:text-amber-400 inline-flex items-center gap-1 font-mono transition-colors"
        >
          <span>cristianvaduva.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="group flex flex-col justify-between rounded-xl border border-[#262932] bg-[#171920] p-4 transition-all hover:border-amber-500/50 hover:bg-[#1f222b] shadow-xs min-w-0"
          >
            <div>
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className="font-serif text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 shrink-0">
                  {node.categoryLabel}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 line-clamp-2 mt-1 mb-3 font-serif">{node.description}</p>
            </div>

            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Accesează ${node.name}`}
              className="inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#111317] text-neutral-200 hover:bg-white hover:text-neutral-950 font-semibold font-mono text-xs transition-colors cursor-pointer min-h-[32px] border border-[#262932]"
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

