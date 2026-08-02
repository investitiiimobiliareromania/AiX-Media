import { MediaRepository } from '@/repositories/media.repository';
import { VideoItem, PodcastItem } from '@/types/media';
import { createVideoSchema, createPodcastSchema, CreateVideoInput, CreatePodcastInput } from '@/lib/validations/media.schema';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export class MediaService {
  constructor(private readonly repo = new MediaRepository()) {}

  async getVideos(): Promise<VideoItem[]> {
    return this.repo.getVideos();
  }

  async getVideoBySlug(slug: string): Promise<VideoItem> {
    const videos = await this.getVideos();
    const video = videos.find(v => v.slug === slug);
    if (!video) throw new NotFoundError(`Video with slug '${slug}' not found`);
    return video;
  }

  async createVideo(input: CreateVideoInput): Promise<VideoItem> {
    const validated = createVideoSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid video input', validated.error.format());
    }
    logger.info('Creating Video', { title: validated.data.title });
    return {
      id: crypto.randomUUID(),
      title: validated.data.title,
      slug: validated.data.slug,
      description: validated.data.description,
      provider: validated.data.provider,
      videoUrl: validated.data.videoUrl,
      thumbnailUrl: validated.data.thumbnailUrl,
      category: validated.data.category,
      duration: validated.data.duration,
      speakerName: validated.data.speakerName,
      transcript: validated.data.transcript || undefined,
      status: validated.data.status,
      createdAt: new Date().toISOString(),
    };
  }

  async getPodcasts(): Promise<PodcastItem[]> {
    return this.repo.getPodcasts();
  }

  async getPodcastBySlug(slug: string): Promise<PodcastItem> {
    const podcasts = await this.getPodcasts();
    const podcast = podcasts.find(p => p.slug === slug);
    if (!podcast) throw new NotFoundError(`Podcast episode with slug '${slug}' not found`);
    return podcast;
  }

  async createPodcast(input: CreatePodcastInput): Promise<PodcastItem> {
    const validated = createPodcastSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid podcast input', validated.error.format());
    }
    logger.info('Creating Podcast Episode', { title: validated.data.title });
    return {
      id: crypto.randomUUID(),
      title: validated.data.title,
      slug: validated.data.slug,
      description: validated.data.description,
      audioUrl: validated.data.audioUrl,
      artworkUrl: validated.data.artworkUrl,
      category: validated.data.category,
      duration: validated.data.duration,
      chapters: validated.data.chapters,
      transcript: validated.data.transcript || undefined,
      speakers: validated.data.speakers,
      tags: validated.data.tags,
      status: validated.data.status,
      createdAt: new Date().toISOString(),
    };
  }
}

export const mediaService = new MediaService();
