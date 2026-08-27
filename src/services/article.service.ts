import { ArticleRepository, ArticleRow } from '@/repositories/article.repository';
import { getFallbackImage } from '@/lib/fallbackImage';
import { isValidImageUrl } from '@/lib/image-validator';
import { createArticleSchema, updateArticleSchema, CreateArticleInput, UpdateArticleInput } from '@/lib/validations/article.schema';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { articles as fallbackArticles } from '@/lib/media/mock-db';
import { verifiedNewsArticles } from '@/lib/news-service';
import { Article } from '@/lib/media/models/article';
import { normalizeArticleString } from '@/lib/article-normalizer';

import { RECOVERED_PUBLISHER_IMAGES } from '@/lib/publisher-image-map';

export class ArticleService {
  constructor(private readonly repo = new ArticleRepository()) {}

  private resolveCoverImage(row: ArticleRow): string {
    if (row.slug in RECOVERED_PUBLISHER_IMAGES) {
      const mapped = RECOVERED_PUBLISHER_IMAGES[row.slug];
      if (mapped && isValidImageUrl(mapped)) {
        return mapped;
      }
      return getFallbackImage(row.slug);
    }

    const raw = row.cover_image_url;
    if (raw && !raw.includes('photo-1486406146926-c627a92ad1ab') && isValidImageUrl(raw)) {
      return raw;
    }

    return getFallbackImage(row.slug);
  }

