import Link from 'next/link';
import { AFFILIATE_PROGRAMS, goLink, type AffiliateProgram } from '@/lib/affiliate';

interface AffiliateButtonProps {
  program: AffiliateProgram;
  slug: string;
  label?: string;
  postSlug?: string;
  variant?: 'primary' | 'secondary';
}

export default function AffiliateButton({
  program,
  slug,
  label,
  postSlug,
  variant = 'primary',
}: AffiliateButtonProps) {
  const config = AFFILIATE_PROGRAMS[program];
  const href = postSlug
    ? `${goLink(program, slug)}?post=${postSlug}`
    : goLink(program, slug);

  const displayLabel = label ?? `Check price at ${config.name} →`;

  return (
    <Link
      href={href}
      rel="nofollow sponsored"
      target="_blank"
      className={
        variant === 'primary'
          ? 'inline-block bg-[var(--accent)] text-black font-semibold text-sm px-4 py-2 rounded hover:opacity-90 transition-opacity'
          : 'inline-block border border-[var(--border)] text-[var(--foreground)] text-sm px-4 py-2 rounded hover:border-[var(--accent)] transition-colors'
      }
    >
      {displayLabel}
    </Link>
  );
}
