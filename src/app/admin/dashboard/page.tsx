import { cmsService } from "@/services/cms";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const metrics = await cmsService.getDashboardMetrics();
  const articles = await cmsService.getArticles();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Overview</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">AiX Media Publishing</p>
        </div>
        <Link href="/admin/articles/new" className="bg-foreground text-background px-6 py-3 font-bold text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Articol Nou
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="p-6 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Total Articole</p>
          <p className="text-5xl font-heading font-black">{metrics.totalArticles}</p>
        </div>
        <div className="p-6 border border-border bg-foreground text-background">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Publicate</p>
          <p className="text-5xl font-heading font-black">{metrics.publishedArticles}</p>
        </div>
        <div className="p-6 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">Draft-uri</p>
          <p className="text-5xl font-heading font-black">{metrics.draftArticles}</p>
        </div>
        <div className="p-6 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Categorii</p>
          <p className="text-5xl font-heading font-black">{metrics.totalCategories}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6 border-b border-border pb-4">
          <h2 className="text-2xl font-heading font-bold">Activitate Recentă</h2>
          <Link href="/admin/articles" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Vezi Tot
          </Link>
        </div>

        <div className="divide-y divide-border border border-border">
          {articles.map(article => (
            <div key={article.id} className="p-6 flex items-center justify-between group hover:bg-muted/30 transition-colors">
              <div>
                <Link href={`/admin/articles/${article.id}`} className="font-bold text-lg group-hover:underline underline-offset-4 mb-1 block">
                  {article.title}
                </Link>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="uppercase tracking-widest">{new Date(article.updatedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 ${
                  article.status === 'Published' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground border border-border'
                }`}>
                  {article.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
