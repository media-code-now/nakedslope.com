import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How NakedSlope uses affiliate links and earns commissions.',
};

export default function DisclaimersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Disclaimers & Disclosures</h1>
        <p className="text-[var(--muted)]">Last updated: April 9, 2026</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Affiliate Disclosure</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            NakedSlope.com participates in affiliate programs with outdoor gear retailers. 
            When you click our links and make a purchase, we earn a commission at no extra cost to you.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">How It Works</h3>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>You click a product link on our site</li>
            <li>You&apos;re redirected to the retailer&apos;s website</li>
            <li>The retailer sets a cookie to track your visit</li>
            <li>If you buy within their cookie window (typically 24 hours to 30 days), we get paid</li>
            <li>The price you pay is exactly the same — retailers pay us, not you</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Our Affiliate Partners</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-3">
            We work with these retailers:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4">
            <li>Amazon Associates</li>
            <li>Evo</li>
            <li>Backcountry</li>
            <li>REI Co-op</li>
            <li>Surfline</li>
            <li>ARB 4x4 Accessories</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">What This Means for You</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">We only recommend gear we believe in.</strong> 
            Commission rates do not influence our editorial decisions. If a product with a lower commission 
            is better or cheaper, that&apos;s the one we&apos;ll recommend.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            Our goal is to help you find the right gear, not maximize our revenue.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Medical & Safety Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">Outdoor activities are inherently dangerous.</strong> 
            Skiing, surfing, and overlanding involve serious risks including injury and death.
          </p>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            Our gear recommendations and safety advice are not substitutes for:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Professional instruction and training</li>
            <li>Consulting with medical professionals about your fitness for activities</li>
            <li>Reading and following manufacturer safety guidelines</li>
            <li>Using common sense and assessing conditions yourself</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">You assume all risk</strong> when participating 
            in outdoor sports. No helmet, wetsuit, or recovery strap eliminates danger.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Product Information Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We strive for accuracy, but:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Product specs, features, and prices change without notice</li>
            <li>Manufacturers update products mid-season</li>
            <li>Availability varies by region and retailer</li>
            <li>Colors and sizes may differ from what&apos;s shown</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Always verify</strong> product details, 
            pricing, and availability with the retailer before purchasing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Review Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our reviews are based on:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Independent research and analysis</li>
            <li>Manufacturer specifications and testing data</li>
            <li>Third-party lab results when available</li>
            <li>Verified user reviews and field reports</li>
            <li>Our own hands-on testing when possible</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Reviews are opinions, not guarantees.</strong> 
            Performance may vary based on individual use, conditions, and body type.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Conditions Data Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our live conditions tools use data from Open-Meteo and other public APIs. This data:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Is provided for informational purposes only</li>
            <li>May not be 100% accurate or up-to-date</li>
            <li>Should not be your sole source for safety decisions</li>
            <li>Is not a substitute for checking official forecasts and local conditions</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            <strong className="text-[var(--foreground)]">Always check multiple sources</strong> before 
            heading out, especially for backcountry or big wave conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Calculator Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our ski length and wetsuit thickness calculators provide general guidance based on 
            industry standards and best practices. They are:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li><strong className="text-[var(--foreground)]">Not personalized advice</strong> — results are estimates</li>
            <li><strong className="text-[var(--foreground)]">Not substitutes for professional fitting</strong> — visit a shop for precise sizing</li>
            <li><strong className="text-[var(--foreground)]">General guidelines only</strong> — individual preferences vary</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Endorsements Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We do not have sponsorship or endorsement deals with gear manufacturers. Any positive 
            reviews are based on merit, not payment. We maintain complete editorial independence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Environmental Conditions</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Weather, snow, and ocean conditions change rapidly and can be deadly. Always:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>Check avalanche forecasts before backcountry skiing</li>
            <li>Monitor surf reports and tide charts</li>
            <li>Understand weather patterns in remote areas</li>
            <li>Know when to turn back</li>
            <li>Tell someone your plans</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We link to retailer websites, manufacturer sites, and other resources. We are not 
            responsible for:
          </p>
          <ul className="list-disc list-inside text-[var(--muted)] space-y-2 ml-4 mt-4">
            <li>The accuracy of information on third-party sites</li>
            <li>Product quality or fulfillment issues</li>
            <li>Customer service at retailers</li>
            <li>Return policies or warranties</li>
          </ul>
          <p className="text-[var(--muted)] leading-relaxed mt-4">
            Once you leave NakedSlope, their terms and policies apply.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Updates & Changes</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We update our content regularly as new products launch and we gather more data. 
            Check the &quot;Last Updated&quot; date on articles for freshness.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">FTC Compliance</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We comply with FTC guidelines for affiliate disclosure. We clearly mark affiliate 
            content and maintain transparency about our business model.
          </p>
        </section>

        <div className="mt-12 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">Questions?</strong> Contact us at{' '}
            <a href="mailto:legal@nakedslope.com" className="text-[var(--accent)] hover:underline">
              legal@nakedslope.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
