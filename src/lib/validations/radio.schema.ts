import { z } from 'zod';

export const streamProviderEnum = z.enum(['icecast', 'azuracast', 'hls', 'mp3']);

export const streamConfigSchema = z.object({
  provider: streamProviderEnum,
  streamUrl: z.string().url('URL nevalid pentru stream-ul radio'),
  stationName: z.string().min(2),
  bitrate: z.number().positive().default(320),
  isLive: z.boolean().default(true),
});

export const createProgramSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  coverImage: z.string().url().optional().nullable(),
  presenterId: z.string().uuid(),
  category: z.string().min(2),
  duration: z.string().min(1),
  status: z.enum(['Published', 'Draft', 'Archived']).default('Published'),
});

export const createPresenterSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z.string().optional().nullable(),
  avatarUrl: z.string().url().optional().nullable(),
  socialLinks: z.record(z.string(), z.string().url()).optional(),
});

export const createScheduleItemSchema = z.object({
  programId: z.string().uuid(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format timp HH:MM nevalid'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format timp HH:MM nevalid'),
  dayOfWeek: z.number().min(0).max(6),
  isLive: z.boolean().default(true),
});

export type StreamConfigInput = z.infer<typeof streamConfigSchema>;
export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type CreatePresenterInput = z.infer<typeof createPresenterSchema>;
export type CreateScheduleItemInput = z.infer<typeof createScheduleItemSchema>;
