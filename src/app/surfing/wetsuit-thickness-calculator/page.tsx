import type { Metadata } from 'next';
import Link from 'next/link';
import WetsuitCalculator from '@/components/tools/WetsuitCalculator';
import Banner from '@/components/ui/Banner';
import { TOOL_BANNERS } from '@/lib/banners';

export const metadata: Metadata = {
  title: 'Wetsuit Thickness Calculator — What MM Wetsuit Do I Need?',
  description:
    'Enter your water temperature and get the exact wetsuit thickness you need. Accounts for cold sensitivity and session length. Free wetsuit size guide.',
  keywords: [
    'wetsuit thickness calculator',
    'what mm wetsuit do I need',
    'wetsuit thickness guide',
    'wetsuit water temperature chart',
    'how thick should my wetsuit be',
  ],
  openGraph: {
    title: 'Wetsuit Thickness Calculator | NakedSlope',
    description:
      'Stop guessing your wetsuit thickness. Enter your water temp, cold tolerance, and session length — get an exact recommendation.',
    type: 'website',
  },
};

const FAQ = [
  {
    q: 'What wetsuit thickness do I need for 60°F water?',
    a: 'At 60°F (15°C) you need a 3/2mm full suit at minimum. If you run cold or plan a long session, go up to a 4/3mm. 3mm boots are optional but recommended in sustained exposure.',
  },
  {
    q: 'What does 3/2mm mean on a wetsuit?',
    a: 'The two numbers refer to the neoprene thickness in different panels. 3/2mm means 3mm on the core (chest and back) for warmth, and 2mm on the arms and legs for flexibility. Thicker core = warmer. Thinner limbs = easier to paddle.',
  },
  {
    q: 'Does water temperature or air temperature determine wetsuit choice?',
    a: 'Water temperature. Air temperature affects how cold you feel getting in and out, but neoprene insulates against water, not air. Always base your wetsuit choice on water temp. Air temp matters more for choosing a wind-resistant rash guard on top.',
  },
  {
    q: 'How cold is too cold to surf without a wetsuit?',
    a: 'Below 70°F (21°C) most people benefit from at least a thin wetsuit. Below 60°F (15°C), surfing without a wetsuit risks hypothermia within 30–60 minutes. Below 50°F (10°C) you need a full suit, boots, gloves, and hood — no exceptions.',
  },
  {
    q: 'Does session length affect what wetsuit I need?',
    a: 'Yes, significantly. Your core temperature drops over time in cold water. A 1-hour session in 58°F water might be fine in a 3/2mm, but a 3-hour session in the same water warrants a 4/3mm. Our calculator adjusts for this.',
  },
  {
    q: 'Should I size up if I run cold?',
    a: 'Yes — both in thickness and in fit. A wetsuit that flushes cold water constantly is worse than a thicker suit. Make sure the neck, wrists, and ankles seal properly. Our calculator applies a 6°F effective-temp adjustment for cold-sensitive surfers.',
  },
];

const TEMP_REFERENCE = [
  { range: '> 72°F / 22°C', thickness: 'Boardshorts or rash guard', color: '#22c55e' },
  { range: '68–72°F / 20–22°C', thickness: '1–2mm shorty or spring suit', color: '#84cc16' },
  { range: '62–68°F / 17–20°C', thickness: '2mm full suit', color: '#e8ff00' },
  { range: '58–62°F / 14–17°C', thickness: '3/2mm full suit', color: '#facc15' },
  { range: '52–58°F / 11–14°C', thickness: '4/3mm + boots', color: '#fb923c' },
  { range: '48–52°F / 9–11°C', thickness: '5/4mm + boots + gloves', color: '#f97316' },
  { range: '< 48°F / 9°C', thickness: '5/4–6/5mm + boots + gloves + hood', color: '#ef4444' },
];

export default function WetsuitCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Banner image={TOOL_BANNERS['wetsuit-thickness-calculator']} height="sm">
        <nav className="text-xs text-white/50 mb-2">
          <Link href="/" className="hover:text-white/80">Home</Link>
          {' / '}
          <Link href="/surfing/" className="hover:text-white/80">Surfing</Link>
        </nav>
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Wetsuit Thickness Calculator
        </h1>
      </Banner>

      <div className="max-w-5xl mx-auto px-4 py-12">

        <header className="mb-10">
          <p className="text-[var(--muted)] max-w-2xl text-lg leading-relaxed">
            Enter your water temperature, cold tolerance, and session length.
            You get a specific thickness recommendation — not a chart that tells you "it depends."
          </p>
        </header>

        <WetsuitCalculator />

        {/* Quick reference table */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">Wetsuit thickness by water temp</h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            These are baseline recommendations for average cold tolerance and 1–2 hour sessions.
            Use the calculator above if you run hot or cold, or plan long sessions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 pr-6 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Water Temp</th>
                  <th className="text-left py-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Recommended Thickness</th>
                </tr>
              </thead>
              <tbody>
                {TEMP_REFERENCE.map(({ range, thickness, color }) => (
                  <tr key={range} className="border-b border-[var(--border)]">
                    <td className="py-3 pr-6 font-mono text-sm">{range}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        {thickness}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">How the calculation works</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              We start with your water temperature and look it up against a baseline thickness table —
              the same logic used by most wetsuit brands in their sizing guides, but with two key
              adjustments most static charts skip.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Cold sensitivity:</strong> Cold-sensitive
              surfers have their effective water temperature shifted 6°F cooler before lookup — meaning
              58°F water is treated as 52°F, bumping the recommendation from a 3/2mm to a 4/3mm.
              Warm-natured surfers get the inverse.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Session length:</strong> Sessions over 3
              hours drop core temperature meaningfully, even in moderate conditions. Long sessions
              apply a 6°F effective cooling adjustment. Short sessions (&lt;1 hour) apply a 4°F
              warming adjustment — your body hasn't cooled down yet.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-[var(--border)] pb-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-4">Related guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              ['Best Wetsuits 2026', '/surfing/best-wetsuits-2026/'],
              ['Best Beginner Surfboards', '/surfing/best-beginner-surfboards/'],
              ['How to Read a Surf Forecast', '/surfing/how-to-read-a-surf-forecast/'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm border border-[var(--border)] px-4 py-2 rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
