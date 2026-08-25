import { createAdminClient } from '../src/lib/supabase/admin';

async function deleteTestArticle() {
  const supabase = createAdminClient();
  console.log('Deleting test article test-slug-12345 from Supabase articles table...');
  const { data, error } = await supabase
    .from('articles')
    .delete()
    .eq('slug', 'test-slug-12345')
    .select();

  if (error) {
    console.error('Error deleting test article:', error);
  } else {
    console.log('Successfully deleted test article:', data);
  }
}

deleteTestArticle().catch(e => console.error(e));
