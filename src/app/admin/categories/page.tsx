'use client';

import { useEffect, useState } from "react";
import { cmsService } from "@/services/cms";
import { Category } from "@/types/cms";
import { DataTable } from "@/components/admin/DataTable";
import { Plus, Edit } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    cmsService.getCategories().then(setCategories);
  }, []);

  const columns = [
    { key: 'name', label: 'Nume Categorie' },
    { key: 'slug', label: 'Slug', width: '300px' },
    { key: 'date', label: 'Dată Creare', width: '200px' },
    { key: 'actions', label: '', width: '100px' }
  ];

  const renderRow = (category: Category) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4 font-bold">{category.name}</td>
      <td className="p-4 text-muted-foreground">{category.slug}</td>
      <td className="p-4 text-sm text-muted-foreground font-medium uppercase tracking-wider">
        {new Date(category.createdAt).toLocaleDateString()}
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
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Categorii</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Organizare și Taxonomie</p>
        </div>
        <button className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Categorie Nouă
        </button>
      </div>

      <DataTable columns={columns} data={categories} renderRow={renderRow} />
    </div>
  );
}
