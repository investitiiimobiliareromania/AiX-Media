"use client";

import React from "react";
import Image from "next/image";
import { RadioShow } from "@/lib/media/models/media-types";
import { Radio, Signal, Calendar } from "lucide-react";

interface RadioPlayerProps {
  currentShow: RadioShow;
  allShows?: RadioShow[];
}

export function RadioPlayer({ currentShow, allShows = [] }: RadioPlayerProps) {
  return (
    <section className="my-10 p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 relative overflow-hidden shadow-xs">
      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Cover Art */}
        <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shrink-0 border border-neutral-300 shadow-sm group">
          <Image
            src={currentShow.coverImage}
            alt={currentShow.title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-neutral-800 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs border border-neutral-200">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            PROGRAMAT
          </div>
        </div>

        {/* Show Metadata & Controls */}
        <div className="flex-1 space-y-3 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200 text-xs font-mono font-bold">
              AiX Business Audio
            </span>
            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
              <Signal className="w-3.5 h-3.5 text-neutral-400" /> Grilă Editorială Audio
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              {currentShow.title}
            </h2>
            <p className="text-sm text-neutral-600 mt-1 font-mono">
              Realizator: <span className="text-neutral-900 font-semibold">{currentShow.host}</span> • {currentShow.airTime}
            </p>
          </div>

          <p className="text-xs md:text-sm text-neutral-600 max-w-2xl leading-relaxed">
            {currentShow.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              disabled
              className="px-5 py-2.5 rounded-lg bg-neutral-200 text-neutral-700 font-semibold text-xs font-mono flex items-center gap-2 cursor-not-allowed border border-neutral-300"
            >
              <Radio className="w-4 h-4 text-neutral-600" />
              <span>FLUX AUDIO ÎN PREGĂTIRE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shows Schedule */}
      {allShows.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-600 mb-4">
            <span className="flex items-center gap-1.5 text-neutral-900 font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-amber-700" /> Program Emisiuni Economice
            </span>
            <span>Grilă Săptămânală</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {allShows.map((show) => (
              <div
                key={show.id}
                className="p-3.5 rounded-xl border border-neutral-200 bg-white shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-neutral-900 font-bold">{show.airTime}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                    {show.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-neutral-900 truncate">{show.title}</div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{show.host}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
