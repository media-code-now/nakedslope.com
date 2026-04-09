import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How NakedSlope collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
        <p className="text-[var(--muted)]">Last updated: April 9, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">The Short Version</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We don&apos;t sell your data. We don&apos;t track you across the web. 
            We use minimal analytics to understand what content is useful. 
            If you click an affiliate link, the retailer knows you came from us — that&apos;s it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-2 mt-6">Analytics Data</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            We use privacy-focused analytics to understand how visitors use our site. This includes:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>Pages you visit</li>
            <li>Referring website</li>
            <li>Browser type and device</li>
            <li>Geographic location (country/region only)</li>
            <li>Time spent on pages</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            We do NOT collect IP addresses or use cookies for tracking.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-6">Interactive Tools</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            When you use our calculators (ski length, wetsuit thickness), all calculations 
            happen in your browser. We don&apos;t store or transmit your inputs.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-6">Newsletter (if you subscribe)</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            If you sign up for our newsletter, we collect your email address. 
            We use a third-party service to send emails. You can unsubscribe anytime.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Affiliate Links</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We earn commissions when you buy products through our affiliate links. When you click:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>The retailer knows you came from NakedSlope (via a tracking parameter)</li>
            <li>They set a cookie to track your purchase (their privacy policy applies)</li>
            <li>We receive a commission if you buy within their cookie window</li>
            <li>We never see your purchase details, payment info, or personal data</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            Affiliate programs we work with: Amazon Associates, Evo, Backcountry, REI, Surfline.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We use minimal cookies:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li><strong>Essential:</strong> Session cookies for site functionality</li>
            <li><strong>Analytics:</strong> Anonymous usage statistics (no personal data)</li>
            <li><strong>Affiliate:</strong> When you click our links, retailers set their own cookies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            We use these third-party services:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li><strong>Vercel:</strong> Website hosting (privacy policy: vercel.com/legal/privacy-policy)</li>
            <li><strong>Unsplash:</strong> Images (privacy policy: unsplash.com/privacy)</li>
            <li><strong>Open-Meteo:</strong> Weather/conditions data (no tracking, public API)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Storage & Security</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We store minimal data on secure servers. Analytics data is aggregated and anonymized. 
            We use industry-standard security practices to protect any data we do collect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>Request what data we have about you (spoiler: almost nothing)</li>
            <li>Ask us to delete your data</li>
            <li>Opt out of analytics (use an ad blocker or privacy extension)</li>
            <li>Unsubscribe from emails anytime</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our site is not directed at children under 13. We don&apos;t knowingly collect 
            data from children. If you&apos;re a parent and believe we have data about your child, 
            contact us and we&apos;ll delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We may update this policy occasionally. We&apos;ll note the date at the top. 
            Major changes will be announced on the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Questions about privacy? Email us at: <a href="mailto:privacy@nakedslope.com" className="text-[var(--accent)] hover:underline">privacy@nakedslope.com</a>
          </p>
        </section>

        <div className="mt-12 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">TL;DR:</strong> We respect your privacy. 
            We collect the bare minimum to run the site and improve content. We don&apos;t sell data. 
            We don&apos;t track you creepily. Affiliate links fund the site, but don&apos;t compromise your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
