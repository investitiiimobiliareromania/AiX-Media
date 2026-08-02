export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'user';
export type ArticleStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';
export type NewsletterStatus = 'subscribed' | 'unsubscribed';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      authors: {
        Row: {
          id: string
          user_id: string | null
          name: string
          slug: string
          bio: string | null
          avatar_url: string | null
          social_links: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          slug: string
          bio?: string | null
          avatar_url?: string | null
          social_links?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          slug?: string
          bio?: string | null
          avatar_url?: string | null
          social_links?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image_url: string | null
          category_id: string | null
          author_id: string | null
          status: ArticleStatus
          publish_date: string | null
          seo_title: string | null
          seo_description: string | null
          read_time: string | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          status?: ArticleStatus
          publish_date?: string | null
          seo_title?: string | null
          seo_description?: string | null
          read_time?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          category_id?: string | null
          author_id?: string | null
          status?: ArticleStatus
          publish_date?: string | null
          seo_title?: string | null
          seo_description?: string | null
          read_time?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      media: {
        Row: {
          id: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          bucket: string
          alt_text: string | null
          metadata: Json | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          bucket?: string
          alt_text?: string | null
          metadata?: Json | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          bucket?: string
          alt_text?: string | null
          metadata?: Json | null
          uploaded_by?: string | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
        }
      }
      newsletters: {
        Row: {
          id: string
          email: string
          status: NewsletterStatus
          source: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          status?: NewsletterStatus
          source?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          status?: NewsletterStatus
          source?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
  }
}
