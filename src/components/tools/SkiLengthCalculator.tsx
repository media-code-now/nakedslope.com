'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Mountain, Snowflake, TreePine, Bike, Compass, type LucideIcon } from 'lucide-react';
import {
  calculateSkiLength,
  ftInToCm,
  lbsToKg,
  cmToFtIn,
  kgToLbs,
  type AbilityLevel,
  type TerrainType,
} from '@/lib/ski-length';

// ─── Types ────────────────────────────────────────────────────────────────────

type UnitSystem = 'imperial' | 'metric';

interface FormState {
  units: UnitSystem;
  // metric fields
  heightCm: string;
  weightKg: string;
  // imperial fields
  heightFt: string;
  heightIn: string;
  weightLbs: string;
  // shared
  ability: AbilityLevel;
  terrain: TerrainType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ABILITY_OPTIONS: { value: AbilityLevel; label: string; desc: string }[] = [
  { value: 'beginner',     label: 'Beginner',     desc: 'First few seasons, still learning turns' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable on blues, occasional blacks' },
  { value: 'advanced',     label: 'Advanced',     desc: 'Confident on blacks, varied terrain' },
  { value: 'expert',       label: 'Expert',       desc: 'Double blacks, steep chutes, moguls' },
];

const TERRAIN_OPTIONS: { value: TerrainType; label: string; Icon: LucideIcon }[] = [
  { value: 'groomed',      label: 'Groomed / Resort', Icon: TreePine  },
  { value: 'all-mountain', label: 'All-Mountain',     Icon: Mountain  },
  { value: 'powder',       label: 'Powder',           Icon: Snowflake },
  { value: 'park',         label: 'Park & Freestyle', Icon: Bike      },
  { value: 'backcountry',  label: 'Backcountry',      Icon: Compass   },
];

const TERRAIN_LINKS: Record<TerrainType, { label: string; href: string } | null> = {
  groomed:       { label: 'Best All-Mountain Skis →', href: '/ski-snowboard/best-all-mountain-skis/' },
  'all-mountain':{ label: 'Best All-Mountain Skis →', href: '/ski-snowboard/best-all-mountain-skis/' },
  powder:        { label: 'Best Powder Skis →',       href: '/ski-snowboard/best-powder-skis/' },
  park:          { label: 'Best Park Skis →',          href: '/ski-snowboard/best-park-skis/' },
  backcountry:   { label: 'Best Backcountry Skis →',  href: '/ski-snowboard/best-backcountry-skis/' },
};

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

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  unit,
  width = 'w-24',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  min: number;
  max: number;
  unit?: string;
  width?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-[var(--muted)]">{label}</label>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`${width} bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none transition-colors`}
        />
        {unit && <span className="text-sm text-[var(--muted)]">{unit}</span>}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkiLengthCalculator() {
  const [form, setForm] = useState<FormState>({
    units: 'imperial',
    heightCm: '',
    weightKg: '',
    heightFt: '',
    heightIn: '',
    weightLbs: '',
    ability: 'intermediate',
    terrain: 'all-mountain',
  });

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  // ── Derive metric values from whatever unit system is active ──
  const derivedCm = (() => {
    if (form.units === 'metric') return parseFloat(form.heightCm);
    const ft = parseInt(form.heightFt) || 0;
    const inches = parseInt(form.heightIn) || 0;
    return ft > 0 || inches > 0 ? ftInToCm(ft, inches) : NaN;
  })();

  const derivedKg = (() => {
    if (form.units === 'metric') return parseFloat(form.weightKg);
    const lbs = parseFloat(form.weightLbs);
    return isNaN(lbs) ? NaN : lbsToKg(lbs);
  })();

  const isValid =
    !isNaN(derivedCm) && derivedCm >= 100 && derivedCm <= 230 &&
    !isNaN(derivedKg) && derivedKg >= 30 && derivedKg <= 200;

  const result = isValid
    ? calculateSkiLength({ heightCm: derivedCm, weightKg: derivedKg, ability: form.ability, terrain: form.terrain })
    : null;

  const terrainLink = TERRAIN_LINKS[form.terrain];

  // ── Sync units toggle — convert existing values ──
  const handleUnitToggle = (units: UnitSystem) => {
    setForm((prev) => {
      if (units === prev.units) return prev;
      if (units === 'metric') {
        const ft = parseInt(prev.heightFt) || 0;
        const inches = parseInt(prev.heightIn) || 0;
        const lbs = parseFloat(prev.weightLbs);
        return {
          ...prev,
          units,
          heightCm: ft > 0 || inches > 0 ? String(ftInToCm(ft, inches)) : '',
          weightKg: isNaN(lbs) ? '' : String(lbsToKg(lbs)),
        };
      } else {
        const cm = parseFloat(prev.heightCm);
        const kg = parseFloat(prev.weightKg);
        const totalIn = isNaN(cm) ? null : Math.round(cm / 2.54);
        return {
          ...prev,
          units,
          heightFt: totalIn != null ? String(Math.floor(totalIn / 12)) : '',
          heightIn: totalIn != null ? String(totalIn % 12) : '',
          weightLbs: isNaN(kg) ? '' : String(kgToLbs(kg)),
        };
      }
    });
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8">

      {/* ── Unit toggle ── */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">Your measurements</h2>
        <SegmentedControl
          options={[
            { value: 'imperial', label: 'Imperial (ft / lbs)' },
            { value: 'metric',   label: 'Metric (cm / kg)' },
          ]}
          value={form.units}
          onChange={handleUnitToggle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ── Left column: measurements ── */}
        <div className="space-y-6">
          {/* Height */}
          <div>
            <Label>Height</Label>
            {form.units === 'imperial' ? (
              <div className="flex gap-3">
                <NumberInput label="Feet" value={form.heightFt} onChange={(v) => set('heightFt', v)} placeholder="5" min={3} max={7} unit="ft" />
                <NumberInput label="Inches" value={form.heightIn} onChange={(v) => set('heightIn', v)} placeholder="10" min={0} max={11} unit="in" />
              </div>
            ) : (
              <NumberInput label="Centimeters" value={form.heightCm} onChange={(v) => set('heightCm', v)} placeholder="178" min={100} max={230} unit="cm" width="w-32" />
            )}
          </div>

          {/* Weight */}
          <div>
            <Label>Weight</Label>
            {form.units === 'imperial' ? (
              <NumberInput label="Pounds" value={form.weightLbs} onChange={(v) => set('weightLbs', v)} placeholder="175" min={60} max={400} unit="lbs" width="w-28" />
            ) : (
              <NumberInput label="Kilograms" value={form.weightKg} onChange={(v) => set('weightKg', v)} placeholder="80" min={30} max={200} unit="kg" width="w-28" />
            )}
          </div>

          {/* Ability */}
          <div>
            <Label>Ability Level</Label>
            <div className="space-y-2">
              {ABILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set('ability', opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    form.ability === opt.value
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--border)] hover:border-[var(--muted)]'
                  }`}
                >
                  <span className={`text-sm font-medium block ${form.ability === opt.value ? 'text-[var(--accent)]' : ''}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: terrain + result ── */}
        <div className="space-y-6">
          {/* Terrain */}
          <div>
            <Label>Primary Terrain</Label>
            <div className="space-y-2">
              {TERRAIN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set('terrain', opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center gap-3 ${
                    form.terrain === opt.value
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                      : 'border-[var(--border)] hover:border-[var(--muted)]'
                  }`}
                >
                  <opt.Icon size={18} className="shrink-0" />
                  <span className={`text-sm font-medium ${form.terrain === opt.value ? 'text-[var(--accent)]' : ''}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Result ── */}
          {result ? (
            <div className="bg-[var(--background)] border border-[var(--accent)]/40 rounded-xl p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                Your recommended ski length
              </p>

              <div className="flex items-end gap-3">
                <p className="text-5xl font-bold tabular-nums">
                  {result.minCm}
                  <span className="text-2xl text-[var(--muted)] mx-1">–</span>
                  {result.maxCm}
                </p>
                <p className="text-lg text-[var(--muted)] mb-1">cm</p>
              </div>

              {form.units === 'imperial' && (
                <p className="text-sm text-[var(--muted)]">
                  {cmToFtIn(result.minCm)} – {cmToFtIn(result.maxCm)} tip-to-tail
                </p>
              )}

              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {result.rationale}
              </p>

              <div className="border-t border-[var(--border)] pt-4">
                <p className="text-xs font-semibold text-[var(--foreground)] mb-1">Pro tip</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{result.tip}</p>
              </div>

              {terrainLink && (
                <Link
                  href={terrainLink.href}
                  className="inline-block mt-2 bg-[var(--accent)] text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {terrainLink.label}
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 flex items-center justify-center min-h-48">
              <p className="text-sm text-[var(--muted)] text-center">
                Fill in your height and weight<br />to see your recommended length.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
