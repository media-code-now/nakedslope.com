import Link from 'next/link';
import { AFFILIATE_DISCLOSURE } from '@/lib/affiliate';

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-[var(--border)] mt-24 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-bold mb-2">
              <span className="text-[var(--accent)]">Naked</span>Slope
            </p>
            <p className="text-sm text-[var(--muted)]">No fluff. Just gear.</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-3">Categories</p>
            <ul className="space-y-1 text-sm">
              {[
                ['Ski & Snowboard', '/ski-snowboard/'],
                ['Surfing', '/surfing/'],
                ['Overlanding', '/overlanding/'],
                ['Best Gear', '/best-gear/'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-3">Legal</p>
            <ul className="space-y-1 text-sm">
              {[
                ['Affiliate Disclosure', '/affiliate-disclosure/'],
                ['Privacy Policy', '/privacy/'],
                ['Terms of Use', '/terms/'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-6">
          <strong>Disclosure:</strong> {AFFILIATE_DISCLOSURE}
        </p>
      </div>
    </footer>
  );
}
