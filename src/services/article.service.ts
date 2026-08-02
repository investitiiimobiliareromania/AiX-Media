import { ArticleRepository, ArticleRow } from '@/repositories/article.repository';
import { createArticleSchema, updateArticleSchema, CreateArticleInput, UpdateArticleInput } from '@/lib/validations/article.schema';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';

export class ArticleService {
  constructor(private readonly repo = new ArticleRepository()) {}

  async getArticleById(id: string): Promise<ArticleRow> {
    const article = await this.repo.findById(id);
    if (!article) {
      throw new NotFoundError(`Article with ID '${id}' not found`);
    }
    return article;
  }

  async getArticleBySlug(slug: string): Promise<ArticleRow> {
    const article = await this.repo.findBySlug(slug);
    if (!article) {
      throw new NotFoundError(`Article with slug '${slug}' not found`);
    }
    return article;
  }

  async getArticles(filter?: { status?: string; categoryId?: string; authorId?: string; search?: string; limit?: number; offset?: number }): Promise<ArticleRow[]> {
    return this.repo.findAll(filter);
  }

  async createArticle(input: CreateArticleInput): Promise<ArticleRow> {
    const validated = createArticleSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid article input', validated.error.format());
    }

    logger.info('Creating article', { slug: validated.data.slug });
    return this.repo.create(validated.data);
  }

  async updateArticle(input: UpdateArticleInput): Promise<ArticleRow> {
    const validated = updateArticleSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid article update input', validated.error.format());
    }

    logger.info('Updating article', { id: validated.data.id });
    return this.repo.update(validated.data.id, validated.data);
  }

  async duplicateArticle(id: string): Promise<ArticleRow> {
    const article = await this.getArticleById(id);
    const duplicatedInput: CreateArticleInput = {
      title: `${article.title} (Copie)`,
      slug: `${article.slug}-copie-${Date.now()}`,
      excerpt: article.excerpt,
      content: article.content,
      cover_image_url: article.cover_image_url,
      category_id: article.category_id,
      author_id: article.author_id,
      status: 'draft',
      seo_title: article.seo_title,
      seo_description: article.seo_description,
      tags: [],
    };
    logger.info('Duplicating article', { originalId: id });
    return this.createArticle(duplicatedInput);
  }

  async scheduleArticle(id: string, publishDate: string): Promise<ArticleRow> {
    logger.info('Scheduling article', { id, publishDate });
    return this.updateArticle({ id, status: 'scheduled', publish_date: publishDate });
  }

  async publishArticle(id: string): Promise<ArticleRow> {
    logger.info('Publishing article', { id });
    return this.updateArticle({ id, status: 'published', publish_date: new Date().toISOString() });
  }

  async unpublishArticle(id: string): Promise<ArticleRow> {
    logger.info('Unpublishing article', { id });
    return this.updateArticle({ id, status: 'draft' });
  }

  async archiveArticle(id: string): Promise<ArticleRow> {
    logger.info('Archiving article', { id });
    return this.updateArticle({ id, status: 'archived' });
  }

  async deleteArticle(id: string): Promise<boolean> {
    logger.info('Deleting article', { id });
    return this.repo.delete(id);
  }
}

export const articleService = new ArticleService();
