import Image from 'next/image';
import { unsplashUrl } from '@/lib/banners';

// All confirmed-working Unsplash IDs
const PHOTOS = [
  { id: '1551698618-1dfe5d97d256', alt: 'Skier carving through powder on a steep alpine slope' },
  { id: '1507525428034-b723cf961d3e', alt: 'Aerial view of ocean waves breaking on a tropical beach' },
  { id: '1527786356703-4b100091cd2c', alt: '4x4 truck on a winding dirt road through mountain terrain' },
  { id: '1519681393784-d120267933ba', alt: 'Skis planted upright in deep powder snow at dusk' },
  { id: '1502680390469-be75c86b636f', alt: 'Surfer paddling out through a clean breaking wave at dawn' },
];

export default function PhotoMosaic() {
  return (
    <section className="py-10 md:py-14">
      {/* Section header */}
      <div className="flex items-center gap-3 px-4 md:px-8 mb-6 max-w-7xl mx-auto">
        <span className="w-5 h-[2px] bg-[var(--muted)]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          From the field
        </p>
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4">
        {PHOTOS.map(({ id, alt }) => (
          <div
            key={id}
            className="shrink-0 w-52 h-64 snap-start relative rounded-2xl overflow-hidden"
          >
            <Image
              src={unsplashUrl(id, 500)}
              alt={alt}
              fill
              sizes="208px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      {/* Desktop: asymmetric mosaic grid */}
      {/* Layout: 3 cols, 2 rows — big left (spans 2 rows), 2 right stacked, then 3 bottom */}
      <div className="hidden md:block px-8 max-w-7xl mx-auto">
        {/* Row A — big + 2 stacked */}
        <div className="grid grid-cols-3 gap-2 h-72 mb-2">
          {/* Big left — spans 2 cols */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl">
            <Image
              src={unsplashUrl(PHOTOS[0].id, 1200)}
              alt={PHOTOS[0].alt}
              fill
              sizes="66vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Right col — top */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={unsplashUrl(PHOTOS[1].id, 600)}
              alt={PHOTOS[1].alt}
              fill
              sizes="33vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Row B — 3 equal */}
        <div className="grid grid-cols-3 gap-2 h-52">
          {PHOTOS.slice(2).map(({ id, alt }) => (
            <div key={id} className="relative overflow-hidden rounded-2xl">
              <Image
                src={unsplashUrl(id, 600)}
                alt={alt}
                fill
                sizes="33vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
