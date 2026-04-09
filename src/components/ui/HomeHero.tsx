import Image from 'next/image';
import { unsplashUrl, HOME_BANNER } from '@/lib/banners';

export default function HomeHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed photo */}
      <Image
        src={unsplashUrl(HOME_BANNER.id, 2000)}
        alt={HOME_BANNER.alt}
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      {/* Layered gradients — dark bottom, subtle vignette top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto w-full">
        {/* Tagline pill */}
        <div className="fade-up inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            No fluff. Just gear.
          </span>
        </div>

        {/* Display headline — mixed weight for editorial feel */}
        <h1 className="fade-up fade-up-delay-1 text-[clamp(2.8rem,8vw,7rem)] font-black leading-[0.92] tracking-tight mb-6 max-w-4xl">
          <span className="text-white">Honest</span>
          <br />
          <span className="text-white">gear for</span>
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #e8ff00 0%, #a8d400 100%)',
            }}
          >
            real terrain.
          </span>
        </h1>

        {/* Descriptor row */}
        <div className="fade-up fade-up-delay-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50 mb-10">
          {['Ski & Snowboard', 'Surfing', 'Overlanding'].map((cat, i) => (
            <span key={cat} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/20">·</span>}
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">Scroll</span>
        <div className="w-4 h-4 border-r-2 border-b-2 border-white/30 animate-caret" />
      </div>

      {/* Photo credit */}
      <a
        href={HOME_BANNER.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-4 text-[10px] text-white/20 hover:text-white/50 transition-colors z-10"
        tabIndex={-1}
      >
        {HOME_BANNER.credit} / Unsplash
      </a>
    </section>
  );
}
