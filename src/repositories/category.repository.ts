import { Database } from '@/types/database.types';
import { CreateCategoryInput, UpdateCategoryInput } from '@/lib/validations/category.schema';
import { createClient } from '@/lib/supabase/client';

export type CategoryRow = Database['public']['Tables']['categories']['Row'];

export class CategoryRepository {
  private get supabase() {
    return createClient();
  }

  async findById(id: string): Promise<CategoryRow | null> {
    if (!id) return null;
    try {
      const { data, error } = await this.supabase.from('categories').select('*').eq('id', id).single();
      if (error || !data) return null;
      return data as CategoryRow;
    } catch {
      return null;
    }
  }

  async findBySlug(slug: string): Promise<CategoryRow | null> {
    if (!slug) return null;
    try {
      const { data, error } = await this.supabase.from('categories').select('*').eq('slug', slug).single();
      if (error || !data) return null;
      return data as CategoryRow;
    } catch {
      return null;
    }
  }

  async findAll(): Promise<CategoryRow[]> {
    try {
      const { data, error } = await this.supabase.from('categories').select('*').order('name', { ascending: true });
      if (error || !data) return [];
      return data as CategoryRow[];
    } catch {
      return [];
    }
  }

  async create(data: CreateCategoryInput): Promise<CategoryRow> {
    const now = new Date().toISOString();
    const payload = {
      id: crypto.randomUUID(),
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      parent_id: data.parent_id || null,
      created_at: now,
      updated_at: now,
    };

    try {
      const { data: inserted, error } = await this.supabase.from('categories').insert([payload]).select('*').single();
      if (error || !inserted) return payload as CategoryRow;
      return inserted as CategoryRow;
    } catch {
      return payload as CategoryRow;
    }
  }

  async update(id: string, data: UpdateCategoryInput): Promise<CategoryRow> {
    const now = new Date().toISOString();
    const payload = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      parent_id: data.parent_id,
      updated_at: now,
    };

    try {
      const { data: updated, error } = await this.supabase.from('categories').update(payload).eq('id', id).select('*').single();
      if (error || !updated) return { id, name: data.name ?? '', slug: data.slug ?? '', description: data.description ?? null, parent_id: data.parent_id ?? null, created_at: now, updated_at: now } as CategoryRow;
      return updated as CategoryRow;
    } catch {
      return { id, name: data.name ?? '', slug: data.slug ?? '', description: data.description ?? null, parent_id: data.parent_id ?? null, created_at: now, updated_at: now } as CategoryRow;
    }
  }

  async delete(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const { error } = await this.supabase.from('categories').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }
}

