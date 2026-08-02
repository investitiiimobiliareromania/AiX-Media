import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mediaService } from "@/services/media.service";
import Link from "next/link";
import { Mic, Play, Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiX Podcasts | Episoade Financiare & Analize de Piață",
  description: "Discuții aprofundate despre credite, real estate, asigurări corporate și strategie financiară.",
};

export default async function PodcastsPage() {
  const podcasts = await mediaService.getPodcasts();
  const featuredPodcast = podcasts[0];
  const latestPodcasts = podcasts.slice(1);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px] bg-background text-foreground">
        {/* Header */}
        <div className="container mx-auto px-4 md:px-6 py-12 border-b border-border">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 block flex items-center gap-1.5">
              <Mic className="w-4 h-4" /> AiX Media Audio Network
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-4">
              AiX Podcasts
            </h1>
            <p className="text-xl text-muted-foreground font-medium text-pretty leading-relaxed">
              Episoade audio aprofundate dedicate investitorilor, antreprenorilor și liderilor din industria financiar-imobiliară.
            </p>
          </div>
        </div>

        {/* Featured Episode */}
        {featuredPodcast && (
          <section className="container mx-auto px-4 md:px-6 py-12 border-b border-border">
            <div className="bg-[#0a0a0a] text-white p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 border border-white/20 flex items-center justify-center font-heading font-black text-4xl shrink-0">
                <Headphones className="w-16 h-16 text-white/40" />
              </div>
              <div className="flex-1 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                  {featuredPodcast.category} • EPISOD RECOMANDAT
                </span>
                <h2 className="text-3xl font-heading font-extrabold leading-tight">
                  <Link href={`/podcast/${featuredPodcast.slug}`} className="hover:underline underline-offset-4">
                    {featuredPodcast.title}
                  </Link>
                </h2>
                <p className="text-white/60 text-sm font-medium leading-relaxed max-w-2xl">
                  {featuredPodcast.description}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link 
                    href={`/podcast/${featuredPodcast.slug}`} 
                    className="bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" /> Ascultă Episodul ({featuredPodcast.duration})
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Episodes List */}
        <section className="container mx-auto px-4 md:px-6 py-16">
          <h2 className="text-3xl font-heading font-black tracking-tight mb-8">Ultimele Episoade</h2>
          <div className="divide-y divide-border border border-border">
            {latestPodcasts.map(pod => (
              <div key={pod.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/20 transition-colors">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 block">{pod.category}</span>
                  <h3 className="font-heading font-bold text-2xl">
                    <Link href={`/podcast/${pod.slug}`} className="hover:underline underline-offset-4">{pod.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-3xl">{pod.description}</p>
                </div>
                <div className="shrink-0 flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-muted-foreground">{pod.duration}</span>
                  <Link href={`/podcast/${pod.slug}`} className="bg-foreground text-background px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors flex items-center gap-1">
                    <Play className="w-3.5 h-3.5 fill-current" /> Ascultă
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
