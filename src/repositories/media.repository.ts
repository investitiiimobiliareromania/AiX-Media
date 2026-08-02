import { VideoItem, PodcastItem } from '@/types/media';

export class MediaRepository {
  async getVideos(): Promise<VideoItem[]> {
    return [
      {
        id: 'v1',
        title: 'Interviu Exclusiv: Strategia Imobiliară 2026',
        slug: 'strategia-imobiliara-2026',
        description: 'Discuție televizată despre randamente imobiliare de lux, creditare și dinamica pieței.',
        provider: 'youtube',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: '/tv/thumb-1.jpg',
        category: 'Real Estate',
        duration: '18:45',
        speakerName: 'Cristian Văduva',
        transcript: 'Transcript complet al emisiunii despre investiții imobiliare...',
        status: 'Published',
        createdAt: '2026-07-20T10:00:00Z',
      },
      {
        id: 'v2',
        title: 'Generali Risk Forum: Asigurarea Activelor Valoroase',
        slug: 'generali-risk-forum-2026',
        description: 'Ghid practic pentru optimizarea politicilor de transfer al riscului în companii mari.',
        provider: 'youtube',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: '/tv/thumb-2.jpg',
        category: 'Asigurări',
        duration: '24:10',
        speakerName: 'Cristian Văduva',
        transcript: 'Ghid practic de analiză de risc corporate...',
        status: 'Published',
        createdAt: '2026-07-18T14:00:00Z',
      },
    ];
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
        speakers: ['Cristian Văduva', 'Expert BNR'],
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
