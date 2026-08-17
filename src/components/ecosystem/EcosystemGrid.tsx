import React from "react";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { EcosystemCard } from "./EcosystemCard";

export const EcosystemGrid: React.FC = () => {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-12 text-neutral-900 rounded-3xl mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-700 mb-1 block">
            AiX Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Ecosistemul Integrat AiX
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
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
