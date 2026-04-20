import Image from 'next/image';
import Link from 'next/link';
import { unsplashUrl, type BannerImage } from '@/lib/banners';

interface CategoryPanelProps {
  label: string;
  description: string;
  href: string;
  image: BannerImage;
  /** Index used for staggered entrance animation */
  index?: number;
}

const DELAY = ['fade-up-delay-1', 'fade-up-delay-2', 'fade-up-delay-3', 'fade-up-delay-4'];

export default function CategoryPanel({
  label,
  description,
  href,
  image,
  index = 0,
}: CategoryPanelProps) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-2xl h-80 md:h-96 fade-up ${DELAY[index % 4]}`}
    >
      {/* Photo */}
      <Image
        src={unsplashUrl(image.id, 900)}
        alt={image.alt || label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Always-on gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

      {/* Accent bar — grows from left on hover */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--accent)] transition-all duration-500 ease-out group-hover:w-full" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)] mb-2">
          {label}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-0 group-hover:mb-3 transition-all duration-300">
          {label}
        </h3>

        {/* Description slides up on hover */}
        <p className="text-sm text-white/70 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-400 ease-out">
          {description}
        </p>

        <span className="mt-3 text-xs font-semibold text-[var(--accent)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
          Explore →
        </span>
      </div>
    </Link>
  );
}
