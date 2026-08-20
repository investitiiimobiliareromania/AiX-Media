import React from "react";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { EcosystemCard } from "./EcosystemCard";

export const EcosystemGrid: React.FC = () => {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface-elevated)] py-14 text-neutral-100 rounded-2xl mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 block">
            AiX Ecosystem
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Ecosistemul Integrat AiX
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif">
            Rețea digitală integrată de analiză economică, consultanță investițională, patrimoniu și inteligență imobiliară.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AIX_ECOSYSTEM_NODES.map((node) => (
            <EcosystemCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </section>
  );
};

