'use client';

import React, { useState } from 'react';
import { RadioScheduleItem } from '@/types/radio';
import { Clock, Signal } from 'lucide-react';

interface ProgramScheduleProps {
  schedule: RadioScheduleItem[];
}

const DAYS = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

export function ProgramSchedule({ schedule }: ProgramScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1); // Luni by default

  const daySchedule = schedule.filter(item => item.dayOfWeek === selectedDay);

  return (
    <div className="py-12 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-heading font-black tracking-tight mb-2">Ghid de Emisie</h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Programul săptămânal AiX Radio</p>
        </div>

        {/* Days selector */}
        <div className="flex flex-wrap gap-1 border-b border-border md:border-none pb-4 md:pb-0">
          {DAYS.map((dayName, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                selectedDay === index
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {dayName}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="divide-y divide-border border border-border">
        {daySchedule.length > 0 ? (
          daySchedule.map(item => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold font-mono text-foreground w-32 shrink-0">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {item.startTime} - {item.endTime}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground">{item.programTitle}</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                    Moderator: {item.presenterName}
                  </p>
                </div>
              </div>

              <div>
                {item.isLive ? (
                  <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                    <Signal className="w-3 h-3" /> Emisie Programată
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border px-3 py-1">
                    Înregistrare Studio
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">
            Nu sunt emisiuni programate pentru această zi.
          </div>
        )}
      </div>
    </div>
  );
}
