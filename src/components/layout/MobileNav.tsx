'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Radio, SlidersHorizontal, Compass, Mountain, Waves, Truck, Star, Ruler, ChevronRight } from 'lucide-react';

type Sheet = 'tools' | 'explore' | null;

const TOOLS = [
  { label: 'Ski Length Calculator',   href: '/ski-snowboard/ski-length-calculator/',       desc: 'Find your exact ski length' },
  { label: 'Wetsuit Thickness',        href: '/surfing/wetsuit-thickness-calculator/',       desc: 'Water temp → right mm' },
  { label: 'Live Conditions',          href: '/conditions/',                                  desc: 'Surf swell + snow · updated now' },
];

const CATEGORIES = [
  { label: 'Ski & Snowboard', href: '/ski-snowboard/', Icon: Mountain, color: '#60a5fa' },
  { label: 'Surfing',         href: '/surfing/',        Icon: Waves,    color: '#34d399' },
  { label: 'Overlanding',     href: '/overlanding/',   Icon: Truck,    color: '#f97316' },
  { label: 'Best Gear',       href: '/best-gear/',     Icon: Star,     color: '#e8ff00' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<Sheet>(null);

  // Close on navigation
  useEffect(() => { setSheet(null); }, [pathname]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheet]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggle = (id: Sheet) => setSheet((s) => (s === id ? null : id));

  return (
    <>
      {/* Backdrop */}
      {sheet && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setSheet(null)}
        />
      )}

      {/* Slide-up sheet */}
      <div
        className={`md:hidden fixed left-0 right-0 z-50 bg-[var(--card)] border-t border-[var(--border)] rounded-t-3xl transition-transform duration-300 ease-out will-change-transform ${
          sheet ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          bottom: 0,
          paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-5">
          <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
        </div>

        {sheet === 'explore' && (
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(({ label, href, Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 bg-[var(--background)] border border-[var(--border)] rounded-2xl px-4 py-4 active:scale-95 transition-transform"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: color + '18', color }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-semibold leading-tight">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {sheet === 'tools' && (
          <div className="px-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
              Free Tools
            </p>
            <div className="space-y-2">
              {TOOLS.map(({ label, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between bg-[var(--background)] border border-[var(--border)] rounded-2xl px-4 py-4 active:scale-95 transition-transform"
                >
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--accent)] shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-stretch h-[56px]">

          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
              isActive('/') && sheet === null ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}
          >
            <Home size={20} strokeWidth={isActive('/') && sheet === null ? 2.5 : 1.75} />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </Link>

          {/* Live Conditions */}
          <Link
            href="/conditions/"
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
              isActive('/conditions/') && sheet === null ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}
          >
            <div className="relative">
              <Radio size={20} strokeWidth={isActive('/conditions/') && sheet === null ? 2.5 : 1.75} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            </div>
            <span className="text-[10px] font-medium tracking-wide">Live</span>
          </Link>

          {/* Tools */}
          <button
            onClick={() => toggle('tools')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
              sheet === 'tools' ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}
          >
            <SlidersHorizontal size={20} strokeWidth={sheet === 'tools' ? 2.5 : 1.75} />
            <span className="text-[10px] font-medium tracking-wide">Tools</span>
          </button>

          {/* Explore */}
          <button
            onClick={() => toggle('explore')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
              sheet === 'explore' ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}
          >
            <Compass size={20} strokeWidth={sheet === 'explore' ? 2.5 : 1.75} />
            <span className="text-[10px] font-medium tracking-wide">Explore</span>
          </button>

        </div>
      </nav>
    </>
  );
}
