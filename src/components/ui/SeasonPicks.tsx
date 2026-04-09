import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { unsplashUrl } from '@/lib/banners';

const PICKS = [
  {
    label: 'Ski & Snowboard',
    headline: 'Best helmets\nof 2026.',
    sub: 'Protection that doesn\'t look like a salad bowl.',
    href: '/ski-snowboard/best-ski-helmets-2026/',
    imageId: '1576858574144-9ae1ebcf5ae5',
    alt: 'Skier on a snowy slope wearing helmet and goggles',
    accent: '#60a5fa',
  },
  {
    label: 'Surfing',
    headline: 'Wetsuits\nthat fit.',
    sub: 'Stop freezing. Start surfing longer.',
    href: '/surfing/',
    imageId: '1502680390469-be75c86b636f',
    alt: 'Surfer paddling out through a breaking wave',
    accent: '#34d399',
  },
  {
    label: 'Overlanding',
    headline: 'Recovery gear\nthat works.',
    sub: 'Tested on trails that don\'t forgive mistakes.',
    href: '/overlanding/',
    imageId: '1533591380348-14193f1de18f',
    alt: 'Off-road 4x4 vehicle on a remote desert trail',
    accent: '#f97316',
  },
];

export default function SeasonPicks() {
  return (
    <section className="py-10 md:py-16 max-w-7xl md:mx-auto">
      <div className="flex items-center justify-between mb-6 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[2px] bg-[var(--accent)]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Gear we stand behind
          </p>
        </div>
      </div>

      {/* Mobile: horizontal snap */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-2">
        {PICKS.map(({ label, headline, sub, href, imageId, alt, accent }) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 w-[80vw] snap-start relative rounded-3xl overflow-hidden h-[65vw] min-h-52 block active:scale-95 transition-transform"
          >
            <Image
              src={unsplashUrl(imageId, 700)}
              alt={alt}
              fill
              sizes="80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full w-fit"
                style={{ color: accent, backgroundColor: accent + '22' }}
              >
                {label}
              </span>
              <h3 className="text-xl font-black text-white leading-tight whitespace-pre-line mb-1">
                {headline}
              </h3>
              <p className="text-xs text-white/60">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 px-8">
        {PICKS.map(({ label, headline, sub, href, imageId, alt, accent }) => (
          <Link
            key={href}
            href={href}
            className="group relative rounded-3xl overflow-hidden h-[420px] block"
          >
            <Image
              src={unsplashUrl(imageId, 800)}
              alt={alt}
              fill
              sizes="33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

            {/* Accent bottom border */}
            <div
              className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: accent }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span
                className="text-[10px] font-bold uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full w-fit"
                style={{ color: accent, backgroundColor: accent + '22' }}
              >
                {label}
              </span>
              <h3 className="text-3xl font-black text-white leading-tight whitespace-pre-line mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                {headline}
              </h3>
              <p className="text-sm text-white/60 mb-5">{sub}</p>

              <div className="flex items-center gap-2 text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{ color: accent }}>
                See picks
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
