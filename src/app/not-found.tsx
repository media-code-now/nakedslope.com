import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-[clamp(6rem,15vw,12rem)] font-black leading-none text-[var(--muted)] opacity-20">
            404
          </h1>
          <div className="relative -mt-12">
            <div className="inline-block border-2 border-[var(--accent)] rounded-full px-6 py-2 bg-[var(--background)]">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Page Not Found
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-black mb-4">
          This page doesn&apos;t exist.
        </h2>
        <p className="text-[var(--muted)] text-base md:text-lg mb-10 max-w-md mx-auto">
          Either we moved it, you mistyped the URL, or this link is broken. 
          No fluff, just the truth.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <Link
            href="/ski-snowboard/"
            className="flex items-center gap-2 border border-[var(--border)] text-[var(--foreground)] text-sm px-6 py-3 rounded-lg hover:border-[var(--accent)] transition-colors"
          >
            <Search size={18} />
            Browse Gear Reviews
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/ski-snowboard/ski-length-calculator/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Ski Length Calculator
            </Link>
            <span className="text-[var(--border)]">·</span>
            <Link href="/surfing/wetsuit-thickness-calculator/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Wetsuit Calculator
            </Link>
            <span className="text-[var(--border)]">·</span>
            <Link href="/conditions/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Live Conditions
            </Link>
            <span className="text-[var(--border)]">·</span>
            <Link href="/ski-snowboard/best-ski-helmets-2026/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Best Ski Helmets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
