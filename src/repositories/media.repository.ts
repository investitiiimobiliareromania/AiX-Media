import { VideoItem } from '@/types/media';
import { verifiedVideos } from '@/config/youtube';

export class MediaRepository {
  async getVideos(): Promise<VideoItem[]> {
    return verifiedVideos.map(v => ({
      id: v.id,
      title: v.title,
      slug: v.slug || v.id,
      description: v.description || v.title,
      provider: 'youtube',
      videoUrl: v.embedUrl,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      category: v.category || 'Official',
      duration: v.duration || '0:30',
      speakerName: 'Cristian Văduva',
      transcript: 'Prezentare oficială Cristian Văduva.',
      status: 'Published',
      createdAt: (v.publishedAt || '2026-08-08') + 'T00:00:00Z',
    }));
  }
}
