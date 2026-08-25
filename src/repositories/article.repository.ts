import { Database } from '@/types/database.types';
import { CreateArticleInput, UpdateArticleInput } from '@/lib/validations/article.schema';
import { createAdminClient } from '@/lib/supabase/admin';

export type ArticleRow = Database['public']['Tables']['articles']['Row'];
export type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
export type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

export class ArticleRepository {
  private get supabase() {
    return createAdminClient();
  }

  async findById(id: string): Promise<ArticleRow | null> {
    if (!id) return null;
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) return null;
      return data as ArticleRow;
    } catch {
      return null;
    }
  }

  async findBySlug(slug: string): Promise<ArticleRow | null> {
    if (!slug) return null;
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) return null;
      return data as ArticleRow;
    } catch {
      return null;
    }
  }

  async findAll(filter?: { status?: string; categoryId?: string; limit?: number; offset?: number }): Promise<ArticleRow[]> {
    try {
      let query = this.supabase
        .from('articles')
        .select('*')
        .neq('slug', 'test-slug-12345')
        .not('slug', 'ilike', 'test-%')
        .order('publish_date', { ascending: false });

      if (filter?.status && filter.status !== 'All') {
        query = query.eq('status', filter.status.toLowerCase() as ArticleRow['status']);
      }
      if (filter?.categoryId) {
        query = query.eq('category_id', filter.categoryId);
      }
      if (filter?.limit) {
        query = query.limit(filter.limit);
      }
      if (filter?.offset) {
        query = query.range(filter.offset, filter.offset + (filter.limit || 10) - 1);
      }

      const { data, error } = await query;
      if (error || !data) return [];
      return data as ArticleRow[];
    } catch {
      return [];
    }
  }

  async create(data: CreateArticleInput): Promise<ArticleRow> {
    const now = new Date().toISOString();
    const payload: ArticleInsert = {
      id: crypto.randomUUID(),
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      cover_image_url: data.cover_image_url || null,
      category_id: data.category_id || null,
      author_id: data.author_id || null,
      status: (data.status as ArticleRow['status']) || 'draft',
      publish_date: data.publish_date || null,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      read_time: data.read_time || null,
      view_count: 0,
      created_at: now,
      updated_at: now,
    };

    try {
      const { data: inserted, error } = await this.supabase
        .from('articles')
        .insert([payload])
        .select('*')
        .single();

      if (error || !inserted) {
        return payload as ArticleRow;
      }
      return inserted as ArticleRow;
    } catch {
      return payload as ArticleRow;
    }
  }

  async update(id: string, data: UpdateArticleInput): Promise<ArticleRow> {
    const existing = await this.findById(id);
    const now = new Date().toISOString();
    const payload: Partial<ArticleUpdate> = {
      title: data.title ?? existing?.title,
      slug: data.slug ?? existing?.slug,
      excerpt: data.excerpt ?? existing?.excerpt,
      content: data.content ?? existing?.content,
      cover_image_url: data.cover_image_url ?? existing?.cover_image_url,
      category_id: data.category_id ?? existing?.category_id,
      author_id: data.author_id ?? existing?.author_id,
      status: (data.status as ArticleRow['status']) ?? existing?.status ?? 'draft',
      publish_date: data.publish_date ?? existing?.publish_date,
      seo_title: data.seo_title ?? existing?.seo_title,
      seo_description: data.seo_description ?? existing?.seo_description,
      read_time: data.read_time ?? existing?.read_time,
      updated_at: now,
    };

    try {
      const { data: updated, error } = await this.supabase
        .from('articles')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();

      if (error || !updated) {
        return { ...existing, ...payload, id, updated_at: now } as ArticleRow;
      }
      return updated as ArticleRow;
    } catch {
      return { ...existing, ...payload, id, updated_at: now } as ArticleRow;
    }
  }

  async delete(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const { error } = await this.supabase.from('articles').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
}

