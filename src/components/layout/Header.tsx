import Link from 'next/link';
import { CATEGORIES } from '@/types/content';
import ToolsDropdown from './ToolsDropdown';
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" aria-label="NakedSlope — Home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((cat) => (
            <Link
              key={cat}
              href={`/${cat}/`}
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {CATEGORIES[cat].label}
            </Link>
          ))}
          <ToolsDropdown />
          <Link
            href="/conditions/"
            className="flex items-center gap-1.5 text-sm font-semibold text-black bg-[var(--accent)] px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
            Conditions
          </Link>
        </nav>

        {/* Bottom nav handles mobile — nothing needed here */}
      </div>
    </header>
  );
}
