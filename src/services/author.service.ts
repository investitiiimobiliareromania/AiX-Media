import { AuthorRepository, AuthorRow } from '@/repositories/author.repository';
import { createAuthorSchema, CreateAuthorInput } from '@/lib/validations/author.schema';
import { ValidationError } from '@/lib/errors';

export class AuthorService {
  constructor(private readonly repo = new AuthorRepository()) {}

  async getAuthors(): Promise<AuthorRow[]> {
    return this.repo.findAll();
  }

  async createAuthor(input: CreateAuthorInput): Promise<AuthorRow> {
    const validated = createAuthorSchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid author input', validated.error.format());
    }
    return this.repo.create(validated.data);
  }
}

export const authorService = new AuthorService();
