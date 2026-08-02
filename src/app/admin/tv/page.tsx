'use client';

import { useEffect, useState } from "react";
import { mediaService } from "@/services/media.service";
import { VideoItem } from "@/types/media";
import { DataTable } from "@/components/admin/DataTable";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminTVPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    mediaService.getVideos().then(setVideos);
  }, []);

  const columns = [
    { key: 'title', label: 'Titlu Emisiune Video' },
    { key: 'provider', label: 'Provider', width: '150px' },
    { key: 'category', label: 'Categorie', width: '150px' },
    { key: 'speaker', label: 'Speaker', width: '180px' },
    { key: 'duration', label: 'Durată', width: '120px' },
    { key: 'actions', label: '', width: '100px' },
  ];

  const renderRow = (v: VideoItem) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 font-bold">{v.title}</td>
      <td className="p-4 uppercase font-mono text-xs text-muted-foreground">{v.provider}</td>
      <td className="p-4 text-muted-foreground text-sm">{v.category}</td>
      <td className="p-4 text-sm font-medium">{v.speakerName}</td>
      <td className="p-4 text-sm font-mono">{v.duration}</td>
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
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">AiX TV CMS</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Gestionează Conținutul Video și Emisiunile TV</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Video Nou
        </button>
      </div>

      <DataTable columns={columns} data={videos} renderRow={renderRow} />
    </div>
  );
}
