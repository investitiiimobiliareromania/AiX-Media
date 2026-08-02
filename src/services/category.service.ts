import { CategoryRepository, CategoryRow } from '@/repositories/category.repository';
import { createCategorySchema, updateCategorySchema, CreateCategoryInput, UpdateCategoryInput } from '@/lib/validations/category.schema';
import { ValidationError, NotFoundError } from '@/lib/errors';

export class CategoryService {
  constructor(private readonly repo = new CategoryRepository()) {}

  async getCategoryById(id: string): Promise<CategoryRow> {
    const category = await this.repo.findById(id);
    if (!category) {
      throw new NotFoundError(`Category with ID '${id}' not found`);
    }
    return category;
  }

  async getCategories(): Promise<CategoryRow[]> {
    return this.repo.findAll();
  }

  async createCategory(input: CreateCategoryInput): Promise<CategoryRow> {
    const validated = createCategorySchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid category input', validated.error.format());
    }
    return this.repo.create(validated.data);
  }

  async updateCategory(input: UpdateCategoryInput): Promise<CategoryRow> {
    const validated = updateCategorySchema.safeParse(input);
    if (!validated.success) {
      throw new ValidationError('Invalid category update input', validated.error.format());
    }
    return this.repo.update(validated.data.id, validated.data);
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export const categoryService = new CategoryService();
