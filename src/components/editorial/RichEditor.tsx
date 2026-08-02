'use client';

import React, { useRef } from 'react';
import { 
  Heading1, Heading2, Heading3, Quote, List, ListOrdered, Table, 
  Image as ImageIcon, Video, Code, AlertCircle, Minus, LayoutGrid
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichEditor({ value, onChange, placeholder = 'Scrie conținutul articolului...' }: RichEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertSnippet = (prefix: string, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 4));
    }, 0);
  };

  return (
    <div className="border border-border">
      {/* Editor Toolbar */}
      <div className="bg-muted/30 border-b border-border p-2 flex flex-wrap gap-1 items-center">
        <button type="button" onClick={() => insertSnippet('# ')} title="H1" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Heading1 className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('## ')} title="H2" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Heading2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('### ')} title="H3" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Heading3 className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('> ')} title="Citat" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Quote className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('- ')} title="Listă" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('1. ')} title="Listă Numerotată" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><ListOrdered className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('\n| Header 1 | Header 2 |\n| --- | --- |\n| Data 1 | Data 2 |\n')} title="Tabel" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Table className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('![Alt text](https://url-imagine.jpg)')} title="Imagine" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><ImageIcon className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('\n<div className="grid grid-cols-2 gap-4">\n  ![Foto 1](https://url1.jpg)\n  ![Foto 2](https://url2.jpg)\n</div>\n')} title="Galerie" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><LayoutGrid className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('\n<iframe src="https://youtube.com/embed/id" className="w-full aspect-video"></iframe>\n')} title="Video" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Video className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('```typescript\n', '\n```')} title="Cod" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Code className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('> [!NOTE]\n> ')} title="Callout" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><AlertCircle className="w-4 h-4" /></button>
        <button type="button" onClick={() => insertSnippet('\n---\n')} title="Separator" className="p-2 text-muted-foreground hover:text-foreground hover:bg-background transition-colors text-xs font-bold uppercase flex items-center gap-1"><Minus className="w-4 h-4" /></button>
      </div>

      {/* Textarea Workspace */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={18}
        className="w-full bg-transparent p-6 text-foreground font-mono text-base focus:outline-none leading-relaxed resize-y"
      />
    </div>
  );
}
