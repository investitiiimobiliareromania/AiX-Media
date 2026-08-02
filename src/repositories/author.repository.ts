import { Database, Json } from '@/types/database.types';
import { CreateAuthorInput } from '@/lib/validations/author.schema';

export type AuthorRow = Database['public']['Tables']['authors']['Row'];

export class AuthorRepository {
  async findById(id: string): Promise<AuthorRow | null> {
    if (!id) return null;
    return null;
  }

  async findBySlug(slug: string): Promise<AuthorRow | null> {
    if (!slug) return null;
    return null;
  }

  async findAll(): Promise<AuthorRow[]> {
    return [];
  }

  async create(data: CreateAuthorInput): Promise<AuthorRow> {
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      user_id: null,
      name: data.name,
      slug: data.slug,
      bio: data.bio || null,
      avatar_url: data.avatar_url || null,
      social_links: (data.social_links as Json) || null,
      created_at: now,
      updated_at: now,
    };
  }
}
