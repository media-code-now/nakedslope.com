import type { Metadata } from 'next';
import SkiLengthCalculator from '@/components/tools/SkiLengthCalculator';
import Banner from '@/components/ui/Banner';
import Link from 'next/link';
import { TOOL_BANNERS } from '@/lib/banners';

export const metadata: Metadata = {
  title: 'Ski Length Calculator 2026 — Find Your Ideal Ski Size',
  description:
    'Enter your height, weight, ability level, and terrain preference to get your exact recommended ski length. Free ski size calculator for all levels.',
  keywords: [
    'ski length calculator',
    'what length skis should I get',
    'ski size calculator',
    'how to choose ski length',
    'ski length by height',
  ],
  openGraph: {
    title: 'Ski Length Calculator — Find Your Ideal Ski Size | NakedSlope',
    description:
      'Stop guessing. Enter your stats and get a precise ski length recommendation for your ability and terrain.',
    type: 'website',
  },
};

// FAQ items — also rendered as JSON-LD schema below
const FAQ = [
  {
    q: 'How do I choose ski length?',
    a: 'The right ski length depends on your height, weight, ability level, and the terrain you ski. Beginners should size down (chin to nose height), advanced skiers can go longer (nose to forehead). Powder and backcountry skiers benefit from extra length; park skiers should go shorter.',
  },
  {
    q: 'Should I go shorter or longer for my first skis?',
    a: 'Shorter — always. A shorter ski is easier to turn and recover from mistakes. The common beginner error is going too long. Size down 15–20 cm from your height when starting out.',
  },
  {
    q: 'Does weight affect ski length?',
    a: 'Yes. A heavier skier needs a longer or stiffer ski to get proper flex and float. Our calculator accounts for weight relative to height and adjusts the recommendation accordingly.',
  },
  {
    q: 'Are ski lengths the same for all brands?',
    a: "Mostly — skis are measured tip to tail in centimeters. However, twin-tips (park skis) are measured to the tip, not the tail, so they ski slightly shorter than their stated length. When buying park skis, go 2–5 cm longer than you'd think.",
  },
  {
    q: 'Can I use the same ski length for groomed runs and powder?',
    a: 'Technically yes, but it\'s not ideal. Groomed skiing favors shorter, more maneuverable skis. Powder benefits from longer skis that plane up and float. If you ski both, your all-mountain length is a good compromise — or own two pairs.',
  },
];

export default function SkiLengthCalculatorPage() {
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

      <Banner image={TOOL_BANNERS['ski-length-calculator']} height="sm">
        <nav className="text-xs text-white/50 mb-2">
          <Link href="/" className="hover:text-white/80">Home</Link>
          {' / '}
          <Link href="/ski-snowboard/" className="hover:text-white/80">Ski & Snowboard</Link>
        </nav>
        <h1 className="text-2xl md:text-4xl font-bold text-white">Ski Length Calculator</h1>
      </Banner>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Subheader */}
        <header className="mb-10">
          <p className="text-[var(--muted)] max-w-2xl text-lg leading-relaxed">
            Enter your height, weight, ability level, and where you ski. You'll get a
            specific cm range — not a chart that tells you "consult your local shop."
          </p>
        </header>

        {/* Calculator */}
        <SkiLengthCalculator />

        {/* How it works */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">How the calculation works</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              We start with your height as the baseline, then apply an offset based on your
              ability level. Beginners go 15–20 cm shorter than height; experts can match or
              exceed their height in ski length. This matches the ski-to-skier sizing guides
              used by most manufacturers.
            </p>
            <p>
              Terrain modifies that baseline: powder skis get 8 cm added (you need length to
              float), park skis lose 8 cm (you need to pivot quickly), groomed skis drop 5 cm
              (control matters more than speed), backcountry skis add 5 cm (you're skiing
              variable snow but want manageable weight).
            </p>
            <p>
              Weight is adjusted relative to a height-proportional average. If you're
              significantly heavier or lighter than typical for your height, the recommendation
              shifts ±3–5 cm accordingly.
            </p>
            <p>
              All results are rounded to the nearest 5 cm — because ski lengths are sold in
              5 cm increments. There's no point giving you "174.3 cm."
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
              ['Best Ski Helmets 2026', '/ski-snowboard/best-ski-helmets-2026/'],
              ['How to Size Ski Boots', '/ski-snowboard/how-to-size-ski-boots/'],
              ['Best All-Mountain Skis', '/ski-snowboard/best-all-mountain-skis/'],
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
