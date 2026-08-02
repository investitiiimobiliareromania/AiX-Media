import { NewsletterRepository, NewsletterRow } from '@/repositories/newsletter.repository';
import { newsletterSubscribeSchema, NewsletterSubscribeInput } from '@/lib/validations/newsletter.schema';
import { ValidationError } from '@/lib/errors';

export class NewsletterService {
  constructor(private readonly repo = new NewsletterRepository()) {}

  async subscribe(input: NewsletterSubscribeInput): Promise<NewsletterRow> {
    const validated = newsletterSubscribeSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid newsletter subscription input', validated.error.format());
    }
    return this.repo.subscribe(validated.data);
  }
}

export const newsletterService = new NewsletterService();
