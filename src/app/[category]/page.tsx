import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, type Category } from '@/types/content';
import { getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/ui/PostCard';
import Banner from '@/components/ui/Banner';
import { CATEGORY_BANNERS } from '@/lib/banners';

interface Props {
  params: Promise<{ category: string }>;
}

const VALID_CATEGORIES = Object.keys(CATEGORIES) as Category[];

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as Category)) return {};

  const cat = CATEGORIES[category as Category];
  return {
    title: cat.label,
    description: cat.description,
    openGraph: { title: `${cat.label} | NakedSlope`, description: cat.description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const cat = category as Category;
  const posts = getPostsByCategory(cat);
  const categoryInfo = CATEGORIES[cat];

  return (
    <>
      <Banner image={CATEGORY_BANNERS[cat]} height="md">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {categoryInfo.label}
        </h1>
        <p className="text-sm text-white/70 max-w-xl">{categoryInfo.description}</p>
      </Banner>

    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted)]">
          First articles dropping soon. Check back or{' '}
          <a href="/" className="text-[var(--accent)] hover:underline">
            see what&apos;s live
          </a>
          .
        </p>
      )}
    </div>
    </>
  );
}
