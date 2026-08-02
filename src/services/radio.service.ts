import { RadioRepository } from '@/repositories/radio.repository';
import { RadioProgram, RadioPresenter, RadioScheduleItem, StreamConfig, AudioTrack } from '@/types/radio';
import { streamConfigSchema, createProgramSchema, StreamConfigInput, CreateProgramInput } from '@/lib/validations/radio.schema';
import { ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export class RadioService {
  constructor(private readonly repo = new RadioRepository()) {}

  async getStreamConfig(): Promise<StreamConfig> {
    return this.repo.getStreamConfig();
  }

  async updateStreamConfig(input: StreamConfigInput): Promise<StreamConfig> {
    const validated = streamConfigSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid stream configuration', validated.error.format());
    }
    logger.info('Updating Radio Stream Config', { provider: validated.data.provider, url: validated.data.streamUrl });
    return {
      provider: validated.data.provider,
      streamUrl: validated.data.streamUrl,
      stationName: validated.data.stationName,
      bitrate: validated.data.bitrate,
      isLive: validated.data.isLive,
    };
  }

  async getPrograms(): Promise<RadioProgram[]> {
    return this.repo.getPrograms();
  }

  async createProgram(input: CreateProgramInput): Promise<RadioProgram> {
    const validated = createProgramSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid radio program input', validated.error.format());
    }
    logger.info('Creating Radio Program', { title: validated.data.title });
    return {
      id: crypto.randomUUID(),
      title: validated.data.title,
      slug: validated.data.slug,
      description: validated.data.description,
      coverImage: validated.data.coverImage || undefined,
      presenterId: validated.data.presenterId,
      presenterName: 'Cristian Văduva',
      category: validated.data.category,
      duration: validated.data.duration,
      status: validated.data.status,
    };
  }

  async getPresenters(): Promise<RadioPresenter[]> {
    return this.repo.getPresenters();
  }

  async getSchedule(): Promise<RadioScheduleItem[]> {
    return this.repo.getSchedule();
  }

  async getAudioTracks(): Promise<AudioTrack[]> {
    return this.repo.getAudioTracks();
  }
}

export const radioService = new RadioService();
