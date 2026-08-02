import { z } from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Adresa de email nevalidă'),
  source: z.string().optional().default('website'),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
