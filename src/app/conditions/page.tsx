import type { Metadata } from 'next';
import DailyConditions from '@/components/tools/DailyConditions';

export const metadata: Metadata = {
  title: 'Daily Conditions — Live Surf & Snow Report',
  description:
    'Live surf swell, wave height, and period for 10 global breaks. Live snowfall, base depth, and temperature for top ski resorts. Updated every 15 minutes.',
  keywords: [
    'surf report today',
    'live surf conditions',
    'snow report today',
    'ski resort snow conditions',
    'wave height forecast',
    'swell forecast',
  ],
};

export default function ConditionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
          Updated every 15 min · Powered by Open-Meteo
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Daily Conditions</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Live surf and snow data for the spots that matter. Pick your location, check conditions, go surf or ski.
        </p>
      </header>

      <DailyConditions />

      <p className="mt-8 text-xs text-[var(--muted)]">
        Data sourced from{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--foreground)]">
          Open-Meteo
        </a>{' '}
        — free, open-source weather API. Marine forecasts are model-derived; always check local reports before paddling out in large surf.
      </p>
    </div>
  );
}
