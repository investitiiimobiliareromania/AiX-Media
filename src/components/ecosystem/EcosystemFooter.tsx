import React from "react";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { contactConfig } from "@/config/contact";

export const EcosystemFooter: React.FC = () => {
  return (
    <div className="border-t border-neutral-800 bg-neutral-950 pt-12 pb-8 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* AiX Ecosystem Directory Section */}
        <div className="mb-12 rounded-xl border border-neutral-800/90 bg-neutral-950/80 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                AiX Ecosystem
              </span>
              <h3 className="text-sm font-serif font-bold text-white mt-0.5">
                Connected Intelligence &amp; Services
              </h3>
            </div>
            <a
              href="https://cristianvaduva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>cristianvaduva.com</span>
              <span>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {AIX_ECOSYSTEM_NODES.map((node) => (
              <div
                key={node.id}
                className="group flex flex-col justify-between p-3.5 rounded-lg border border-neutral-800/70 bg-neutral-900/50 hover:bg-neutral-900 hover:border-amber-500/40 transition-colors min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {node.name}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-mono shrink-0">
                      {node.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 mb-3">
                    {node.description}
                  </p>
                </div>

                <a
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Accesează ${node.name}`}
                  className="inline-flex items-center justify-between px-3 py-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black font-semibold font-mono text-[11px] transition-all cursor-pointer min-h-[30px]"
                >
                  <span>Accesează</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Direct Contact Column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">
              Direct Contact &amp; Headquarters
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li className="font-bold text-white">{contactConfig.name}</li>
              <li className="text-neutral-400">📍 {contactConfig.location}</li>
              <li>
                <a href={`mailto:${contactConfig.email}`} className="hover:text-amber-400 transition-colors">
                  ✉️ {contactConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactConfig.phone}`} className="hover:text-amber-400 transition-colors">
                  📞 RO: {contactConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contactConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  💬 WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Editorial & Network Info */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">
              About AiX Media Network
            </h3>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Romania&apos;s next-generation business journalism and market intelligence platform. Part of the connected AiX Ecosystem providing macro insights and strategic infrastructure.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} AiX Media • {contactConfig.name}. All rights reserved. Part of the Cristian Văduva Ecosystem.</p>
          <div className="flex items-center gap-4">
            <a href="https://cristianvaduva.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              cristianvaduva.com ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
