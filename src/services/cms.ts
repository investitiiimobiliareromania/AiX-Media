import { Article, Category, DashboardMetrics } from '@/types/cms';
import { articleService } from './article.service';
import { categoryService } from './category.service';
import { createArticleSchema } from '@/lib/validations/article.schema';

export const cmsService = {
  // Articles
  async getArticles(): Promise<Article[]> {
    const articles = await articleService.getArticles();
    return articles.map(a => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      categoryId: a.category_id || '',
      excerpt: a.excerpt,
      content: a.content,
      author: a.author_id || 'Cristian Văduva',
      tags: [],
      status: a.status === 'published' ? 'Published' : a.status === 'review' ? 'Review' : a.status === 'scheduled' ? 'Scheduled' : a.status === 'archived' ? 'Archived' : 'Draft',
      publishDate: a.publish_date || undefined,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));
  },

  async getArticleById(id: string): Promise<Article | null> {
    try {
      const a = await articleService.getArticleById(id);
      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        categoryId: a.category_id || '',
        excerpt: a.excerpt,
        content: a.content,
        author: a.author_id || 'Cristian Văduva',
        tags: [],
        status: a.status === 'published' ? 'Published' : a.status === 'review' ? 'Review' : a.status === 'scheduled' ? 'Scheduled' : a.status === 'archived' ? 'Archived' : 'Draft',
        publishDate: a.publish_date || undefined,
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      };
    } catch {
      return null;
    }
  },

  async saveArticle(input: Partial<Article>): Promise<Article> {
    const validated = createArticleSchema.safeParse({
      title: input.title || 'Draft Article',
      slug: input.slug || `article-${Date.now()}`,
      excerpt: input.excerpt || 'Scurt rezumat articol',
      content: input.content || 'Conținut articol...',
      status: (input.status?.toLowerCase() || 'draft') as 'draft' | 'review' | 'scheduled' | 'published' | 'archived',
      tags: input.tags || [],
      author_id: undefined,
      category_id: input.categoryId || undefined,
    });

    if (validated.success) {
      const saved = await articleService.createArticle(validated.data);
      return {
        id: saved.id,
        title: saved.title,
        slug: saved.slug,
        categoryId: saved.category_id || '',
        excerpt: saved.excerpt,
        content: saved.content,
        author: saved.author_id || 'Cristian Văduva',
        tags: [],
        status: saved.status === 'published' ? 'Published' : saved.status === 'review' ? 'Review' : saved.status === 'scheduled' ? 'Scheduled' : saved.status === 'archived' ? 'Archived' : 'Draft',
        publishDate: saved.publish_date || undefined,
        createdAt: saved.created_at,
        updatedAt: saved.updated_at,
      };
    }

    throw new Error('Validare articol eșuată');
  },

  async deleteArticle(id: string): Promise<void> {
    await articleService.deleteArticle(id);
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const categories = await categoryService.getCategories();
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || undefined,
      createdAt: c.created_at,
    }));
  },

  // Dashboard Metrics
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const articles = await articleService.getArticles();
    const categories = await categoryService.getCategories();

    return {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.status === 'published').length,
      draftArticles: articles.filter(a => a.status === 'draft').length,
      totalCategories: categories.length,
    };
  }
};
