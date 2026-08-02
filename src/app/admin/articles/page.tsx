'use client';

import { useEffect, useState } from "react";
import { cmsService } from "@/services/cms";
import { articleService } from "@/services/article.service";
import { Article } from "@/types/cms";
import { DataTable } from "@/components/admin/DataTable";
import { Pagination } from "@/components/admin/Pagination";
import Link from "next/link";
import { Plus, Edit, Search, Copy, Trash2, Send } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const fetchArticles = () => {
    cmsService.getArticles().then(setArticles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDuplicate = async (id: string) => {
    await articleService.duplicateArticle(id);
    fetchArticles();
  };

  const handlePublish = async (id: string) => {
    await articleService.publishArticle(id);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Sigur dorești să ștergi acest articol?")) {
      await cmsService.deleteArticle(id);
      fetchArticles();
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesStatus = activeStatus === 'All' || article.status === activeStatus;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'title', label: 'Titlu & URL' },
    { key: 'status', label: 'Status', width: '150px' },
    { key: 'author', label: 'Autor', width: '180px' },
    { key: 'date', label: 'Ultima Modificare', width: '160px' },
    { key: 'actions', label: 'Acțiuni', width: '220px' }
  ];

  const renderRow = (article: Article) => (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-4">
        <Link href={`/admin/articles/${article.id}`} className="font-bold hover:underline underline-offset-4 block">
          {article.title}
        </Link>
        <span className="text-xs text-muted-foreground mt-1 block font-mono">/{article.slug}</span>
      </td>
      <td className="p-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 inline-block ${
          article.status === 'Published' ? 'bg-foreground text-background' :
          article.status === 'Scheduled' ? 'bg-blue-600 text-white' :
          article.status === 'Review' ? 'bg-amber-600 text-white' :
          article.status === 'Archived' ? 'bg-zinc-800 text-white' :
          'bg-muted text-muted-foreground border border-border'
        }`}>
          {article.status}
        </span>
      </td>
      <td className="p-4 text-sm font-medium text-muted-foreground">
        {article.author}
      </td>
      <td className="p-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
        {new Date(article.updatedAt).toLocaleDateString()}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3 justify-end">
          <button 
            onClick={() => handlePublish(article.id)} 
            title="Publică"
            className="text-muted-foreground hover:text-emerald-600 transition-colors p-1"
          >
            <Send className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDuplicate(article.id)} 
            title="Duplică"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <Copy className="w-4 h-4" />
          </button>
          <Link 
            href={`/admin/articles/${article.id}`} 
            title="Editează"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => handleDelete(article.id)} 
            title="Șterge"
            className="text-muted-foreground hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const statuses = ['All', 'Draft', 'Review', 'Scheduled', 'Published', 'Archived'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Articole</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Gestionează fluxul publicistic AiX Media</p>
        </div>
        <Link href="/admin/articles/new" className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Articol Nou
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1 border-b md:border-b-0 border-border pb-4 md:pb-0">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => { setActiveStatus(status); setCurrentPage(1); }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                activeStatus === status 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Caută după titlu, slug, autor..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-transparent border border-border pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <DataTable columns={columns} data={paginatedArticles} renderRow={renderRow} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