  async getPublishedArticles(limit = 200): Promise<Article[]> {
    try {
      const rows = await this.repo.findAll({ status: 'published', limit });
      if (rows && rows.length > 0) {
        const cleanRows = rows.filter(
          (row) =>
            row.slug !== 'test-slug-12345' &&
            row.title.toLowerCase() !== 'test' &&
            !row.slug.startsWith('test-')
        );
        return cleanRows.map((row) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          category: (row.category_id as Article['category']) || 'news',
          categoryLabel: 'Știri & Analize',
          authorId: row.author_id || 'aix-editorial',
          authorName: 'AiX Media Editorial Desk',
          authorAvatar: '/fallbacks/fallback-0.jpg',
          authorRole: 'Redacția Economică',
          excerpt: row.excerpt,
          content: normalizeArticleString(row.content),
          coverImage: this.resolveCoverImage(row),
          publishedAt: row.publish_date ? row.publish_date.split('T')[0]! : row.created_at.split('T')[0]!,
          readTime: row.read_time || '4 min read',
          views: row.view_count || 100,
          featured: true,
          trending: true,
        }));
      }
    } catch (err) {
      logger.error('Failed to fetch published articles from Supabase, falling back to local dataset', err);
    }
    return fallbackArticles;
  }

  async getBusinessArticles(limit = 200): Promise<Article[]> {
    const allArticles = await this.getPublishedArticles(limit);

    const businessKeywords = [
      'compan', 'afacer', 'bussines', 'business', 'firma', 'firme', 'venit', 'profit',
      'cifra', 'tranzact', 'investit', 'm&a', 'bvb', 'banca', 'banc', 'retail', 'magazin',
      'supermarket', 'hipermarket', 'lidl', 'kaufland', 'globus', 'strabag', 'construct',
      'imobiliar', 'energie', 'fotovoltaic', 'solar', 'centrale', 'masin', 'auto', 'lepas',
      'byd', 'pesa', 'cfr', 'aeroport', 'port', 'nava', 'tehnologi', 'startup', 'data center',
      'centre de date', 'salari', 'buget', 'fiscal', 'taxe', 'patron', 'turis', 'insolvent',
      'sabotaj', 'fabrica', 'uzina', 'producat', 'amcham', 'unicredit', 'libra', 'cnair', 'rabla'
    ];

    const excludeKeywords = [
      'sons of anarchy', 'placido domingo', 'mungiu', 'vipera', 'cutremur', 'putin a mers', 'actorii din serialul'
    ];

    return allArticles.filter((art) => {
      if (art.category === 'business' || art.category === 'finance') {
        return true;
      }
      const text = `${art.title} ${art.excerpt} ${art.slug}`.toLowerCase();
      if (excludeKeywords.some((ex) => text.includes(ex))) {
        return false;
      }
      return businessKeywords.some((kw) => text.includes(kw));
    });
  }

  async getPublishedArticleBySlug(slug: string): Promise<Article | undefined> {
    try {
      const row = await this.repo.findBySlug(slug);
      if (row) {
        return {
          id: row.id,
          title: row.title,
          slug: row.slug,
          category: (row.category_id as Article['category']) || 'news',
          categoryLabel: 'Știri & Analize',
          authorId: row.author_id || 'aix-editorial',
          authorName: 'AiX Media Editorial Desk',
          authorAvatar: '/fallbacks/fallback-0.jpg',
          authorRole: 'Redacția Economică',
          excerpt: row.excerpt,
          content: normalizeArticleString(row.content),
          coverImage: this.resolveCoverImage(row),
          publishedAt: row.publish_date ? row.publish_date.split('T')[0]! : row.created_at.split('T')[0]!,
          readTime: row.read_time || '4 min read',
          views: row.view_count || 100,
          featured: true,
          trending: true,
        };
      }
    } catch (err) {
      logger.error(`Failed to fetch article by slug '${slug}' from Supabase, checking fallback`, err);
    }
    const foundFallback = fallbackArticles.find((art) => art.slug === slug);
    if (foundFallback) return foundFallback;

    const foundVerified = verifiedNewsArticles.find((art) => art.slug === slug);
    if (foundVerified) {
      return {
        id: foundVerified.id,
        title: foundVerified.title,
        slug: foundVerified.slug,
        category: foundVerified.category as Article['category'],
        categoryLabel: foundVerified.categoryLabel,
        authorId: 'aix-editorial',
        authorName: foundVerified.author,
        authorAvatar: '/fallbacks/fallback-0.jpg',
        authorRole: foundVerified.authorRole || 'Redacția Economică',
        excerpt: foundVerified.excerpt,
        content: foundVerified.content,
        coverImage: foundVerified.image || getFallbackImage(foundVerified.slug),
        publishedAt: foundVerified.publishedAt,
        readTime: foundVerified.readTime || '4 min read',
        views: 150,
        featured: foundVerified.featured ?? true,
        trending: foundVerified.trending ?? true,
      };
    }
    return undefined;
  }

  async getRelatedIntelligenceArticles(
    currentArticle: { id: string; slug: string; category: string; title: string; excerpt?: string; content?: string },
    limit = 3
  ): Promise<Article[]> {
    const allArticles = await this.getPublishedArticles(200);
    const candidates = allArticles.filter(
      (a) => a.id !== currentArticle.id && a.slug !== currentArticle.slug
    );

    const companyKeywords = [
      'banca transilvania', 'tlv', 'omv petrom', 'snp', 'hidroelectrica', 'h2o',
      'one united properties', 'one', 'romgaz', 'sng', 'bursa de valori bucuresti', 'bvb',
      'nuclearelectrica', 'snn', 'ancpi', 'bnr', 'ins', 'robor', 'ircc', 'dacia', 'dedeman', 'uipath'
    ];

    const currentText = `${currentArticle.title} ${currentArticle.excerpt || ''} ${currentArticle.content || ''}`.toLowerCase();

    const scored = candidates.map((cand) => {
      let score = 0;
      const candText = `${cand.title} ${cand.excerpt} ${cand.content}`.toLowerCase();

      // 1. Shared Category
      if (cand.category === currentArticle.category) {
        score += 30;
      }

      // 2. Shared Company Entity Mentions
      for (const kw of companyKeywords) {
        if (currentText.includes(kw) && candText.includes(kw)) {
          score += 50;
        }
      }

      // 3. Keyword Overlap
      const currentWords = currentText
        .split(/\W+/)
        .filter((w) => w.length > 4 && !['despre', 'pentru', 'conform', 'acest', 'aceste', 'luna', 'anul', 'datele'].includes(w));

      for (const w of currentWords) {
        if (candText.includes(w)) {
          score += 5;
        }
      }

      return { article: cand, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.article);
  }

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

