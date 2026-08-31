import { MediaRepository } from '@/repositories/media.repository';
import { VideoItem } from '@/types/media';
import { createVideoSchema, CreateVideoInput } from '@/lib/validations/media.schema';
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
}

export const mediaService = new MediaService();
