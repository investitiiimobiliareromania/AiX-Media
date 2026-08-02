import { z } from 'zod';

export const createAuthorSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z.string().max(1000).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  social_links: z.record(z.string(), z.string().url()).optional(),
});

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
