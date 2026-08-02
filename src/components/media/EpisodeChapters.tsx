import React from 'react';
import { PodcastChapter } from '@/types/media';
import { Bookmark } from 'lucide-react';

interface EpisodeChaptersProps {
  chapters: PodcastChapter[];
}

export function EpisodeChapters({ chapters }: EpisodeChaptersProps) {
  if (!chapters || chapters.length === 0) return null;

  return (
    <div className="border border-border p-6 bg-muted/20">
      <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-foreground" /> Capitole Episod
      </h4>
      <div className="space-y-3">
        {chapters.map((ch, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm py-1 hover:text-foreground transition-colors cursor-pointer group">
            <span className="font-medium text-foreground/80 group-hover:text-foreground">{ch.title}</span>
            <span className="font-mono text-xs text-muted-foreground bg-background px-2 py-0.5 border border-border">{ch.startTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
