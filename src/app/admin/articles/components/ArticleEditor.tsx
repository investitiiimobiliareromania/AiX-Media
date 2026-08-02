'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EditorField } from "@/components/admin/EditorField";
import { RichEditor } from "@/components/editorial/RichEditor";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { TagInput } from "@/components/admin/TagInput";
import { Article, Category } from "@/types/cms";
import { cmsService } from "@/services/cms";
import { articleService } from "@/services/article.service";
import { ArrowLeft, Save, Copy, Send, Archive } from "lucide-react";
import Link from "next/link";

interface ArticleEditorProps {
  initialData?: Article | null;
}

export function ArticleEditor({ initialData }: ArticleEditorProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Partial<Article>>(
    initialData || {
      title: "",
      slug: "",
      categoryId: "",
      excerpt: "",
      content: "",
      author: "",
      status: "Draft",
      tags: [],
    }
  );

  useEffect(() => {
    cmsService.getCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (newContent: string) => {
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleSave = async () => {
    await cmsService.saveArticle(formData);
    router.push("/admin/articles");
  };

  const handleDuplicate = async () => {
    if (initialData?.id) {
      await articleService.duplicateArticle(initialData.id);
      router.push("/admin/articles");
    }
  };

  const handlePublish = async () => {
    if (initialData?.id) {
      await articleService.publishArticle(initialData.id);
      setFormData(prev => ({ ...prev, status: 'Published' }));
    }
  };

  const handleArchive = async () => {
    if (initialData?.id) {
      await articleService.archiveArticle(initialData.id);
      setFormData(prev => ({ ...prev, status: 'Archived' }));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-border pb-6 gap-4">
        <div className="flex items-center gap-6">
          <Link href="/admin/articles" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-heading font-black tracking-tight">
            {initialData ? "Editează Articolul" : "Articol Nou"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {initialData?.id && (
            <>
              <button 
                onClick={handleDuplicate}
                type="button"
                className="bg-muted text-foreground border border-border px-4 py-3 font-bold text-xs uppercase tracking-widest hover:bg-muted/80 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" /> Duplică
              </button>
              <button 
                onClick={handlePublish}
                type="button"
                className="bg-emerald-600 text-white px-4 py-3 font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Publică
              </button>
              <button 
                onClick={handleArchive}
                type="button"
                className="bg-zinc-800 text-white px-4 py-3 font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 transition-colors flex items-center gap-2"
              >
                <Archive className="w-4 h-4" /> Arhivează
              </button>
            </>
          )}

          <button 
            onClick={handleSave}
            type="button"
            className="bg-foreground text-background px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Salvează
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <EditorField 
            label="Titlu" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Titlul articolului..."
            required
          />
          <EditorField 
            label="Slug (URL)" 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            placeholder="titlul-articolului"
            required
          />
          <EditorField 
            label="Excerpt" 
            name="excerpt" 
            type="textarea"
            value={formData.excerpt} 
            onChange={handleChange} 
            placeholder="Scurt rezumat..."
            required
          />

          {/* Media Cover Image */}
          <MediaUploader 
            value={formData.coverImage || ''} 
            onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))} 
          />

          {/* Rich Content Editor */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Conținut Articol (Rich Editor)
            </label>
            <RichEditor 
              value={formData.content || ''} 
              onChange={handleContentChange} 
            />
          </div>

          {/* Tags */}
          <TagInput 
            tags={formData.tags || []} 
            onChange={handleTagsChange} 
          />
        </div>

        {/* Sidebar Metadata */}
        <div className="bg-muted/30 p-8 border border-border h-fit">
          <h3 className="font-bold font-heading text-xl mb-6 pb-4 border-b border-border">Setări Articol</h3>
          
          <EditorField 
            label="Status" 
            name="status" 
            type="select"
            value={formData.status} 
            onChange={handleChange} 
            options={[
              { value: 'Draft', label: 'Draft' },
              { value: 'Review', label: 'În Review' },
              { value: 'Scheduled', label: 'Programat' },
              { value: 'Published', label: 'Publicat' },
              { value: 'Archived', label: 'Arhivat' },
            ]}
          />

          <EditorField 
            label="Dată Programată / Publicare" 
            name="publishDate" 
            type="date"
            value={formData.publishDate ? formData.publishDate.substring(0, 10) : ''} 
            onChange={handleChange} 
          />

          <EditorField 
            label="Categorie" 
            name="categoryId" 
            type="select"
            value={formData.categoryId} 
            onChange={handleChange} 
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            required
          />

          <EditorField 
            label="Autor" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            placeholder="Numele autorului"
          />

          <h3 className="font-bold font-heading text-xl mb-6 pb-4 border-b border-border mt-12">SEO & Social</h3>

          <EditorField 
            label="SEO Title" 
            name="seoTitle" 
            value={formData.seoTitle} 
            onChange={handleChange} 
            placeholder="Titlu pentru motoarele de căutare"
          />

          <EditorField 
            label="SEO Description" 
            name="seoDescription" 
            type="textarea"
            value={formData.seoDescription} 
            onChange={handleChange} 
            placeholder="Meta description..."
          />
        </div>
      </div>
    </div>
  );
}
