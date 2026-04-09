'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to your error reporting service
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center">
            <AlertTriangle size={48} className="text-orange-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-black mb-4">
          Something went wrong.
        </h1>
        <p className="text-[var(--muted)] text-base md:text-lg mb-10 max-w-md mx-auto">
          We hit an unexpected error. Our bad. Try refreshing the page or head back home.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg text-left max-w-lg mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-2">
              Error Details (dev only)
            </p>
            <code className="text-xs text-red-400 break-all">
              {error.message}
            </code>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-2 border border-[var(--border)] text-[var(--foreground)] text-sm px-6 py-3 rounded-lg hover:border-[var(--accent)] transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-12 text-xs text-[var(--muted)]">
          If this keeps happening, there might be an issue on our end. 
          Check back in a few minutes.
        </p>
      </div>
    </div>
  );
}
