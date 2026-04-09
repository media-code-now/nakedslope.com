import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NakedSlope — No Fluff. Just Gear.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#e8ff00',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.05em',
              textAlign: 'center',
            }}
          >
            NakedSlope
          </div>
          
          <div
            style={{
              fontSize: 42,
              color: '#e8ff00',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            No Fluff. Just Gear.
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#999',
              marginTop: 12,
            }}
          >
            Ski · Surf · Overland
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 20,
            color: '#666',
            letterSpacing: '0.1em',
          }}
        >
          nakedslope.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
