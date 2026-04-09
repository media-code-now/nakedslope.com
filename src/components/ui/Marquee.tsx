interface MarqueeProps {
  items: string[];
  /** px/s speed — higher = faster */
  speed?: number;
  accent?: boolean;
}

export default function Marquee({ items, accent = false }: MarqueeProps) {
  // Duplicate so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden border-y py-3 ${
        accent
          ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
          : 'bg-[var(--card)] border-[var(--border)] text-[var(--muted)]'
      }`}
      aria-hidden
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className={`text-xs font-bold uppercase tracking-[0.2em] px-6 ${accent ? '' : ''}`}>
              {item}
            </span>
            <span className={`w-1 h-1 rounded-full mx-1 inline-block ${accent ? 'bg-black/30' : 'bg-[var(--border)]'}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
