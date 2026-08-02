import { z } from 'zod';

export const articleStatusSchema = z.enum(['draft', 'review', 'scheduled', 'published', 'archived']);

export const createArticleSchema = z.object({
  title: z.string().min(3, 'Titlul trebuie să aibă cel puțin 3 caractere').max(255),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug-ul trebuie să conțină doar litere mici, cifre și cratime'),
  excerpt: z.string().min(10, 'Excerpt-ul trebuie să aibă cel puțin 10 caractere'),
  content: z.string().min(20, 'Conținutul trebuie să aibă cel puțin 20 caractere'),
  cover_image_url: z.string().url('URL nevalid pentru imagine').optional().nullable(),
  category_id: z.string().uuid('ID categorie nevalid').optional().nullable(),
  author_id: z.string().uuid('ID autor nevalid').optional().nullable(),
  status: articleStatusSchema.default('draft'),
  publish_date: z.string().optional().nullable(),
  seo_title: z.string().max(100).optional().nullable(),
  seo_description: z.string().max(255).optional().nullable(),
  read_time: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
});

export const updateArticleSchema = createArticleSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
