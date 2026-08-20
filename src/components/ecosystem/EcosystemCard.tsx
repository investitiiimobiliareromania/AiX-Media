import React from "react";
import { EcosystemNode } from "@/config/ecosystem";
import { ExternalLink } from "lucide-react";

interface EcosystemCardProps {
  node: EcosystemNode;
}

export const EcosystemCard: React.FC<EcosystemCardProps> = ({ node }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-6 transition-all duration-200 hover:border-amber-500/50 hover:bg-[var(--surface-elevated)] shadow-lg min-w-0">
      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 truncate">
            {node.categoryLabel}
          </span>
          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
            {new URL(node.url).hostname}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
          {node.name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-neutral-300 font-serif break-words">
          {node.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3 text-xs">
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Accesează platforma ${node.name} — ${node.description}`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface-elevated)] group-hover:bg-[var(--surface-elevated)] text-neutral-200 group-hover:text-neutral-950 font-semibold font-mono text-xs transition-all cursor-pointer min-h-[40px] border border-[var(--border)] group-hover:border-white"
        >
          <span>Accesează platforma</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

