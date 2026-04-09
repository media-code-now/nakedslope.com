import Link from "next/link";
import { Ruler, Waves, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TOOLS: {
  href: string;
  Icon: LucideIcon;
  label: string;
  desc: string;
  tag: string;
  tagColor: string;
  live?: boolean;
}[] = [
  {
    href: "/ski-snowboard/ski-length-calculator/",
    Icon: Ruler,
    label: "Ski Length Calculator",
    desc: "Height + weight + terrain — exact cm range.",
    tag: "Ski & Snowboard",
    tagColor: "#60a5fa",
  },
  {
    href: "/surfing/wetsuit-thickness-calculator/",
    Icon: Waves,
    label: "Wetsuit Thickness Calculator",
    desc: "Water temp + sensitivity — the right mm.",
    tag: "Surfing",
    tagColor: "#34d399",
  },
  {
    href: "/conditions/",
    Icon: Radio,
    label: "Live Conditions",
    desc: "Real-time surf swell + resort snowfall. Updated every 15 min.",
    tag: "Live",
    tagColor: "#e8ff00",
    live: true,
  },
];

export default function ToolsGrid() {
  return (
    <section className="py-10 md:py-16 max-w-7xl md:mx-auto">
      <div className="flex items-end justify-between mb-5 gap-4 px-4 md:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
            Free tools
          </p>
          <h2 className="text-2xl md:text-3xl font-black">
            Stop guessing. Start calculating.
          </h2>
        </div>
        <Link
          href="/conditions/"
          className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
        >
          See all tools
        </Link>
      </div>

      {/* Mobile: horizontal snap carousel */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-2">
        {TOOLS.map(({ href, Icon, label, desc, tag, tagColor, live }) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 w-[78vw] snap-start group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 overflow-hidden active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ color: tagColor, backgroundColor: tagColor + '18' }}
              >
                {tag}
              </span>
              {live && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
            <div className="mb-3 w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center" style={{ color: tagColor }}>
              <Icon size={20} />
            </div>
            <h3 className="font-bold text-sm mb-1.5">{label}</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 px-8">
        {TOOLS.map(({ href, Icon, label, desc, tag, tagColor, live }) => (
          <Link
            key={href}
            href={href}
            className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all duration-300 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,255,0,0.05) 0%, transparent 70%)" }}
            />

            <div className="flex items-center justify-between mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ color: tagColor, backgroundColor: tagColor + "18" }}
              >
                {tag}
              </span>
              {live && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  LIVE
                </span>
              )}
            </div>

            <div className="mb-4 w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
              <Icon size={20} />
            </div>

            <h3 className="font-bold text-base mb-2 group-hover:text-[var(--accent)] transition-colors">
              {label}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Open tool
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
