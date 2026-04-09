import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/content';
import { CATEGORIES } from '@/types/content';
import { getArticleBanner, unsplashUrl } from '@/lib/banners';

interface PostCardProps {
  post: Post;
  showCategory?: boolean;
}

export default function PostCard({ post, showCategory = false }: PostCardProps) {
  const href = `/${post.category}/${post.slug}/`;
  const banner = getArticleBanner(post.slug, post.category);
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-colors group">
      <Link href={href} className="block">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={unsplashUrl(banner.id, 800)}
            alt={banner.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {showCategory && (
            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-sm text-[var(--accent)] px-2 py-1 rounded">
              {CATEGORIES[post.category].label}
            </span>
          )}
        </div>

        {/* Text */}
        <div className="p-5">
          <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4">{post.description}</p>
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <time dateTime={post.publishedAt}>{date}</time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
            {post.type === 'commercial' && (
              <>
                <span>·</span>
                <span className="text-[var(--accent)]">Gear picks</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
