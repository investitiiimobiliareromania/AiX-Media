import { logger } from './logger';
import { createClient } from './supabase/client';

export interface AuditLogEntry {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditService {
  /**
   * Logs security and admin events for auditability
   */
  static async log(entry: AuditLogEntry): Promise<void> {
    logger.info(`Audit Log: [${entry.action}] on [${entry.resource}]`, {
      userId: entry.userId,
      resourceId: entry.resourceId,
      details: entry.details,
      ipAddress: entry.ipAddress,
    });

    try {
      const supabase = createClient();
      await supabase.from('audit_logs').insert([{
        user_id: entry.userId || null,
        action: entry.action,
        resource: entry.resource,
        resource_id: entry.resourceId || null,
        details: entry.details || {},
        ip_address: entry.ipAddress || null,
        user_agent: entry.userAgent || null,
      }]);
    } catch (error) {
      logger.warn('Failed to persist audit log to Supabase', { error });
    }
  }
}

