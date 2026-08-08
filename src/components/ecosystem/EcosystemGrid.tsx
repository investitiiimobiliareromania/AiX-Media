import React from "react";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { EcosystemCard } from "./EcosystemCard";

export const EcosystemGrid: React.FC = () => {
  return (
    <section className="border-t border-neutral-800 bg-neutral-950 py-16 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
            AiX Ecosystem
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            The AiX Ecosystem
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            One connected ecosystem across intelligence, capital, property, protection, health and business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AIX_ECOSYSTEM_NODES.map((node) => (
            <EcosystemCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </section>
  );
};
