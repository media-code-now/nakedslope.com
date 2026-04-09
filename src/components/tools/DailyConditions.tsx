'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ArrowUp, Star, AlertTriangle, Waves, Snowflake } from 'lucide-react';
import {
  SURF_SPOTS, SKI_RESORTS,
  fetchSurfConditions, fetchSnowConditions,
  rateSurf,
  mToFt, cToF, kmhToMph, compassDir, formatHour, formatDay,
  type SurfConditions, type SnowConditions, type SurfSpot, type SkiResort,
} from '@/lib/conditions';

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Pill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
        active
          ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
      }`}
    >
      {children}
    </button>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string; sub?: React.ReactNode }) {
  return (
    <div className="bg-[var(--background)] rounded-xl p-4 flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">{label}</p>
      <p className="text-2xl font-bold leading-none">{value}</p>
      {sub && <div className="text-xs text-[var(--muted)] flex items-center gap-1">{sub}</div>}
    </div>
  );
}

function WindArrow({ deg }: { deg: number }) {
  return (
    <span
      className="inline-flex text-[var(--accent)]"
      style={{ transform: `rotate(${deg}deg)` }}
      title={`${deg}°`}
    >
      <ArrowUp size={12} />
    </span>
  );
}

function RefreshBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="ml-auto text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
    >
      <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
      {loading ? 'Refreshing…' : 'Refresh'}
    </button>
  );
}

// ─── Hourly bar chart ─────────────────────────────────────────────────────────

function HourlyChart({
  hours,
  values,
  maxValue,
  color,
  unit,
  startIdx,
  count,
}: {
  hours: string[];
  values: number[];
  maxValue: number;
  color: string;
  unit: string;
  startIdx: number;
  count: number;
}) {
  const slice = values.slice(startIdx, startIdx + count);
  const timeSlice = hours.slice(startIdx, startIdx + count);
  const max = Math.max(...slice, maxValue * 0.1);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex items-end gap-1.5 min-w-max">
        {slice.map((v, i) => {
          const pct = Math.max(4, (v / max) * 100);
          return (
            <div key={i} className="flex flex-col items-center gap-1 w-10">
              <span className="text-[9px] text-[var(--muted)] tabular-nums">{v.toFixed(1)}{unit}</span>
              <div
                className="w-full rounded-t-sm transition-all"
                style={{ height: `${pct * 0.6}px`, backgroundColor: color, opacity: v > 0 ? 1 : 0.15 }}
              />
              <span className="text-[9px] text-[var(--muted)] whitespace-nowrap">
                {formatHour(timeSlice[i])}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Surf panel ───────────────────────────────────────────────────────────────

function SurfPanel() {
  const [spot, setSpot] = useState<SurfSpot>(SURF_SPOTS[1]); // Trestles default
  const [data, setData] = useState<SurfConditions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowIdx, setNowIdx] = useState(0);

  const load = useCallback(async (s: SurfSpot) => {
    setLoading(true);
    setError(null);
    try {
      const d = await fetchSurfConditions(s.lat, s.lon);
      setData(d);
      // Find current hour index
      const now = new Date();
      const idx = d.time.findIndex(t => new Date(t) >= now);
      setNowIdx(Math.max(0, idx - 1));
    } catch {
      setError('Could not load conditions. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(spot); }, [spot, load]);

  const now = data ? {
    swell:     data.swellHeightM[nowIdx] ?? 0,
    period:    data.swellPeriodS[nowIdx] ?? 0,
    wave:      data.waveHeightM[nowIdx] ?? 0,
    wind:      data.windSpeedKmh[nowIdx] ?? 0,
    windDir:   data.windDirectionDeg[nowIdx] ?? 0,
    swellDir:  data.swellDirectionDeg[nowIdx] ?? 0,
  } : null;

  const rating = now ? rateSurf(now.swell, now.period, now.wind) : null;

  return (
    <div className="space-y-6">
      {/* Spot picker */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Select spot</p>
        <div className="flex flex-wrap gap-2">
          {SURF_SPOTS.map(s => (
            <Pill key={s.name} active={spot.name === s.name} onClick={() => setSpot(s)}>
              {s.name}
            </Pill>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{spot.name}</p>
          <p className="text-xs text-[var(--muted)]">{spot.location}</p>
        </div>
        <RefreshBtn onClick={() => load(spot)} loading={loading} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading && !data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[var(--background)] h-20 rounded-xl" />
          ))}
        </div>
      )}

      {data && now && rating && (
        <>
          {/* Quality badge */}
          <div className="flex items-center gap-3">
            <div
              className="text-3xl font-black px-5 py-2 rounded-xl"
              style={{ backgroundColor: rating.color + '22', color: rating.color }}
            >
              {rating.label}
            </div>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= rating.stars ? rating.color : '#1f2937'} color={i <= rating.stars ? rating.color : '#1f2937'} />
              ))}
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBox
              label="Swell"
              value={`${mToFt(now.swell)} ft`}
              sub={`${now.swell.toFixed(1)} m · ${compassDir(now.swellDir)}`}
            />
            <StatBox
              label="Period"
              value={`${now.period?.toFixed(0) ?? '—'} s`}
              sub={now.period > 12 ? 'Long period — cleaner' : 'Short period — choppy'}
            />
            <StatBox
              label="Wind"
              value={`${kmhToMph(now.wind)} mph`}
              sub={<span className="flex items-center gap-1"><WindArrow deg={now.windDir} />{compassDir(now.windDir)}</span> as unknown as string}
            />
            <StatBox
              label="Wave Height"
              value={`${mToFt(now.wave)} ft`}
              sub={`${now.wave.toFixed(1)} m`}
            />
          </div>

          {/* 24-hour chart */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
              Swell — next 24 hrs
            </p>
            <HourlyChart
              hours={data.time}
              values={data.swellHeightM.map(v => parseFloat(mToFt(v)))}
              maxValue={10}
              color="#e8ff00"
              unit="ft"
              startIdx={nowIdx}
              count={24}
            />
          </div>

          {/* Day summary */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
              5-day outlook
            </p>
            <div className="space-y-2">
              {[0,1].map(dayOffset => {
                const start = nowIdx + dayOffset * 24;
                const daySlice = data.swellHeightM.slice(start, start + 24).filter(Boolean);
                if (!daySlice.length) return null;
                const maxSwell = Math.max(...daySlice);
                const avgWind = data.windSpeedKmh.slice(start, start + 24).reduce((a,b) => a+b,0) / 24;
                const avgPeriod = data.swellPeriodS.slice(start, start + 24).reduce((a,b) => a+b,0) / 24;
                const r = rateSurf(maxSwell, avgPeriod, avgWind);
                return (
                  <div key={dayOffset} className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-sm">{dayOffset === 0 ? 'Today' : formatDay(data.time[start])}</span>
                    <span className="text-sm text-[var(--muted)]">up to {mToFt(maxSwell)} ft</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: r.color + '22', color: r.color }}>
                      {r.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Snow panel ───────────────────────────────────────────────────────────────

function SnowPanel() {
  const [resort, setResort] = useState<SkiResort>(SKI_RESORTS[0]);
  const [data, setData] = useState<SnowConditions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowIdx, setNowIdx] = useState(0);

  const load = useCallback(async (r: SkiResort) => {
    setLoading(true);
    setError(null);
    try {
      const d = await fetchSnowConditions(r.lat, r.lon);
      setData(d);
      const now = new Date();
      const idx = d.time.findIndex(t => new Date(t) >= now);
      setNowIdx(Math.max(0, idx - 1));
    } catch {
      setError('Could not load conditions. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(resort); }, [resort, load]);

  const now = data ? {
    tempC:      data.tempC[nowIdx] ?? 0,
    snowDepthM: data.snowDepthM[nowIdx] ?? 0,
    windKmh:    data.windSpeedKmh[nowIdx] ?? 0,
    // Last 24h snowfall
    new24h:     data.snowfallCm.slice(Math.max(0, nowIdx - 24), nowIdx).reduce((a, b) => a + b, 0),
  } : null;

  // 5-day daily summary
  const dailySummary = data ? Array.from({ length: 5 }, (_, day) => {
    const start = nowIdx + day * 24;
    const snowSlice = data.snowfallCm.slice(start, start + 24);
    const tempSlice = data.tempC.slice(start, start + 24);
    return {
      label: day === 0 ? 'Today' : formatDay(data.time[start] ?? ''),
      snowCm: snowSlice.reduce((a, b) => a + b, 0),
      minC: Math.min(...tempSlice),
      maxC: Math.max(...tempSlice),
    };
  }) : [];

  return (
    <div className="space-y-6">
      {/* Resort picker */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2">Select resort</p>
        <div className="flex flex-wrap gap-2">
          {SKI_RESORTS.map(r => (
            <Pill key={r.name} active={resort.name === r.name} onClick={() => setResort(r)}>
              {r.name}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{resort.name}</p>
          <p className="text-xs text-[var(--muted)]">{resort.location}</p>
        </div>
        <RefreshBtn onClick={() => load(resort)} loading={loading} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading && !data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-pulse">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-[var(--background)] h-20 rounded-xl" />)}
        </div>
      )}

      {data && now && (
        <>
          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBox
              label="New Snow (24h)"
              value={`${now.new24h.toFixed(1)} cm`}
              sub={`${(now.new24h / 2.54).toFixed(1)} in`}
            />
            <StatBox
              label="Snow Base"
              value={`${(now.snowDepthM * 100).toFixed(0)} cm`}
              sub={`${(now.snowDepthM * 39.37).toFixed(0)} in`}
            />
            <StatBox
              label="Temperature"
              value={`${cToF(now.tempC)}°F`}
              sub={`${now.tempC.toFixed(1)}°C`}
            />
            <StatBox
              label="Wind"
              value={`${kmhToMph(now.windKmh)} mph`}
              sub={now.windKmh > 50
                ? <><AlertTriangle size={11} className="text-orange-400 shrink-0" /><span className="text-orange-400">Wind hold likely</span></>
                : 'Lifts should run'
              }
            />
          </div>

          {/* Snowfall chart */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
              Snowfall — next 48 hrs
            </p>
            <HourlyChart
              hours={data.time}
              values={data.snowfallCm}
              maxValue={5}
              color="#93c5fd"
              unit="cm"
              startIdx={nowIdx}
              count={48}
            />
          </div>

          {/* 5-day outlook */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
              5-day snow outlook
            </p>
            <div className="space-y-0">
              {dailySummary.map(({ label, snowCm, minC, maxC }) => (
                <div key={label} className="flex items-center gap-4 py-3 border-b border-[var(--border)]">
                  <span className="text-sm w-20 shrink-0">{label}</span>
                  {/* Snow bar */}
                  <div className="flex-1 bg-[var(--background)] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-400 transition-all"
                      style={{ width: `${Math.min(100, (snowCm / 30) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-blue-300 w-16 text-right">
                    {snowCm > 0 ? `${snowCm.toFixed(1)} cm` : 'No snow'}
                  </span>
                  <span className="text-xs text-[var(--muted)] w-20 text-right">
                    {cToF(minC)}° / {cToF(maxC)}°F
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

type Tab = 'surf' | 'snow';

export default function DailyConditions() {
  const [tab, setTab] = useState<Tab>('surf');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-0.5">
            Live Conditions
          </p>
          <p className="text-sm text-[var(--muted)]">{today}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[var(--background)] border border-[var(--border)] rounded-lg p-0.5">
            {([
            { value: 'surf' as Tab, Icon: Waves,     label: 'Surf' },
            { value: 'snow' as Tab, Icon: Snowflake,  label: 'Snow' },
          ]).map(({ value, Icon, label }) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`flex items-center gap-2 px-5 py-1.5 text-sm rounded-md transition-colors font-medium ${
                tab === value
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="p-6">
        {tab === 'surf' ? <SurfPanel /> : <SnowPanel />}
      </div>
    </div>
  );
}
