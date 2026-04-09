// ─── Surf spots with coordinates ─────────────────────────────────────────────

export interface SurfSpot {
  name: string;
  location: string;
  lat: number;
  lon: number;
  avgTempF: number;
}

export const SURF_SPOTS: SurfSpot[] = [
  { name: "Pipeline",      location: "Oahu, HI",          lat: 21.6411,  lon: -158.0546, avgTempF: 78 },
  { name: "Trestles",      location: "San Clemente, CA",  lat: 33.3856,  lon: -117.5895, avgTempF: 64 },
  { name: "Ocean Beach",   location: "San Francisco, CA", lat: 37.7641,  lon: -122.5119, avgTempF: 55 },
  { name: "Hossegor",      location: "France",            lat: 43.6647,  lon: -1.4346,   avgTempF: 60 },
  { name: "Jeffreys Bay",  location: "South Africa",      lat: -34.0490, lon: 24.9294,   avgTempF: 62 },
  { name: "Mundaka",       location: "Spain",             lat: 43.4064,  lon: -2.6987,   avgTempF: 57 },
  { name: "Bells Beach",   location: "Victoria, AU",      lat: -38.3561, lon: 144.2848,  avgTempF: 58 },
  { name: "Uluwatu",       location: "Bali, Indonesia",   lat: -8.8291,  lon: 115.0849,  avgTempF: 82 },
  { name: "Montauk",       location: "New York, NY",      lat: 41.0534,  lon: -71.9565,  avgTempF: 56 },
  { name: "Rincon",        location: "Santa Barbara, CA", lat: 34.3733,  lon: -119.4765, avgTempF: 60 },
];

// ─── Ski resorts with coordinates ─────────────────────────────────────────────

export interface SkiResort {
  name: string;
  location: string;
  lat: number;
  lon: number;
}

export const SKI_RESORTS: SkiResort[] = [
  { name: "Breckenridge",  location: "Colorado",     lat: 39.4817, lon: -106.0384 },
  { name: "Vail",          location: "Colorado",     lat: 39.6433, lon: -106.3781 },
  { name: "Park City",     location: "Utah",         lat: 40.6514, lon: -111.5080 },
  { name: "Mammoth",       location: "California",   lat: 37.6309, lon: -119.0326 },
  { name: "Whistler",      location: "BC, Canada",   lat: 50.1163, lon: -122.9574 },
  { name: "Jackson Hole",  location: "Wyoming",      lat: 43.5875, lon: -110.8279 },
  { name: "Squaw Valley",  location: "Lake Tahoe",   lat: 39.1968, lon: -120.2356 },
  { name: "Snowbird",      location: "Utah",         lat: 40.5830, lon: -111.6558 },
  { name: "Aspen",         location: "Colorado",     lat: 39.1911, lon: -106.8175 },
  { name: "Big Sky",       location: "Montana",      lat: 45.2839, lon: -111.4012 },
];

// ─── Open-Meteo API calls (no key required) ───────────────────────────────────

export interface SurfConditions {
  time: string[];
  waveHeightM: number[];
  wavePeriodS: number[];
  swellHeightM: number[];
  swellPeriodS: number[];
  swellDirectionDeg: number[];
  windSpeedKmh: number[];
  windDirectionDeg: number[];
}

export interface SnowConditions {
  time: string[];
  tempC: number[];
  snowfallCm: number[];
  snowDepthM: number[];
  windSpeedKmh: number[];
  precipMm: number[];
}

export async function fetchSurfConditions(lat: number, lon: number): Promise<SurfConditions> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: [
      "wave_height",
      "wave_period",
      "swell_wave_height",
      "swell_wave_period",
      "swell_wave_direction",
      "wind_speed_10m",
      "wind_direction_10m",
    ].join(","),
    forecast_days: "2",
    timezone: "auto",
  });

  const res = await fetch(`https://marine-api.open-meteo.com/v1/marine?${params}`, {
    next: { revalidate: 900 }, // 15 min cache
  });

  if (!res.ok) throw new Error("Failed to fetch surf conditions");
  const json = await res.json();
  const h = json.hourly;

  return {
    time:              h.time,
    waveHeightM:       h.wave_height,
    wavePeriodS:       h.wave_period,
    swellHeightM:      h.swell_wave_height,
    swellPeriodS:      h.swell_wave_period,
    swellDirectionDeg: h.swell_wave_direction,
    windSpeedKmh:      h.wind_speed_10m,
    windDirectionDeg:  h.wind_direction_10m,
  };
}

export async function fetchSnowConditions(lat: number, lon: number): Promise<SnowConditions> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: [
      "temperature_2m",
      "snowfall",
      "snow_depth",
      "wind_speed_10m",
      "precipitation",
    ].join(","),
    forecast_days: "5",
    timezone: "auto",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 900 },
  });

  if (!res.ok) throw new Error("Failed to fetch snow conditions");
  const json = await res.json();
  const h = json.hourly;

  return {
    time:         h.time,
    tempC:        h.temperature_2m,
    snowfallCm:   h.snowfall,
    snowDepthM:   h.snow_depth,
    windSpeedKmh: h.wind_speed_10m,
    precipMm:     h.precipitation,
  };
}

// ─── Surf quality rating ──────────────────────────────────────────────────────

export interface SurfRating {
  label: string;
  stars: number;       // 1–5
  color: string;
}

export function rateSurf(swellM: number, periodS: number, windKmh: number): SurfRating {
  const ft = swellM * 3.28084;
  let stars = 0;

  if (ft < 0.5)       stars = 0;
  else if (ft < 1.5)  stars = 1;
  else if (ft < 2.5)  stars = 2;
  else if (ft < 4)    stars = 3;
  else if (ft < 6)    stars = 4;
  else                stars = 5;

  // Longer period = cleaner, better quality
  if (periodS > 14 && stars > 0) stars = Math.min(5, stars + 1);
  else if (periodS < 8 && stars > 0) stars = Math.max(1, stars - 1);

  // Strong wind degrades quality
  if (windKmh > 30 && stars > 0) stars = Math.max(1, stars - 1);

  const map: Record<number, SurfRating> = {
    0: { label: "Flat",      stars: 0, color: "#6b7280" },
    1: { label: "Poor",      stars: 1, color: "#94a3b8" },
    2: { label: "Fair",      stars: 2, color: "#facc15" },
    3: { label: "Good",      stars: 3, color: "#84cc16" },
    4: { label: "Epic",      stars: 4, color: "#22c55e" },
    5: { label: "XXL",       stars: 5, color: "#e8ff00" },
  };

  return map[stars];
}

// ─── Unit helpers ─────────────────────────────────────────────────────────────

export const mToFt  = (m: number)   => (m * 3.28084).toFixed(1);
export const cToF   = (c: number)   => Math.round(c * 9 / 5 + 32);
export const kmhToMph = (k: number) => Math.round(k * 0.621371);

export function compassDir(deg: number): string {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export function formatHour(isoTime: string): string {
  const d = new Date(isoTime);
  return d.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

export function formatDay(isoTime: string): string {
  return new Date(isoTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
