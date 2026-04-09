'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Mountain, Waves, Truck, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { unsplashUrl } from '@/lib/banners';

// ─── Video data ────────────────────────────────────────────────────────────────
// youtubeUrl: set to a specific video URL when you have one, otherwise the
// search query URL below guarantees something always plays.

const REELS = [
  {
    id: 'reel-1',
    title: 'Chamonix Powder Lines',
    category: 'Ski & Snowboard',
    duration: '2:14',
    Icon: Mountain,
    color: '#60a5fa',
    youtubeUrl: 'https://www.youtube.com/results?search_query=chamonix+powder+skiing+gopro',
    thumbId: '1551698618-1dfe5d97d256',
    thumbAlt: 'Skier carving through deep powder on an alpine slope',
  },
  {
    id: 'reel-2',
    title: 'Pipeline at 8 Feet',
    category: 'Surfing',
    duration: '1:47',
    Icon: Waves,
    color: '#34d399',
    youtubeUrl: 'https://www.youtube.com/results?search_query=pipeline+surfing+barrel+POV',
    thumbId: '1502680390469-be75c86b636f',
    thumbAlt: 'Surfer inside a massive barrel wave at Pipeline',
  },
  {
    id: 'reel-3',
    title: 'Moab Rim Trail in a Day',
    category: 'Overlanding',
    duration: '3:02',
    Icon: Truck,
    color: '#f97316',
    youtubeUrl: 'https://www.youtube.com/results?search_query=moab+rim+trail+overlanding+4x4',
    thumbId: '1527786356703-4b100091cd2c',
    thumbAlt: '4x4 truck navigating rocky Moab terrain at sunset',
  },
  {
    id: 'reel-4',
    title: 'Whistler BC — Opening Day',
    category: 'Ski & Snowboard',
    duration: '1:58',
    Icon: Mountain,
    color: '#60a5fa',
    youtubeUrl: 'https://www.youtube.com/results?search_query=whistler+opening+day+powder+skiing',
    thumbId: '1519681393784-d120267933ba',
    thumbAlt: 'Skis in deep powder snow at Whistler Blackcomb',
  },
  {
    id: 'reel-5',
    title: 'Malibu Morning Sessions',
    category: 'Surfing',
    duration: '2:31',
    Icon: Waves,
    color: '#34d399',
    youtubeUrl: 'https://www.youtube.com/results?search_query=malibu+surfing+longboard+morning',
    thumbId: '1507525428034-b723cf961d3e',
    thumbAlt: 'Longboarder surfing a perfect wave at Malibu',
  },
  {
    id: 'reel-6',
    title: 'Iceland F-Roads: Unfiltered',
    category: 'Overlanding',
    duration: '4:10',
    Icon: Truck,
    color: '#f97316',
    youtubeUrl: 'https://www.youtube.com/results?search_query=iceland+highland+F+roads+overlanding',
    thumbId: '1533591380348-14193f1de18f',
    thumbAlt: 'Vehicle crossing a river on Iceland highland roads',
  },
];

// ─── Reel Card ─────────────────────────────────────────────────────────────────

function ReelCard({ reel }: { reel: typeof REELS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={reel.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 snap-start relative overflow-hidden rounded-2xl md:rounded-3xl focus:outline-none group block"
      style={{
        width: 'clamp(140px, 38vw, 200px)',
        aspectRatio: '9 / 16',
      }}
      aria-label={`Watch ${reel.title} on YouTube`}
    >
      {/* Thumbnail */}
      <Image
        src={unsplashUrl(reel.thumbId, 600)}
        alt={reel.thumbAlt}
        fill
        sizes="200px"
        className={`object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

      {/* Category badge */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
        style={{ backgroundColor: reel.color + '25', color: reel.color, border: `1px solid ${reel.color}40` }}
      >
        <reel.Icon size={9} />
        {reel.category}
      </div>

      {/* Duration */}
      <div className="absolute top-3 right-3 text-[10px] font-bold text-white/70 bg-black/50 px-1.5 py-0.5 rounded-md">
        {reel.duration}
      </div>

      {/* Play button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-80'}`}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: hovered ? reel.color : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: `2px solid ${hovered ? reel.color : 'rgba(255,255,255,0.3)'}`,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <Play
            size={18}
            fill={hovered ? 'black' : 'white'}
            style={{ color: hovered ? 'black' : 'white', marginLeft: '2px' }}
          />
        </div>
      </div>

      {/* Bottom: title + YouTube link indicator */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-bold leading-snug line-clamp-2 mb-1.5">
          {reel.title}
        </p>
        <div
          className={`flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: reel.color }}
        >
          <ExternalLink size={9} />
          Watch on YouTube
        </div>
      </div>
    </a>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function ReelsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 260 : -260, behavior: 'smooth' });
  };

  return (
    <section className="py-10 md:py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-4 md:px-8 max-w-7xl md:mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[2px] bg-[var(--accent)]" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              On the mountain · In the water · Off the road
            </p>
            <h2 className="text-xl md:text-2xl font-black mt-0.5">Watch it happen.</h2>
          </div>
        </div>

        {/* Desktop arrow controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-2 max-w-7xl md:mx-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}

        {/* Ghost card */}
        <div
          className="shrink-0 snap-start rounded-2xl md:rounded-3xl border border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-2 text-[var(--muted)]"
          style={{ width: 'clamp(140px, 38vw, 200px)', aspectRatio: '9 / 16' }}
        >
          <Play size={22} className="opacity-25" />
          <p className="text-[10px] uppercase tracking-widest text-center px-4 opacity-30 font-semibold leading-relaxed">
            More<br />coming soon
          </p>
        </div>
      </div>

      {/* Mobile hint */}
      <p className="md:hidden text-[10px] uppercase tracking-widest text-[var(--muted)] text-center mt-4 opacity-40">
        Swipe · tap to watch on YouTube
      </p>
    </section>
  );
}
