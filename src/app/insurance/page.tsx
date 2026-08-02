import { Metadata } from 'next';
import { CategoryHero } from '@/components/editorial/CategoryHero';
import { ArticleGrid } from '@/components/editorial/ArticleGrid';
import { NewsletterBlock } from '@/components/editorial/NewsletterBlock';
import { articleService } from '@/services/article.service';
import { categoryBySlug } from '@/constants/categories';
import { ArticleRow } from '@/repositories/article.repository';

const slug = 'insurance';
const category = categoryBySlug[slug];

export const metadata: Metadata = {
  title: `${category.label} Intelligence`,
  description: category.description,
  alternates: { canonical: `/${slug}` },
  openGraph: { title: `${category.label} Intelligence`, description: category.description, type: 'website' },
  twitter: { card: 'summary_large_image', title: `${category.label} Intelligence`, description: category.description },
};

interface GridArticle {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  author?: string;
  readTime?: string;
}

function mapArticle(row: ArticleRow): GridArticle {
  return {
    category: category.label,
    title: row.title ?? '',
    excerpt: row.excerpt ?? '',
    date: row.publish_date ?? '',
    href: `/news/${row.slug}`,
    author: row.author_id ?? undefined,
    readTime: row.read_time ? `${row.read_time} min` : undefined,
  };
}

export default async function InsurancePage() {
  const rows = await articleService.getArticles({ categoryId: slug });
  const articles = rows.map(mapArticle);

  return (
    <>
      <CategoryHero title={category.label} description={category.description} />
      {articles.length ? (
        <ArticleGrid articles={articles} />
      ) : (
        <section className="py-16 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-foreground">Coming Soon</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our analysts are preparing exclusive insights, market analysis and intelligence reports for this category.
          </p>
        </section>
      )}
      <NewsletterBlock />
    </>
  );
}
