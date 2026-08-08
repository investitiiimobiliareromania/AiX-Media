import React from "react";
import { AIX_ECOSYSTEM_NODES } from "@/config/ecosystem";
import { contactConfig } from "@/config/contact";

export const EcosystemFooter: React.FC = () => {
  return (
    <div className="border-t border-neutral-800 bg-neutral-950 pt-12 pb-8 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-10">
          
          {/* Ecosystem Column */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">
              AiX Ecosystem
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
              {AIX_ECOSYSTEM_NODES.map((node) => (
                <a
                  key={node.id}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${node.name}`}
                  className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>{node.name}</span>
                  <span className="text-[10px] text-neutral-600">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Direct Column */}
          <div>
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h3>
            <ul className="space-y-2 text-neutral-300">
              <li className="font-bold text-white">{contactConfig.name}</li>
              <li>{contactConfig.location}</li>
              <li>
                <a href={`mailto:${contactConfig.email}`} className="hover:text-amber-400 transition-colors">
                  {contactConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactConfig.phone}`} className="hover:text-amber-400 transition-colors">
                  📞 {contactConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contactConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  💬 WhatsApp: {contactConfig.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Editorial & About Column */}
          <div>
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4">
              About AiX Media
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Institutional intelligence, business journalism, real estate dynamics, capital markets analysis, radio and video insights for leaders in Romania and CEE.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} AiX Media. Part of the Cristian Văduva Ecosystem.</p>
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
