'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { cleanText } from '@/lib/sanitizer';

interface TranscriptViewProps {
  transcript?: string;
}

export function TranscriptView({ transcript }: TranscriptViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!transcript) return null;

  return (
    <div className="border border-border mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between bg-muted/20 hover:bg-muted/40 transition-colors text-left"
      >
        <span className="font-heading font-bold text-sm uppercase tracking-widest text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" /> Transcript Complet
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="p-6 border-t border-border bg-background text-sm text-foreground/80 font-mono leading-relaxed whitespace-pre-line">
          {cleanText(transcript)}
        </div>
      )}
    </div>
  );
}

