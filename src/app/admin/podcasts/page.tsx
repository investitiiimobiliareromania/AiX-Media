'use client';

import { useEffect, useState } from "react";
import { mediaService } from "@/services/media.service";
import { PodcastItem } from "@/types/media";
import { DataTable } from "@/components/admin/DataTable";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminPodcastsPage() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);

  useEffect(() => {
    mediaService.getPodcasts().then(setPodcasts);
  }, []);

  const columns = [
    { key: 'title', label: 'Titlu Episod Podcast' },
    { key: 'category', label: 'Categorie', width: '150px' },
    { key: 'chapters', label: 'Capitole', width: '120px' },
    { key: 'duration', label: 'Durată', width: '120px' },
    { key: 'actions', label: '', width: '100px' },
  ];

  const renderRow = (p: PodcastItem) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 font-bold">{p.title}</td>
      <td className="p-4 text-muted-foreground text-sm">{p.category}</td>
      <td className="p-4 text-sm font-mono">{p.chapters.length} capitole</td>
      <td className="p-4 text-sm font-mono">{p.duration}</td>
      <td className="p-4 text-right">
        <div className="flex items-center gap-2 justify-end">
          <button className="text-muted-foreground hover:text-foreground p-1"><Edit className="w-4 h-4" /></button>
          <button className="text-muted-foreground hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Podcasts CMS</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Gestionează Episoadele Audio, Capitolele și Transcriptorul</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Episod Nou
        </button>
      </div>

      <DataTable columns={columns} data={podcasts} renderRow={renderRow} />
    </div>
  );
}
