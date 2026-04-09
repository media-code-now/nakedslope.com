'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import {
  calculateWetsuit,
  cToF,
  fToC,
  SURF_SPOTS,
  type TempSensitivity,
  type SessionLength,
  type WaterTempUnit,
} from '@/lib/wetsuit-thickness';

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-2">
      {children}
    </p>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-lg p-0.5 w-fit">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
            value === opt.value
              ? 'bg-[var(--accent)] text-black font-semibold'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Thickness visual bar ─────────────────────────────────────────────────────

const THICKNESS_ORDER = [
  'None / Rash guard',
  '1–2mm',
  '2mm',
  '3/2mm',
  '4/3mm',
  '5/4mm',
  '5/4mm – 6/5mm',
];

function ThicknessBar({ thickness }: { thickness: string }) {
  const idx = THICKNESS_ORDER.indexOf(thickness);
  const pct = idx < 0 ? 0 : Math.round(((idx + 1) / THICKNESS_ORDER.length) * 100);

  const color =
    idx <= 1 ? '#22c55e' :
    idx <= 3 ? '#e8ff00' :
    '#f97316';

  return (
    <div className="mt-4">
      <div className="flex justify-between text-[10px] text-[var(--muted)] mb-1">
        <span>Warm water</span>
        <span>Cold water</span>
      </div>
      <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function WetsuitCalculator() {
  const [unit, setUnit] = useState<WaterTempUnit>('f');
  const [tempInput, setTempInput] = useState('');
  const [sensitivity, setSensitivity] = useState<TempSensitivity>('normal');
  const [sessionLength, setSessionLength] = useState<SessionLength>('medium');

  const handleUnitToggle = useCallback((u: WaterTempUnit) => {
    setUnit(u);
    const n = parseFloat(tempInput);
    if (!isNaN(n)) {
      setTempInput(String(u === 'c' ? fToC(n) : cToF(n)));
    }
  }, [tempInput]);

  const tempF = (() => {
    const n = parseFloat(tempInput);
    if (isNaN(n)) return NaN;
    return unit === 'f' ? n : cToF(n);
  })();

  const isValid = !isNaN(tempF) && tempF >= 32 && tempF <= 95;

  const result = isValid
    ? calculateWetsuit({ waterTempF: tempF, sensitivity, sessionLength })
    : null;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8">

      {/* Unit toggle */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">Water conditions</h2>
        <SegmentedControl
          options={[
            { value: 'f', label: '°F' },
            { value: 'c', label: '°C' },
          ]}
          value={unit}
          onChange={handleUnitToggle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ── Left: inputs ── */}
        <div className="space-y-6">

          {/* Water temp input */}
          <div>
            <Label>Water Temperature</Label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder={unit === 'f' ? '58' : '14'}
                min={unit === 'f' ? 32 : 0}
                max={unit === 'f' ? 95 : 35}
                className="w-28 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
              <span className="text-sm text-[var(--muted)]">°{unit.toUpperCase()}</span>
            </div>
          </div>

          {/* Quick-pick: surf spots */}
          <div>
            <Label>Quick-pick a surf spot</Label>
            <div className="flex flex-wrap gap-2">
              {SURF_SPOTS.map((spot) => (
                <button
                  key={spot.name}
                  type="button"
                  onClick={() => setTempInput(String(unit === 'f' ? spot.avgTempF : fToC(spot.avgTempF)))}
                  className={`text-xs border rounded-md px-2.5 py-1.5 transition-colors ${
                    parseFloat(tempInput) === (unit === 'f' ? spot.avgTempF : fToC(spot.avgTempF))
                      ? 'border-[var(--accent)] text-[var(--accent)]'
                      : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {spot.name}
                  <span className="ml-1 opacity-60">
                    {unit === 'f' ? `${spot.avgTempF}°F` : `${fToC(spot.avgTempF)}°C`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Temperature sensitivity */}
          <div>
            <Label>How do you run temperature-wise?</Label>
            <div className="space-y-2">
              {([
                { value: 'cold',   label: 'Cold-sensitive', desc: 'You get cold fast, always the first one out' },
                { value: 'normal', label: 'Normal',          desc: 'Average cold tolerance' },
                { value: 'warm',   label: 'Warm-natured',   desc: 'You overheat easily, last one in the lineup' },
              ] as { value: TempSensitivity; label: string; desc: string }[]).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSensitivity(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    sensitivity === opt.value
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--border)] hover:border-[var(--muted)]'
                  }`}
                >
                  <span className={`text-sm font-medium block ${sensitivity === opt.value ? 'text-[var(--accent)]' : ''}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Session length */}
          <div>
            <Label>Session length</Label>
            <SegmentedControl
              options={[
                { value: 'short',  label: '< 1 hr' },
                { value: 'medium', label: '1–2 hrs' },
                { value: 'long',   label: '3 hrs+' },
              ]}
              value={sessionLength}
              onChange={setSessionLength}
            />
            <p className="text-xs text-[var(--muted)] mt-2">
              Longer sessions drop your core temp — we size up accordingly.
            </p>
          </div>
        </div>

        {/* ── Right: result ── */}
        <div>
          {result ? (
            <div className={`rounded-xl p-6 space-y-5 border ${
              result.urgent
                ? 'bg-orange-950/30 border-orange-700/50'
                : 'bg-[var(--background)] border-[var(--accent)]/40'
            }`}>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                Recommended wetsuit
              </p>

              {/* Thickness */}
              <div>
                <p className="text-5xl font-bold">{result.thickness}</p>
                <p className="text-[var(--muted)] mt-1">{result.type}</p>
              </div>

              {/* Accessories */}
              {result.accessories.length > 0 && (
                <div>
                  <p className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${result.urgent ? 'text-orange-400' : 'text-[var(--foreground)]'}`}>
                    {result.urgent ? <><AlertTriangle size={13} /><span>Required accessories</span></> : 'Recommended accessories'}
                  </p>
                  <ul className="space-y-1">
                    {result.accessories.map((a) => (
                      <li key={a} className="text-sm text-[var(--muted)] flex items-center gap-2">
                        <ChevronRight size={13} className="text-[var(--accent)] shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ThicknessBar thickness={result.thickness} />

              {/* Rationale */}
              <p className="text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-4">
                {result.rationale}
              </p>

              {/* CTA */}
              <Link
                href="/surfing/best-wetsuits-2026/"
                className="inline-block bg-[var(--accent)] text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                See our top wetsuit picks →
              </Link>
            </div>
          ) : (
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-center min-h-64">
              <p className="text-sm text-[var(--muted)] text-center">
                Enter your water temp or pick a surf spot<br />to see your recommendation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
