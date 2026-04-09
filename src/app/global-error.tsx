import { AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: 'system-ui, sans-serif',
        background: '#0a0a0a',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '600px' }}>
          <div style={{ 
            display: 'inline-flex',
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.1)',
            border: '2px solid rgba(249, 115, 22, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            <AlertTriangle size={48} color="#f97316" />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>
            Critical Error
          </h1>
          
          <p style={{ 
            color: '#999', 
            fontSize: '1rem', 
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}>
            Something went seriously wrong. This is a global application error.
            We&apos;ve been notified and are looking into it.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#e8ff00',
                color: '#000',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #333',
                color: '#fff',
                fontSize: '0.875rem',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Home size={18} />
              Back to Home
            </a>
          </div>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
              textAlign: 'left',
            }}>
              <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                ERROR (dev only):
              </p>
              <code style={{ fontSize: '0.75rem', color: '#f87171', wordBreak: 'break-all' }}>
                {error.message}
              </code>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
