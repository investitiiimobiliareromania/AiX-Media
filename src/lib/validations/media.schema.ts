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

export type CreateVideoInput = z.infer<typeof createVideoSchema>;
