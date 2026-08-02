'use client';

import { useEffect, useState } from "react";
import { authorService } from "@/services/author.service";
import { AuthorRow } from "@/repositories/author.repository";
import { DataTable } from "@/components/admin/DataTable";
import { UserPlus, Edit } from "lucide-react";

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<AuthorRow[]>([]);

  useEffect(() => {
    authorService.getAuthors().then(setAuthors);
  }, []);

  const columns = [
    { key: 'name', label: 'Nume Autor' },
    { key: 'slug', label: 'Slug', width: '250px' },
    { key: 'date', label: 'Dată Adăugare', width: '200px' },
    { key: 'actions', label: '', width: '100px' }
  ];

  const renderRow = (author: AuthorRow) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 font-bold">{author.name}</td>
      <td className="p-4 text-muted-foreground">/{author.slug}</td>
      <td className="p-4 text-sm text-muted-foreground font-medium uppercase tracking-wider">
        {new Date(author.created_at).toLocaleDateString()}
      </td>
      <td className="p-4 text-right">
        <button className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
          <Edit className="w-4 h-4" /> Edit
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Autori</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Echipa Editorială AiX Media</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Autor Nou
        </button>
      </div>

      <DataTable columns={columns} data={authors} renderRow={renderRow} />
    </div>
  );
}
