'use client';

import { Upload, Search } from "lucide-react";

export default function MediaLibraryPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Media Library</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Gestionează imaginile și fișierele</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Încarcă Fișier
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Caută în librărie..." 
            className="w-full bg-transparent border border-border pl-12 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <select className="bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors w-48">
          <option>Toate fișierele</option>
          <option>Imagini</option>
          <option>Documente (PDF)</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Mock Item */}
        <div className="group cursor-pointer">
          <div className="aspect-square bg-muted/30 border border-border flex items-center justify-center mb-2 group-hover:border-foreground transition-colors">
             <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">IMG_001.JPG</span>
          </div>
          <p className="text-xs font-bold truncate">cover-articol-1.jpg</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">1.2 MB</p>
        </div>
        {/* Mock Item */}
        <div className="group cursor-pointer">
          <div className="aspect-square bg-muted/30 border border-border flex items-center justify-center mb-2 group-hover:border-foreground transition-colors">
             <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">IMG_002.PNG</span>
          </div>
          <p className="text-xs font-bold truncate">grafic-dobanzi.png</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">800 KB</p>
        </div>
      </div>
    </div>
  );
}
