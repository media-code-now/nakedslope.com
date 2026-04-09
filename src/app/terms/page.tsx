import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using NakedSlope.com.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
        <p className="text-[var(--muted)]">Last updated: April 9, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            By using NakedSlope.com, you agree to these terms. If you don&apos;t agree, 
            don&apos;t use the site. Simple as that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Provide</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            NakedSlope provides:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>Honest gear reviews and recommendations</li>
            <li>Free calculators and tools (ski length, wetsuit thickness)</li>
            <li>Live surf and snow conditions data</li>
            <li>Educational content about outdoor gear</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">No Warranties</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We work hard to provide accurate information, but we&apos;re not perfect. 
            The site and all content are provided &quot;as is&quot; without warranties of any kind.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Translation:</strong> We do our best, 
            but don&apos;t sue us if a product recommendation doesn&apos;t work out for you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Affiliate Disclosure</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We earn commissions from affiliate links. This means:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>When you buy through our links, we get a small percentage</li>
            <li>It doesn&apos;t cost you extra — retailers pay us, not you</li>
            <li>We only recommend gear we genuinely believe in</li>
            <li>Our editorial integrity is never for sale</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            We link to products based on quality, not commission rates. If a retailer 
            pays 10% but has a worse deal than one paying 5%, we&apos;ll send you to the 5% link.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            Don&apos;t be a jerk. Specifically, don&apos;t:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>Scrape or copy our content for commercial use</li>
            <li>Hack, DDoS, or otherwise attack the site</li>
            <li>Impersonate NakedSlope or our team</li>
            <li>Use our tools to spam or harass others</li>
            <li>Violate any laws while using the site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            All content on NakedSlope — reviews, guides, tools, design — is owned by us 
            unless otherwise noted.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong>You can:</strong> Share links, quote excerpts with attribution, 
            use our tools personally.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong>You can&apos;t:</strong> Copy entire articles, republish our content, 
            or use it commercially without permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We link to retailers, manufacturers, and other sites. We&apos;re not responsible 
            for their content, products, or policies. Once you click away, their terms apply.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We&apos;re not liable for damages arising from your use of the site. This includes:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Injuries from using gear we recommended</li>
            <li>Lost money from bad purchases</li>
            <li>Site downtime or data loss</li>
            <li>Anything else, really</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Real talk:</strong> You&apos;re 
            responsible for your own safety. Read manufacturer specs, consult professionals, 
            and use common sense. Our reviews are opinions, not guarantees.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Outdoor Activities Are Risky</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Skiing, surfing, and overlanding are inherently dangerous. Gear helps, but it 
            doesn&apos;t eliminate risk. You assume all risk when you participate in these activities.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong>Always:</strong> Check conditions, know your limits, use appropriate safety gear, 
            and follow local laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">User-Generated Content</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            If we ever add comments or user submissions, by posting you grant us a license 
            to use, modify, and display your content. You&apos;re responsible for what you post.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Product Availability & Pricing</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Prices and availability change constantly. We try to keep links current, but 
            retailers control their inventory and pricing. Always verify before purchasing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We can update these terms anytime. Continued use of the site means you accept 
            the new terms. Check the date at the top to see when we last updated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            These terms are governed by the laws of the United States. Any disputes will be 
            resolved in the courts of [Your State/Jurisdiction].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Termination</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We can ban you from the site if you violate these terms or act like a jerk. 
            You can also stop using the site anytime — no hard feelings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Questions about these terms? Email us at: <a href="mailto:legal@nakedslope.com" className="text-[var(--accent)] hover:underline">legal@nakedslope.com</a>
          </p>
        </section>

        <div className="mt-12 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">Bottom line:</strong> Use the site 
            responsibly. We provide honest opinions, not guarantees. Affiliate links fund the site. 
            Outdoor sports are risky — gear up, be smart, and have fun.
          </p>
        </div>
      </div>
    </div>
  );
}
