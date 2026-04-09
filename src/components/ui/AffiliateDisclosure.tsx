import { AFFILIATE_DISCLOSURE } from '@/lib/affiliate';

export default function AffiliateDisclosure() {
  return (
    <div className="text-xs text-[var(--muted)] bg-[var(--card)] border border-[var(--border)] rounded px-4 py-3 my-6">
      <strong className="text-[var(--foreground)]">Disclosure:</strong> {AFFILIATE_DISCLOSURE}
    </div>
  );
}
