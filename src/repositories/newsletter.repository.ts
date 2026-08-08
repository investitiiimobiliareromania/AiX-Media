import { Database } from '@/types/database.types';
import { NewsletterSubscribeInput } from '@/lib/validations/newsletter.schema';
import { createClient } from '@/lib/supabase/client';
import { sendTelegramAlert } from '@/lib/telegram';

export type NewsletterRow = Database['public']['Tables']['newsletters']['Row'];

export class NewsletterRepository {
  private get supabase() {
    return createClient();
  }

  async findByEmail(email: string): Promise<NewsletterRow | null> {
    if (!email) return null;
    try {
      const { data, error } = await this.supabase
        .from('newsletters')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) return null;
      return data as NewsletterRow;
    } catch {
      return null;
    }
  }

  async subscribe(data: NewsletterSubscribeInput): Promise<NewsletterRow> {
    const now = new Date().toISOString();
    const payload = {
      id: crypto.randomUUID(),
      email: data.email,
      status: 'subscribed' as const,
      source: data.source || 'website',
      metadata: null,
      created_at: now,
    };

    try {
      const { data: inserted, error } = await this.supabase
        .from('newsletters')
        .insert([payload])
        .select('*')
        .single();

      // Trigger Telegram notification for newsletter signups
      sendTelegramAlert({
        name: 'Newsletter Subscriber',
        contact: data.email,
        source: data.source || 'website',
        cta: 'Newsletter Subscription',
        message: `Sursă: ${data.source || 'website'}`,
        timestamp: now
      }).catch((err) => console.warn('Newsletter Telegram alert warning:', err));

      if (error || !inserted) {
        return payload as NewsletterRow;
      }
      return inserted as NewsletterRow;
    } catch {
      return payload as NewsletterRow;
    }
  }
}

