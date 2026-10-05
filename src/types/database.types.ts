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

export type Database = {
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
      visitors: {
        Row: {
          visitor_id: string
          first_seen: string
          last_seen: string
          visit_count: number
          session_count: number
          first_source: string | null
          last_source: string | null
          first_landing_page: string | null
          last_landing_page: string | null
          country: string | null
          region: string | null
          city: string | null
          language: string | null
          timezone: string | null
          device_type: string | null
          os: string | null
          browser: string | null
          screen: string | null
          lead_status: string | null
          primary_interest: string | null
          secondary_interest: string | null
          engagement_level: string | null
          intent_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          visitor_id: string
          first_seen?: string
          last_seen?: string
          visit_count?: number
          session_count?: number
          first_source?: string | null
          last_source?: string | null
          first_landing_page?: string | null
          last_landing_page?: string | null
          country?: string | null
          region?: string | null
          city?: string | null
          language?: string | null
          timezone?: string | null
          device_type?: string | null
          os?: string | null
          browser?: string | null
          screen?: string | null
          lead_status?: string | null
          primary_interest?: string | null
          secondary_interest?: string | null
          engagement_level?: string | null
          intent_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          visitor_id?: string
          first_seen?: string
          last_seen?: string
          visit_count?: number
          session_count?: number
          first_source?: string | null
          last_source?: string | null
          first_landing_page?: string | null
          last_landing_page?: string | null
          country?: string | null
          region?: string | null
          city?: string | null
          language?: string | null
          timezone?: string | null
          device_type?: string | null
          os?: string | null
          browser?: string | null
          screen?: string | null
          lead_status?: string | null
          primary_interest?: string | null
          secondary_interest?: string | null
          engagement_level?: string | null
          intent_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          session_id: string
          visitor_id: string | null
          started_at: string
          last_activity_at: string
          duration_seconds: number
          landing_page: string | null
          last_route: string | null
          source: string | null
          medium: string | null
          campaign: string | null
          referrer: string | null
          country: string | null
          city: string | null
          device_type: string | null
          os: string | null
          browser: string | null
          page_count: number
          event_count: number
          max_scroll_depth: number
          engagement_level: string | null
          intent_level: string | null
          primary_interest: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          session_id: string
          visitor_id?: string | null
          started_at?: string
          last_activity_at?: string
          duration_seconds?: number
          landing_page?: string | null
          last_route?: string | null
          source?: string | null
          medium?: string | null
          campaign?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          os?: string | null
          browser?: string | null
          page_count?: number
          event_count?: number
          max_scroll_depth?: number
          engagement_level?: string | null
          intent_level?: string | null
          primary_interest?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          session_id?: string
          visitor_id?: string | null
          started_at?: string
          last_activity_at?: string
          duration_seconds?: number
          landing_page?: string | null
          last_route?: string | null
          source?: string | null
          medium?: string | null
          campaign?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
          os?: string | null
          browser?: string | null
          page_count?: number
          event_count?: number
          max_scroll_depth?: number
          engagement_level?: string | null
          intent_level?: string | null
          primary_interest?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      visitor_events: {
        Row: {
          id: string
          event_id: string | null
          session_id: string | null
          visitor_id: string | null
          event_type: string
          route: string
          category: string | null
          content_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          session_id?: string | null
          visitor_id?: string | null
          event_type: string
          route: string
          category?: string | null
          content_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          session_id?: string | null
          visitor_id?: string | null
          event_type?: string
          route?: string
          category?: string | null
          content_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      visitor_leads: {
        Row: {
          id: string
          visitor_id: string | null
          session_id: string | null
          name: string
          contact: string
          message: string | null
          source_context: string | null
          page_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          visitor_id?: string | null
          session_id?: string | null
          name: string
          contact: string
          message?: string | null
          source_context?: string | null
          page_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          visitor_id?: string | null
          session_id?: string | null
          name?: string
          contact?: string
          message?: string | null
          source_context?: string | null
          page_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }

    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      article_status: ArticleStatus
      newsletter_status: NewsletterStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
