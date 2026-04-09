'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const TOOLS = [
  {
    label: 'Ski Length Calculator',
    href: '/ski-snowboard/ski-length-calculator/',
    desc: 'Find your ideal ski size',
    category: 'Ski & Snowboard',
  },
  {
    label: 'Wetsuit Thickness Calculator',
    href: '/surfing/wetsuit-thickness-calculator/',
    desc: 'Pick the right wetsuit for your water temp',
    category: 'Surfing',
  },
  // { label: 'Tire PSI Calculator', href: '/overlanding/tire-psi-calculator/', desc: 'Correct airing-down pressure for any tire', category: 'Overlanding' },
];

export default function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 text-sm transition-colors ${
          open ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
      >
        Tools
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50">
          {/* Group by category */}
          {Array.from(new Set(TOOLS.map((t) => t.category))).map((cat) => (
            <div key={cat}>
              <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                {cat}
              </p>
              {TOOLS.filter((t) => t.category === cat).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col px-4 py-3 hover:bg-[var(--background)] transition-colors group"
                >
                  <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">
                    {tool.label}
                  </span>
                  <span className="text-xs text-[var(--muted)] mt-0.5">{tool.desc}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="border-t border-[var(--border)] px-4 py-3">
            <p className="text-[10px] text-[var(--muted)]">More tools coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
