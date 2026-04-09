import Link from "next/link";
import { Waves, Snowflake, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TILES: {
  label: string;
  sublabel: string;
  Icon: LucideIcon;
  metric: string;
  metricLabel: string;
  color: string;
  href: string;
}[] = [
  { label: "Pipeline",      sublabel: "Oahu, HI",          Icon: Waves,     metric: "~6 ft", metricLabel: "avg swell", color: "#34d399", href: "/conditions/" },
  { label: "Breckenridge",  sublabel: "Colorado",           Icon: Snowflake, metric: "live",  metricLabel: "snow data", color: "#93c5fd", href: "/conditions/" },
  { label: "Trestles",      sublabel: "San Clemente, CA",   Icon: Waves,     metric: "~3 ft", metricLabel: "avg swell", color: "#34d399", href: "/conditions/" },
  { label: "Whistler",      sublabel: "BC, Canada",         Icon: Snowflake, metric: "live",  metricLabel: "snow data", color: "#93c5fd", href: "/conditions/" },
];

export default function ConditionsPreview() {
  return (
    <section className="py-10 md:py-16 max-w-7xl md:mx-auto">
      <div className="flex items-end justify-between mb-5 gap-4 px-4 md:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
            Updated every 15 min
          </p>
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
            Live Conditions
          </h2>
        </div>
        <Link
          href="/conditions/"
          className="text-sm font-semibold text-[var(--accent)] hover:underline whitespace-nowrap"
        >
          Open dashboard
        </Link>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 mb-4 pb-1">
        {TILES.map(({ label, sublabel, Icon, metric, metricLabel, color, href }) => (
          <Link
            key={label}
            href={href}
            className="shrink-0 w-44 snap-start bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '18', color }}>
                <Icon size={15} />
              </div>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            </div>
            <p className="font-semibold text-xs leading-tight mb-0.5">{label}</p>
            <p className="text-[10px] text-[var(--muted)] mb-3">{sublabel}</p>
            <p className="font-black text-lg" style={{ color }}>{metric}</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{metricLabel}</p>
          </Link>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-4 gap-3 px-8 mb-6">
        {TILES.map(({ label, sublabel, Icon, metric, metricLabel, color, href }) => (
          <Link
            key={label}
            href={href}
            className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: color + "18", color }}
              >
                <Icon size={16} />
              </div>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            </div>
            <p className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors">
              {label}
            </p>
            <p className="text-[10px] text-[var(--muted)] mb-3">{sublabel}</p>
            <p className="font-black text-xl" style={{ color }}>{metric}</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{metricLabel}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/conditions/"
        className="group flex items-center justify-between bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] rounded-2xl px-6 py-4 transition-colors mx-4 md:mx-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
            <Radio size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm group-hover:text-[var(--accent)] transition-colors">
              Full conditions dashboard
            </p>
            <p className="text-xs text-[var(--muted)]">
              10 surf spots · 10 ski resorts · swell charts · 5-day snow outlook
            </p>
          </div>
        </div>
        <div className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
