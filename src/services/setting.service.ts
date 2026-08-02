import { SettingRepository, SettingRow } from '@/repositories/setting.repository';
import { settingSchema, SettingInput } from '@/lib/validations/setting.schema';
import { ValidationError } from '@/lib/errors';

export class SettingService {
  constructor(private readonly repo = new SettingRepository()) {}

  async getSetting(key: string): Promise<SettingRow | null> {
    return this.repo.findByKey(key);
  }

  async setSetting(input: SettingInput): Promise<SettingRow> {
    const validated = settingSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid setting input', validated.error.format());
    }
    return this.repo.set(validated.data);
  }
}

export const settingService = new SettingService();
