import { config } from 'dotenv';
config({ path: '.env.local' });

import { CategoryRepository } from '../src/repositories/category.repository';

async function main() {
  const repo = new CategoryRepository();
  const categories = await repo.findAll();
  console.log('=== SUPABASE CATEGORIES MAP ===');
  categories.forEach((c) => {
    console.log(`slug: "${c.slug}" -> id: "${c.id}" (name: "${c.name}")`);
  });
}

main().catch(console.error);
