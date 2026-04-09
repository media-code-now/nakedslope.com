const STATS = [
  { value: "1,200+", label: "Gear items tested" },
  { value: "3",      label: "Categories covered" },
  { value: "0",      label: "Sponsored posts" },
  { value: "100%",   label: "Independent reviews" },
];

export default function StatsBar() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1">
            <span className="text-4xl md:text-5xl font-black text-[var(--accent)] tabular-nums leading-none">
              {value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
