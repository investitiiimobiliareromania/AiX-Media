import React from "react";
import { getContextualEcosystem } from "@/config/ecosystem";
import { ExternalLink } from "lucide-react";

interface EcosystemContextLinksProps {
  category?: string;
}

export const EcosystemContextLinks: React.FC<EcosystemContextLinksProps> = ({ category }) => {
  const nodes = getContextualEcosystem(category);

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700">
            Ecosistemul AiX
          </span>
          <h4 className="text-sm font-bold text-neutral-950">Platforme și Rețele Asociate</h4>
        </div>
        <a
          href="https://cristianvaduva.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-neutral-900 underline hover:text-amber-700 inline-flex items-center gap-1 font-mono"
        >
          <span>cristianvaduva.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-amber-600/40 hover:shadow-xs min-w-0"
          >
            <div>
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className="text-xs font-bold text-neutral-950 group-hover:text-amber-800 transition-colors truncate">
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 shrink-0">
                  {node.categoryLabel}
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 line-clamp-2 mt-1 mb-3">{node.description}</p>
            </div>

            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Accesează ${node.name}`}
              className="inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white font-semibold font-mono text-xs transition-colors cursor-pointer min-h-[32px]"
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
