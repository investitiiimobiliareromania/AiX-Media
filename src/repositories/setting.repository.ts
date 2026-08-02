import { Database, Json } from '@/types/database.types';
import { SettingInput } from '@/lib/validations/setting.schema';

export type SettingRow = Database['public']['Tables']['settings']['Row'];

export class SettingRepository {
  async findByKey(key: string): Promise<SettingRow | null> {
    if (!key) return null;
    return null;
  }

  async set(data: SettingInput): Promise<SettingRow> {
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      key: data.key,
      value: data.value as Json,
      description: data.description || null,
      updated_at: now,
    };
  }
}
