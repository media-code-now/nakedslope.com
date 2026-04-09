import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About NakedSlope',
  description: 'Who we are, what we do, and why we do it differently.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">About NakedSlope</h1>
        <p className="text-xl text-[var(--muted)]">No fluff. Just gear. Here&apos;s why that matters.</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Most outdoor gear sites are full of shit.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            They rank products by commission rate, not quality. They publish &quot;reviews&quot; 
            without testing anything. They update articles once every 4 years and leave outdated 
            recommendations at the top.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            We got tired of reading 3,000-word SEO garbage just to find out which helmet 
            doesn&apos;t suck.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">The Solution</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            NakedSlope exists to fix that. We:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-3 ml-4 mt-4">
            <li>
              <strong className="text-[var(--foreground)]">Test gear ourselves</strong> or rely on 
              independent lab data and verified field reports
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Link to the best deal</strong>, not the 
              highest commission
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Call out garbage</strong> when a $300 
              product isn&apos;t worth $150
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Update yearly</strong> — every roundup 
              gets re-evaluated each season
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Skip the fluff</strong> — no life stories, 
              no padding, just what you need to know
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How We Make Money</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We earn affiliate commissions when you buy gear through our links. That&apos;s it.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Here&apos;s the difference:</strong> We don&apos;t 
            optimize for commission. If Amazon pays 8% but Evo has a better price and only pays 5%, 
            we link to Evo. Our job is to get you the best gear, not maximize our cut.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">We never:</strong>
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Accept payment for product placement</li>
            <li>Publish sponsored &quot;reviews&quot;</li>
            <li>Rank products by commission rate</li>
            <li>Hide better deals because they pay less</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Testing Process</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            For every review, we:
          </p>
          <ol className="list-decimal list-inside text-[var(--muted)] space-y-3 ml-4">
            <li>
              <strong className="text-[var(--foreground)]">Research specs</strong> — manufacturer 
              data, materials, construction details
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Check independent tests</strong> — lab 
              results, safety certifications, third-party analysis
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Read real reviews</strong> — verified 
              purchases, forum discussions, expert opinions
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Field test when possible</strong> — we 
              use the gear ourselves or work with testers who do
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Compare alternatives</strong> — how does 
              it stack up against competitors at the same price?
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Update regularly</strong> — re-evaluate 
              every season as new products launch
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Cover</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 text-blue-400">Ski & Snowboard</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Helmets, goggles, boots, skis, bindings, and everything you need on the mountain.
              </p>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 text-emerald-400">Surfing</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Wetsuits, boards, fins, leashes, and gear for every water temperature and skill level.
              </p>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 text-orange-400">Overlanding</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Recovery gear, rooftop tents, fridges, and equipment for remote adventures.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Free Tools</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            We built calculators and tools because we got tired of guessing:
          </p>
          <div className="space-y-4">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <Link href="/ski-snowboard/ski-length-calculator/" className="group">
                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                  Ski Length Calculator →
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Height + weight + terrain → your exact ski size. No more guessing.
                </p>
              </Link>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <Link href="/surfing/wetsuit-thickness-calculator/" className="group">
                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                  Wetsuit Thickness Calculator →
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Water temp + cold tolerance → the right millimeter wetsuit.
                </p>
              </Link>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <Link href="/conditions/" className="group">
                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                  Live Conditions →
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Real-time surf swell and resort snowfall. Updated every 15 minutes.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We&apos;re skiers, surfers, and overlanders who got sick of bad gear advice. 
            We built the site we wished existed.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            No VC funding. No corporate overlords. Just a small team obsessed with helping 
            people find gear that actually works.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Editorial Independence</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our editorial team has final say on all product recommendations. Marketing and 
            affiliate partnerships have zero input. If a brand wants to work with us, they 
            can make a better product — that&apos;s the only way to get recommended.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <div className="space-y-3">
            <p className="text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">General inquiries:</strong>{' '}
              <a href="mailto:hello@nakedslope.com" className="text-[var(--accent)] hover:underline">
                hello@nakedslope.com
              </a>
            </p>
            <p className="text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">Editorial:</strong>{' '}
              <a href="mailto:editorial@nakedslope.com" className="text-[var(--accent)] hover:underline">
                editorial@nakedslope.com
              </a>
            </p>
            <p className="text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">Press:</strong>{' '}
              <a href="mailto:press@nakedslope.com" className="text-[var(--accent)] hover:underline">
                press@nakedslope.com
              </a>
            </p>
          </div>
        </section>

        <div className="mt-12 p-6 bg-[var(--accent)] text-black rounded-xl">
          <p className="font-bold text-lg mb-2">Our Promise</p>
          <p className="text-sm leading-relaxed">
            If we wouldn&apos;t use it on the mountain, in the water, or on the trail — 
            we won&apos;t recommend it. Period.
          </p>
        </div>
      </div>
    </div>
  );
}
