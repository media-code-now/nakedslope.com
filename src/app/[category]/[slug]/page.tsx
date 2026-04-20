import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CATEGORIES, type Category } from '@/types/content';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import AffiliateButton from '@/components/ui/AffiliateButton';
import Banner from '@/components/ui/Banner';
import { getArticleBanner } from '@/lib/banners';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const VALID_CATEGORIES = Object.keys(CATEGORIES) as Category[];

export async function generateStaticParams() {
  return VALID_CATEGORIES.flatMap((category) =>
    getAllSlugs(category).map((slug) => ({ category, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category as Category, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

// MDX components available inside .mdx files
const mdxComponents = {
  AffiliateButton,
};

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;

  if (!VALID_CATEGORIES.includes(category as Category)) notFound();

  const cat = category as Category;
  const post = getPostBySlug(cat, slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const banner = getArticleBanner(post.slug, cat);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [`https://images.unsplash.com/photo-${banner.id}?q=80&w=2000&auto=format&fit=crop`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: 'NakedSlope Editorial',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero banner */}
      <Banner image={banner} height="md">
        <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-3">
          <Link href="/" className="hover:text-white/80">Home</Link>
          {' / '}
          <Link href={`/${category}/`} className="hover:text-white/80">
            {CATEGORIES[cat].label}
          </Link>
        </nav>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2 block">
          {CATEGORIES[cat].label}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-white/50 mt-3">
          <time dateTime={post.publishedAt}>{date}</time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
      </Banner>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Deck */}
        <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed">{post.description}</p>

        {/* Affiliate disclosure */}
        {post.affiliateDisclosure !== false && <AffiliateDisclosure />}

        {/* Content */}
        <div className="prose prose-invert prose-sm md:prose-base max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </>
  );
}
