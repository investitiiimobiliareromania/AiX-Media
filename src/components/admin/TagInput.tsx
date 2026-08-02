'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  availableTags?: string[];
}

export function TagInput({ tags, onChange, availableTags = ['economie', 'real-estate', 'asigurari', 'bursa', 'taxe', 'luxury', 'tech'] }: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
  };

  const suggestions = availableTags.filter(t => t.includes(input.toLowerCase()) && !tags.includes(t));

  return (
    <div className="mb-8">
      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        Tag-uri Articol
      </label>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 bg-foreground text-background text-xs font-bold uppercase tracking-wider px-3 py-1">
            #{tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Adaugă un tag și apasă Enter..."
          className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
        {input && (
          <button 
            type="button" 
            onClick={() => addTag(input)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Adaugă
          </button>
        )}
      </div>

      {/* Suggestions */}
      {input && suggestions.length > 0 && (
        <div className="mt-2 p-2 border border-border bg-background flex flex-wrap gap-2">
          {suggestions.map(sugg => (
            <button
              key={sugg}
              type="button"
              onClick={() => addTag(sugg)}
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/30 px-2 py-1"
            >
              +#{sugg}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
