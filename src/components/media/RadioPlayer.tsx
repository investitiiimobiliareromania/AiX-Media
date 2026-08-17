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
    <section className="my-10 p-6 md:p-8 rounded-2xl bg-[#111317] border border-[#262932] relative overflow-hidden shadow-xl text-neutral-100">
      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Cover Art */}
        <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shrink-0 border border-[#262932] shadow-xl group bg-[#0c0d12]">
          <Image
            src={currentShow.coverImage}
            alt={currentShow.title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#111317]/90 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs border border-[#262932]">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            PROGRAMAT
          </div>
        </div>

        {/* Show Metadata & Controls */}
        <div className="flex-1 space-y-3 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
              AiX Business Audio
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Signal className="w-3.5 h-3.5 text-amber-500" /> Grilă Editorială Audio
            </span>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentShow.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-1 font-mono">
              Realizator: <span className="text-white font-semibold">{currentShow.host}</span> • {currentShow.airTime}
            </p>
          </div>

          <p className="text-xs md:text-sm text-neutral-300 max-w-2xl leading-relaxed font-serif">
            {currentShow.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              disabled
              className="px-5 py-2.5 rounded-xl bg-[#171920] text-neutral-400 font-semibold text-xs font-mono flex items-center gap-2 cursor-not-allowed border border-[#262932]"
            >
              <Radio className="w-4 h-4 text-neutral-500" />
              <span>FLUX AUDIO ÎN PREGĂTIRE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shows Schedule */}
      {allShows.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[#262932]">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
            <span className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-amber-500" /> Program Emisiuni Economice
            </span>
            <span>Grilă Săptămânală</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {allShows.map((show) => (
              <div
                key={show.id}
                className="p-4 rounded-xl border border-[#262932] bg-[#171920] shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-amber-400 font-bold">{show.airTime}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-[#1f222b] text-neutral-300 border border-[#262932]">
                    {show.status}
                  </span>
                </div>
                <div className="font-serif text-sm font-bold text-white truncate">{show.title}</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-1">{show.host}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

