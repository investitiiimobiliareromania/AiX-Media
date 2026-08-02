interface RateLimitStore {
  count: number;
  resetTime: number;
}

export interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

/**
 * Enterprise Rate Limiter with memory store cleanup & Redis adapter interface
 */
export class RateLimiter {
  private memoryStore = new Map<string, RateLimitStore>();

  private cleanupExpired() {
    const now = Date.now();
    for (const [key, entry] of this.memoryStore.entries()) {
      if (now > entry.resetTime) {
        this.memoryStore.delete(key);
      }
    }
  }

  async check(key: string, limit = 60, windowMs = 60000): Promise<{ success: boolean; limit: number; remaining: number }> {
    if (Math.random() < 0.1) {
      this.cleanupExpired();
    }

    const now = Date.now();
    const entry = this.memoryStore.get(key);

    if (!entry || now > entry.resetTime) {
      this.memoryStore.set(key, { count: 1, resetTime: now + windowMs });
      return { success: true, limit, remaining: limit - 1 };
    }

    if (entry.count >= limit) {
      return { success: false, limit, remaining: 0 };
    }

    entry.count += 1;
    return { success: true, limit, remaining: limit - entry.count };
  }
}

export const rateLimiter = new RateLimiter();

