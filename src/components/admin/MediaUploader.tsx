'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function MediaUploader({ value, onChange, label = 'Imagine Copertă' }: MediaUploaderProps) {
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Drag and drop handler
    const file = e.dataTransfer.files[0];
    if (file) {
      // Clean previous blob URL if any
      if (value && value.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
      const fakeUrl = URL.createObjectURL(file);
      onChange(fakeUrl);
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>

      {value ? (
        <div className="space-y-4">
          <div className="relative aspect-[16/9] border border-border bg-muted/20 overflow-hidden flex items-center justify-center">
            {/* Image Preview */}
            <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-white/40 font-heading font-bold">
              PREVIEW: {value.substring(0, 30)}...
            </div>
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-black text-white p-2 hover:bg-red-600 transition-colors"
              title="Șterge imaginea"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Alt Text (pentru SEO / Accesibilitate)"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full bg-transparent border-b border-border py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              type="text"
              placeholder="Legendă (Caption)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-transparent border-b border-border py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
            />
            <input
              type="text"
              placeholder="Credit Foto (Sursă)"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              className="w-full bg-transparent border-b border-border py-2 text-xs focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-foreground bg-muted/40' : 'border-border hover:border-foreground/60'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">Trage imaginea aici sau dă click pentru a încărca</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP de până la 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(URL.createObjectURL(file));
              }}
            />
            <label htmlFor="file-upload" className="bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-foreground/90 transition-colors">
              Selectează Fișier
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
