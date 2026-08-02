import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { EpisodeChapters } from "@/components/media/EpisodeChapters";
import { TranscriptView } from "@/components/media/TranscriptView";
import { mediaService } from "@/services/media.service";
import { generatePodcastEpisodeSchema } from "@/lib/seo-helpers";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    title: `Episod Podcast | AiX Podcasts`,
    description: `Ascultă episodul de podcast pe AiX Media Audio Network.`,
    alternates: {
      canonical: `${domain}/podcast/${slug}`,
    },
  };
}

export default async function SinglePodcastPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const podcast = await mediaService.getPodcastBySlug(slug);

  const jsonLd = generatePodcastEpisodeSchema({
    title: podcast.title,
    description: podcast.description,
    slug: podcast.slug,
    audioUrl: podcast.audioUrl,
    artworkUrl: podcast.artworkUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-[72px] bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2 block">
              {podcast.category} • AiX Podcasts
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4">
              {podcast.title}
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              {podcast.description}
            </p>
          </div>

          {/* Player */}
          <div className="mb-8">
            <AudioPlayer audioUrl={podcast.audioUrl} title={podcast.title} />
          </div>

          {/* Grid for Chapters & Speakers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <EpisodeChapters chapters={podcast.chapters} />
            </div>

            <div className="border border-border p-6 bg-muted/10 h-fit">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                Participanți
              </h4>
              <ul className="space-y-2 text-sm font-bold">
                {podcast.speakers.map((sp, idx) => (
                  <li key={idx} className="text-foreground">• {sp}</li>
                ))}
              </ul>

              {podcast.tags.length > 0 && (
                <>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mt-6 mb-3 pb-2 border-b border-border">
                    Tag-uri
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {podcast.tags.map((tg, idx) => (
                      <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-2.5 py-1">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Transcript Accordion */}
          <TranscriptView transcript={podcast.transcript} />
        </div>
      </main>
      <Footer />
    </>
  );
}
