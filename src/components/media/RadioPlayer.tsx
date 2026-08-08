"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RadioShow } from "@/lib/media/models/media-types";
import { Play, Pause, Radio, Volume2, VolumeX, Signal, Users, Calendar } from "lucide-react";

interface RadioPlayerProps {
  currentShow: RadioShow;
  allShows?: RadioShow[];
}

export function RadioPlayer({ currentShow, allShows = [] }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="my-12 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c0a06] via-[#080808] to-[#050505] border border-amber-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Cover Art & Pulse */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/40 shadow-2xl group">
          <Image
            src={currentShow.coverImage}
            alt={currentShow.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            ON AIR
          </div>
        </div>

        {/* Show Metadata & Live Controls */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
              AiX Live Business Radio
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Signal className="w-3.5 h-3.5 text-emerald-400" /> 320kbps HD Audio
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {currentShow.title}
            </h2>
            <p className="text-sm text-neutral-300 mt-1 font-mono">
              Hosted by <span className="text-amber-400 font-semibold">{currentShow.host}</span> • {currentShow.airTime}
            </p>
          </div>

          <p className="text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            {currentShow.description}
          </p>

          {/* Interactive Player Controls */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center gap-3 transform active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-black" />
                  <span>PAUSE LIVE BROADCAST</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                  <span>LISTEN LIVE RADIO</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Shows Schedule Carousel */}
      {allShows.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
            <span className="flex items-center gap-1.5 text-white font-semibold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-amber-400" /> Today&apos;s Broadcasting Lineup
            </span>
            <span>Live Stream HD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {allShows.map((show) => (
              <div
                key={show.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  show.status === "LIVE"
                    ? "bg-amber-500/10 border-amber-500/40"
                    : "bg-neutral-900/50 border-neutral-800"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-amber-400 font-semibold">{show.airTime}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      show.status === "LIVE"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse"
                        : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {show.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{show.title}</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{show.host}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
