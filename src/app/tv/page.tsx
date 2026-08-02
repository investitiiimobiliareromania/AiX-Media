import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mediaService } from "@/services/media.service";
import Link from "next/link";
import { Play, Tv, Video as VideoIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiX TV | Transmisiuni Video & Interviuri Executive",
  description: "Emisiuni TV financiare, analize video imobiliare și interviuri exclusive cu lideri din business.",
};

export default async function TVPage() {
  const videos = await mediaService.getVideos();
  const featuredVideo = videos[0];
  const latestVideos = videos.slice(1);

  const categories = ['Interviuri', 'Business', 'Real Estate', 'Asigurări', 'Credite', 'Investiții'];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px] bg-background text-foreground">
        {/* Header */}
        <div className="container mx-auto px-4 md:px-6 py-12 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 block flex items-center gap-1.5">
                <Tv className="w-4 h-4" /> AiX Television Network
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
                AiX TV Executive
              </h1>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <span key={cat} className="px-4 py-2 border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Video */}
        {featuredVideo && (
          <section className="container mx-auto px-4 md:px-6 py-12 border-b border-border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-[#0a0a0a] text-white p-8 md:p-12 border border-white/10">
              <div className="lg:col-span-2 relative aspect-video bg-muted border border-white/10 flex items-center justify-center overflow-hidden group">
                <div className="w-full h-full bg-[#111] flex items-center justify-center text-white/20 font-heading font-black text-6xl">
                  AiX TV LIVE
                </div>
                <Link 
                  href={`/video/${featuredVideo.slug}`} 
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </Link>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                  {featuredVideo.category} • EDIȚIA RECOMANDATĂ
                </span>
                <h2 className="text-3xl font-heading font-extrabold text-balance leading-tight">
                  <Link href={`/video/${featuredVideo.slug}`} className="hover:underline underline-offset-4">
                    {featuredVideo.title}
                  </Link>
                </h2>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  {featuredVideo.description}
                </p>
                <div className="pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 flex items-center justify-between">
                  <span>Prezentator: {featuredVideo.speakerName}</span>
                  <span>{featuredVideo.duration}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Videos Grid */}
        <section className="container mx-auto px-4 md:px-6 py-16">
          <h2 className="text-3xl font-heading font-black tracking-tight mb-8">Ultimele Emisiuni Video</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestVideos.map(video => (
              <div key={video.id} className="border border-border group hover:border-foreground transition-colors flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video bg-muted border-b border-border flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-white/20 font-heading font-black text-2xl">
                      <VideoIcon className="w-12 h-12" />
                    </div>
                    <Link href={`/video/${video.slug}`} className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </Link>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2 block">{video.category}</span>
                    <h3 className="font-heading font-bold text-xl mb-3 group-hover:underline underline-offset-4">
                      <Link href={`/video/${video.slug}`}>{video.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2">{video.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 text-xs font-bold uppercase tracking-wider text-muted-foreground border-t border-border mt-4 flex items-center justify-between">
                  <span>{video.speakerName}</span>
                  <span>{video.duration}</span>
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
