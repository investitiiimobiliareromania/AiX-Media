import { z } from 'zod';

export const settingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.unknown(),
  description: z.string().optional().nullable(),
});

export type SettingInput = z.infer<typeof settingSchema>;
