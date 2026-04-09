export type TempSensitivity = 'cold' | 'normal' | 'warm';
export type SessionLength = 'short' | 'medium' | 'long';
export type WaterTempUnit = 'f' | 'c';

export interface WetsuitInput {
  waterTempF: number;
  sensitivity: TempSensitivity;
  sessionLength: SessionLength;
}

export interface WetsuitResult {
  thickness: string;        // e.g. "4/3mm"
  type: string;             // e.g. "Full suit"
  accessories: string[];    // e.g. ["3mm boots", "hood recommended"]
  tempRangeF: [number, number];
  rationale: string;
  urgent: boolean;          // true when water is cold enough to be dangerous without gear
}

// ─── Core lookup table ────────────────────────────────────────────────────────
// Each tier: [minF, maxF, thickness, type, accessories, urgent]

interface Tier {
  minF: number;
  maxF: number;
  thickness: string;
  type: string;
  accessories: string[];
  urgent: boolean;
}

const TIERS: Tier[] = [
  {
    minF: 72, maxF: Infinity,
    thickness: 'None / Rash guard',
    type: 'Boardshorts or rash guard',
    accessories: [],
    urgent: false,
  },
  {
    minF: 68, maxF: 72,
    thickness: '1–2mm',
    type: 'Shorty or spring suit',
    accessories: [],
    urgent: false,
  },
  {
    minF: 62, maxF: 68,
    thickness: '2mm',
    type: 'Full suit',
    accessories: [],
    urgent: false,
  },
  {
    minF: 58, maxF: 62,
    thickness: '3/2mm',
    type: 'Full suit',
    accessories: ['3mm boots optional'],
    urgent: false,
  },
  {
    minF: 52, maxF: 58,
    thickness: '4/3mm',
    type: 'Full suit',
    accessories: ['3mm boots', 'gloves recommended'],
    urgent: false,
  },
  {
    minF: 48, maxF: 52,
    thickness: '5/4mm',
    type: 'Full suit',
    accessories: ['5mm boots', '3mm gloves', 'hood recommended'],
    urgent: true,
  },
  {
    minF: -Infinity, maxF: 48,
    thickness: '5/4mm – 6/5mm',
    type: 'Full suit',
    accessories: ['5mm boots', '5mm gloves', 'hood required'],
    urgent: true,
  },
];

// ─── Sensitivity and session adjustments ─────────────────────────────────────
// Each adjustment shifts the effective water temp up/down before lookup.
// "Cold-sensitive" → you feel colder, so treat the water as if it's cooler.

const SENSITIVITY_OFFSET_F: Record<TempSensitivity, number> = {
  cold:   -6,   // shift temp down → bumps into thicker tier
  normal:  0,
  warm:   +6,   // shift temp up → may drop a tier
};

const SESSION_OFFSET_F: Record<SessionLength, number> = {
  short:   +4,  // shorter session → body stays warmer
  medium:   0,
  long:    -6,  // long session → core temp drops, need more insulation
};

function getTier(effectiveTempF: number): Tier {
  return (
    TIERS.find((t) => effectiveTempF >= t.minF && effectiveTempF < t.maxF) ??
    TIERS[TIERS.length - 1]
  );
}

export function calculateWetsuit(input: WetsuitInput): WetsuitResult {
  const { waterTempF, sensitivity, sessionLength } = input;

  const effectiveTemp =
    waterTempF +
    SENSITIVITY_OFFSET_F[sensitivity] +
    SESSION_OFFSET_F[sessionLength];

  const tier = getTier(effectiveTemp);

  const adjustments: string[] = [];
  if (sensitivity !== 'normal') {
    adjustments.push(
      sensitivity === 'cold'
        ? 'cold-sensitive adjustment applied'
        : 'warm-natured adjustment applied'
    );
  }
  if (sessionLength !== 'medium') {
    adjustments.push(
      sessionLength === 'long' ? 'long session adjustment applied' : 'short session adjustment applied'
    );
  }

  const rationale =
    `At ${waterTempF}°F${adjustments.length ? ` (${adjustments.join(', ')})` : ''}, ` +
    `a ${tier.thickness} wetsuit keeps your core temp stable. ` +
    (tier.urgent
      ? 'At this temperature, hypothermia is a real risk — do not skip accessories.'
      : 'You can surf comfortably for a full session.');

  return {
    thickness: tier.thickness,
    type: tier.type,
    accessories: tier.accessories,
    tempRangeF: [tier.minF === -Infinity ? 0 : tier.minF, tier.maxF === Infinity ? 100 : tier.maxF],
    rationale,
    urgent: tier.urgent,
  };
}

// ─── Unit helpers ─────────────────────────────────────────────────────────────

export const cToF = (c: number): number => Math.round(c * 9 / 5 + 32);
export const fToC = (f: number): number => Math.round((f - 32) * 5 / 9);

// ─── Famous surf spots with avg water temp ────────────────────────────────────

export interface SurfSpot {
  name: string;
  location: string;
  avgTempF: number;
}

export const SURF_SPOTS: SurfSpot[] = [
  { name: 'Pipeline',         location: 'Oahu, HI',        avgTempF: 78 },
  { name: 'Trestles',         location: 'San Clemente, CA', avgTempF: 64 },
  { name: 'Ocean Beach',      location: 'San Francisco, CA', avgTempF: 55 },
  { name: 'Hossegor',         location: 'France',           avgTempF: 60 },
  { name: 'Jeffreys Bay',     location: 'South Africa',     avgTempF: 62 },
  { name: 'Mundaka',          location: 'Spain',            avgTempF: 57 },
  { name: 'Bells Beach',      location: 'Victoria, AU',     avgTempF: 58 },
  { name: 'Uluwatu',          location: 'Bali, Indonesia',  avgTempF: 82 },
  { name: 'Montauk',          location: 'New York, NY',     avgTempF: 56 },
  { name: 'Rincon',           location: 'Santa Barbara, CA', avgTempF: 60 },
];
