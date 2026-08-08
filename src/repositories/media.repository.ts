import { VideoItem, PodcastItem } from '@/types/media';
import { verifiedVideos } from '@/config/youtube';

export class MediaRepository {
  async getVideos(): Promise<VideoItem[]> {
    return verifiedVideos.map(v => ({
      id: v.id,
      title: v.title,
      slug: v.slug,
      description: v.description,
      provider: 'youtube',
      videoUrl: v.embedUrl,
      thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
      category: v.category,
      duration: v.duration,
      speakerName: 'Cristian Văduva',
      transcript: 'Prezentarea oficială a canalului Cristian Văduva CV despre investiții imobiliare și strategii financiare.',
      status: 'Published',
      createdAt: v.publishedAt + "T00:00:00Z",
    }));
  }

  async getPodcasts(): Promise<PodcastItem[]> {
    return [
      {
        id: 'pod1',
        title: 'Episodul 42: Totul despre Dobânzi & Structurarea Creditelor',
        slug: 'episodul-42-dobanzi-credite',
        description: 'O analiză detaliată a creditelor ipotecare și corporate în peisajul financiar actual.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        artworkUrl: '/podcasts/art-1.jpg',
        category: 'Credite',
        duration: '45:30',
        chapters: [
          { startTime: '00:00', title: 'Introducere și Context Macro' },
          { startTime: '12:15', title: 'ROBOR vs. IRCC: Ce alegem?' },
          { startTime: '30:00', title: 'Strategii de Refinanțare' },
        ],
        transcript: 'Bun venit la episodul 42 al podcast-ului AiX Media. Astăzi vorbim despre credite...',
        speakers: ['Cristian Văduva'],
        tags: ['credite', 'bursa', 'finante'],
        status: 'Published',
        createdAt: '2026-07-22T09:00:00Z',
      },
      {
        id: 'pod2',
        title: 'Episodul 41: Piața de Birouri și Clădiri Verzi',
        slug: 'episodul-41-piata-birouri',
        description: 'Trendurile ESG în dezvoltările imobiliare din România.',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        artworkUrl: '/podcasts/art-2.jpg',
        category: 'Real Estate',
        duration: '38:15',
        chapters: [
          { startTime: '00:00', title: 'Standardele ESG în Imobiliare' },
          { startTime: '18:40', title: 'Evoluția Chiriilor' },
        ],
        transcript: 'În acest episod analizăm piața de spatii comerciale și clădiri verzi...',
        speakers: ['Cristian Văduva'],
        tags: ['real-estate', 'esg', 'investitii'],
        status: 'Published',
        createdAt: '2026-07-15T11:00:00Z',
      },
    ];
  }
}
