export type AbilityLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TerrainType = 'groomed' | 'all-mountain' | 'powder' | 'park' | 'backcountry';

export interface SkiLengthInput {
  heightCm: number;
  weightKg: number;
  ability: AbilityLevel;
  terrain: TerrainType;
}

export interface SkiLengthResult {
  minCm: number;
  maxCm: number;
  category: string;
  rationale: string;
  tip: string;
}

// Base offset from height (cm) by ability level
const ABILITY_OFFSET: Record<AbilityLevel, [number, number]> = {
  beginner:     [-20, -15],
  intermediate: [-10,  -5],
  advanced:     [ -5,   0],
  expert:       [  0,  +5],
};

// Terrain adjustment (cm) added on top of ability offset
const TERRAIN_OFFSET: Record<TerrainType, number> = {
  groomed:      -5,
  'all-mountain': 0,
  powder:       +8,
  park:         -8,
  backcountry:  +5,
};

// Average weight-for-height (kg) — used to detect over/under and adjust
function weightAdjustment(heightCm: number, weightKg: number): number {
  const avgWeightKg = (heightCm - 100) * 0.9; // rough BMI ~22 baseline
  const diff = weightKg - avgWeightKg;
  if (diff > 15) return +5;
  if (diff > 7) return +3;
  if (diff < -15) return -5;
  if (diff < -7) return -3;
  return 0;
}

const CATEGORY_LABELS: Record<TerrainType, string> = {
  groomed:       'Groomed Piste / Resort',
  'all-mountain': 'All-Mountain',
  powder:        'Powder / Off-Piste',
  park:          'Park & Freestyle',
  backcountry:   'Backcountry / Touring',
};

const TIPS: Record<TerrainType, string> = {
  groomed:
    'Shorter skis are easier to control on groomers. Go to the high end of your range if you ski fast.',
  'all-mountain':
    'The middle of your range is the safest bet. Err longer if you spend time off-piste.',
  powder:
    'Go to the top of your range or longer. Longer skis plane up in deep snow instead of diving.',
  park:
    'Go shorter — you need a ski that pivots quickly. Twin-tips measure to the tip, not the tail, so they ski shorter than they measure.',
  backcountry:
    'Prioritize uphill weight. A ski at the low end of your range is easier to skin and still performs going down.',
};

export function calculateSkiLength(input: SkiLengthInput): SkiLengthResult {
  const { heightCm, weightKg, ability, terrain } = input;

  const [minOffset, maxOffset] = ABILITY_OFFSET[ability];
  const terrainAdj = TERRAIN_OFFSET[terrain];
  const weightAdj = weightAdjustment(heightCm, weightKg);

  // Round to nearest 5cm — ski lengths come in 5cm increments
  const raw = (n: number) => Math.round((heightCm + n + terrainAdj + weightAdj) / 5) * 5;

  const minCm = raw(minOffset);
  const maxCm = raw(maxOffset);

  const rationale = `Based on your height (${heightCm} cm), ${ability} ability, and ${CATEGORY_LABELS[terrain].toLowerCase()} skiing.${
    weightAdj !== 0
      ? ` Weight adjustment: ${weightAdj > 0 ? '+' : ''}${weightAdj} cm.`
      : ''
  }`;

  return {
    minCm,
    maxCm,
    category: CATEGORY_LABELS[terrain],
    rationale,
    tip: TIPS[terrain],
  };
}

// Unit conversion helpers
export const cmToFtIn = (cm: number): string => {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inches = Math.round(totalIn % 12);
  return `${ft}'${inches}"`;
};

export const ftInToCm = (ft: number, inches: number): number =>
  Math.round((ft * 12 + inches) * 2.54);

export const lbsToKg = (lbs: number): number => Math.round(lbs * 0.453592);
export const kgToLbs = (kg: number): number => Math.round(kg * 2.20462);
