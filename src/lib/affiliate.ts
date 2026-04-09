/**
 * All affiliate links go through /go/[program]/[slug]
 * which redirects with a 307 and logs the click.
 *
 * UTM params are appended server-side in the redirect handler.
 */

export type AffiliateProgram = 'evo' | 'backcountry' | 'amazon' | 'surfline' | 'arb';

interface AffiliateProgramConfig {
  name: string;
  baseUrl: string;
  trackingParam: string;
  trackingValue: string;
  cookie: string;         // cookie window in days
  commission: string;
}

export const AFFILIATE_PROGRAMS: Record<AffiliateProgram, AffiliateProgramConfig> = {
  evo: {
    name: 'Evo',
    baseUrl: 'https://www.evo.com',
    trackingParam: 'utm_source',
    trackingValue: 'nakedslope',
    cookie: '30',
    commission: '5–8%',
  },
  backcountry: {
    name: 'Backcountry',
    baseUrl: 'https://www.backcountry.com',
    trackingParam: 'utm_source',
    trackingValue: 'nakedslope',
    cookie: '30',
    commission: '8–10%',
  },
  amazon: {
    name: 'Amazon',
    baseUrl: 'https://www.amazon.com',
    trackingParam: 'tag',
    trackingValue: 'nakedslope-20',
    cookie: '1',
    commission: '3–10%',
  },
  surfline: {
    name: 'Surfline',
    baseUrl: 'https://www.surfline.com',
    trackingParam: 'utm_source',
    trackingValue: 'nakedslope',
    cookie: '30',
    commission: '$10–$25/sub',
  },
  arb: {
    name: 'ARB',
    baseUrl: 'https://www.arb.com.au',
    trackingParam: 'utm_source',
    trackingValue: 'nakedslope',
    cookie: '45',
    commission: '6%',
  },
};

export function goLink(program: AffiliateProgram, slug: string): string {
  return `/go/${program}/${slug}`;
}

export const AFFILIATE_DISCLOSURE =
  'NakedSlope.com earns a commission from purchases made through links on this page at no extra cost to you. We only recommend gear we\'d actually use.';
