import { ShieldOff, FlaskConical, MessageCircleWarning, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PILLARS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: ShieldOff,
    title: "No affiliate bias",
    body: "We link to the best product for you, not the one with the highest commission. If Amazon pays more but Evo has a better deal, you'll find out.",
  },
  {
    Icon: FlaskConical,
    title: "Research-backed",
    body: "Every recommendation is built from manufacturer specs, independent lab tests, and real-world reports from people who actually use the gear.",
  },
  {
    Icon: MessageCircleWarning,
    title: "We call out garbage",
    body: 'If a $300 product isn\'t worth $150, we say so. You\'ll find more "don\'t buy this" in our posts than in any other gear site.',
  },
  {
    Icon: RefreshCw,
    title: "Updated yearly",
    body: "Gear evolves. Every roundup gets re-evaluated each season. We don't leave 4-year-old picks at the top of the page.",
  },
];

export default function EditorialBar() {
  return (
    <section className="border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
            Why trust us
          </p>
          <h2 className="text-2xl md:text-3xl font-black leading-tight">
            The way we work is different.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ Icon, title, body }) => (
            <div key={title} className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
                <Icon size={18} />
              </div>
              <h3 className="font-bold text-sm">{title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
