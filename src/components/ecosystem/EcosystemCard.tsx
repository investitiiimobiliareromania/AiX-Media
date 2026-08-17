import React from "react";
import { EcosystemNode } from "@/config/ecosystem";
import { ExternalLink } from "lucide-react";

interface EcosystemCardProps {
  node: EcosystemNode;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({ node }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 transition-all duration-200 hover:border-amber-600/40 hover:shadow-md min-w-0">
      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 truncate">
            {node.categoryLabel}
          </span>
          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
            {new URL(node.url).hostname}
          </span>
        </div>

        <h3 className="text-lg font-bold text-neutral-950 group-hover:text-amber-800 transition-colors">
          {node.name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-neutral-600 break-words">
          {node.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs">
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Accesează platforma ${node.name} — ${node.description}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-900 hover:bg-neutral-900 hover:text-white font-semibold font-mono text-xs transition-colors cursor-pointer min-h-[40px]"
        >
          <span>Accesează platforma</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
