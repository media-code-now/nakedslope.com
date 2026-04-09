import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types/content';
import { CATEGORIES } from '@/types/content';
import { getArticleBanner, unsplashUrl } from '@/lib/banners';

export default function FeaturedStory({ post }: { post: Post }) {
  const href = `/${post.category}/${post.slug}/`;
  const banner = getArticleBanner(post.slug, post.category);
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-5 h-[2px] bg-[var(--accent)]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Featured story
        </p>
      </div>

      <Link
        href={href}
        className="group block relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300"
      >
        {/* Mobile layout: image on top */}
        <div className="md:hidden relative h-56 overflow-hidden">
          <Image
            src={unsplashUrl(banner.id, 900)}
            alt={banner.alt}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-black/20 to-transparent" />
        </div>

        {/* Desktop layout: side by side */}
        <div className="md:grid md:grid-cols-[1fr_480px] md:min-h-[480px]">
          {/* Content */}
          <div className="p-7 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    color: '#60a5fa',
                    backgroundColor: '#60a5fa18',
                  }}
                >
                  {CATEGORIES[post.category].label}
                </span>
                <span className="text-[10px] text-[var(--muted)]">{date}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg">
                {post.description}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-7">
              <div className="flex items-center gap-2 bg-[var(--accent)] text-black text-sm font-bold px-5 py-2.5 rounded-xl group-hover:gap-3 transition-all duration-300">
                Read the full review
                <ArrowRight size={15} />
              </div>
              <span className="text-xs text-[var(--muted)]">
                {post.readingTime} min read
              </span>
            </div>
          </div>

          {/* Desktop-only image */}
          <div className="hidden md:block relative overflow-hidden">
            <Image
              src={unsplashUrl(banner.id, 960)}
              alt={banner.alt}
              fill
              sizes="480px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Blend edge with card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--card)] via-transparent to-transparent w-1/4" />
          </div>
        </div>
      </Link>
    </section>
  );
}
