import { z } from 'zod';

export const videoProviderEnum = z.enum(['youtube', 'vimeo', 'self_hosted']);

export const createVideoSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  provider: videoProviderEnum,
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  category: z.string().min(2),
  duration: z.string().min(1),
  speakerName: z.string().min(2),
  transcript: z.string().optional().nullable(),
  status: z.enum(['Published', 'Draft', 'Archived']).default('Published'),
});

export const chapterSchema = z.object({
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format HH:MM nevalid'),
  title: z.string().min(2),
});

export const createPodcastSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  audioUrl: z.string().url(),
  artworkUrl: z.string().url(),
  category: z.string().min(2),
  duration: z.string().min(1),
  chapters: z.array(chapterSchema).default([]),
  transcript: z.string().optional().nullable(),
  speakers: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(['Published', 'Draft', 'Archived']).default('Published'),
});

export type CreateVideoInput = z.infer<typeof createVideoSchema>;
export type CreatePodcastInput = z.infer<typeof createPodcastSchema>;
