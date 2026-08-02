import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { TranscriptView } from "@/components/media/TranscriptView";
import { mediaService } from "@/services/media.service";
import { generateVideoObjectSchema } from "@/lib/seo-helpers";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://cristianvaduva.com';
  return {
    title: `Emisiune Video | AiX TV`,
    description: `Urmărește emisiunea video pe AiX TV Network.`,
    alternates: {
      canonical: `${domain}/video/${slug}`,
    },
  };
}

export default async function SingleVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await mediaService.getVideoBySlug(slug);

  const jsonLd = generateVideoObjectSchema({
    title: video.title,
    description: video.description,
    slug: video.slug,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
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
              {video.category} • AiX TV
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4">
              {video.title}
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Multi-provider Player */}
          <VideoPlayer provider={video.provider} videoUrl={video.videoUrl} title={video.title} />

          {/* Details */}
          <div className="py-6 border-b border-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mt-4">
            <span>Speaker / Invitat: <strong className="text-foreground">{video.speakerName}</strong></span>
            <span>Durată: <strong className="text-foreground">{video.duration}</strong></span>
          </div>

          {/* Transcript Accordion */}
          <TranscriptView transcript={video.transcript} />
        </div>
      </main>
      <Footer />
    </>
  );
}
