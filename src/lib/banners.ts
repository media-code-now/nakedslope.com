import type { Category } from "@/types/content";

export interface BannerImage {
  id: string; // Unsplash photo ID
  alt: string;
  credit: string; // photographer name (attribution best practice)
  creditUrl: string;
}

// URL format: https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={w}&q=80
export function unsplashUrl(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export const HOME_BANNER: BannerImage = {
  id: "1483728642387-6c3bdd6c93e5",
  alt: "Wide panoramic view of snow-capped mountain peaks at sunrise",
  credit: "Rohit Tandon",
  creditUrl: "https://unsplash.com/@tandon_rohit",
};

// ─── Category hub banners ─────────────────────────────────────────────────────

export const CATEGORY_BANNERS: Record<Category, BannerImage> = {
  "ski-snowboard": {
    id: "1551698618-1dfe5d97d256",
    alt: "Skier carving a turn on a steep alpine slope with mountain peaks in the background",
    credit: "Maarten Duineveld",
    creditUrl: "https://unsplash.com/@maartenduineveld",
  },
  surfing: {
    id: "1507525428034-b723cf961d3e",
    alt: "Aerial view of ocean waves breaking on a tropical beach",
    credit: "Sean Oulashin",
    creditUrl: "https://unsplash.com/@oulashin",
  },
  overlanding: {
    id: "1527786356703-4b100091cd2c",
    alt: "4x4 truck on a dirt road winding through open mountain terrain",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com",
  },
  "best-gear": {
    id: "1523381294911-8d3cead13475",
    alt: "Outdoor gear and equipment laid out on a wooden surface",
    credit: "Clem Onojeghuo",
    creditUrl: "https://unsplash.com/@clemono",
  },
};

// ─── Per-article banners (keyed by slug) ─────────────────────────────────────
// Falls back to CATEGORY_BANNERS[category] if slug not listed here.

export const ARTICLE_BANNERS: Record<string, BannerImage> = {
  // ── Ski & Snowboard ──────────────────────────────────────────────────────────
  "best-ski-helmets-2026": {
    id: "1576858574144-9ae1ebcf5ae5",
    alt: "Skier on a snowy mountain slope with helmet and goggles",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com",
  },
  "best-ski-goggles-2026": {
    id: "1551698618-1dfe5d97d256",
    alt: "Skier carving a steep alpine slope — close-up of goggles",
    credit: "Maarten Duineveld",
    creditUrl: "https://unsplash.com/@maartenduineveld",
  },
  "best-ski-boots-2026": {
    id: "1519681393784-d120267933ba",
    alt: "Skis and boots planted in deep powder snow at dusk",
    credit: "Ales Krivec",
    creditUrl: "https://unsplash.com/@aleskrivec",
  },
  "best-all-mountain-skis-2026": {
    id: "1483728642387-6c3bdd6c93e5",
    alt: "Wide panoramic view of snow-capped mountain peaks at sunrise",
    credit: "Rohit Tandon",
    creditUrl: "https://unsplash.com/@tandon_rohit",
  },
  // ── Surfing ──────────────────────────────────────────────────────────────────
  "best-wetsuits-2026": {
    id: "1502680390469-be75c86b636f",
    alt: "Surfer paddling out through a clean breaking wave at dawn",
    credit: "Jeremy Bishop",
    creditUrl: "https://unsplash.com/@jeremybishop",
  },
  "best-beginner-surfboards-2026": {
    id: "1507525428034-b723cf961d3e",
    alt: "Aerial view of ocean waves breaking on a tropical beach",
    credit: "Sean Oulashin",
    creditUrl: "https://unsplash.com/@oulashin",
  },
  // ── Overlanding ──────────────────────────────────────────────────────────────
  "best-overland-recovery-gear": {
    id: "1533591380348-14193f1de18f",
    alt: "Off-road 4x4 vehicle on a remote trail through desert terrain",
    credit: "Destination Blanc",
    creditUrl: "https://unsplash.com/@destinationblanc",
  },
  "best-rooftop-tents-2026": {
    id: "1527786356703-4b100091cd2c",
    alt: "4x4 truck on a dirt road through open mountain terrain at dusk",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com",
  },
  // ── Best Gear ────────────────────────────────────────────────────────────────
  "best-action-cameras-2026": {
    id: "1523381294911-8d3cead13475",
    alt: "Outdoor gear and equipment laid out on a wooden surface",
    credit: "Clem Onojeghuo",
    creditUrl: "https://unsplash.com/@clemono",
  },
};

// ─── Tool page banners (keyed by tool slug) ───────────────────────────────────

export const TOOL_BANNERS: Record<string, BannerImage> = {
  "ski-length-calculator": {
    id: "1519681393784-d120267933ba",
    alt: "Skis stood upright in deep powder snow with mountain range at dusk",
    credit: "Ales Krivec",
    creditUrl: "https://unsplash.com/@aleskrivec",
  },
  "wetsuit-thickness-calculator": {
    id: "1509914398892-963f53e6e2f1",
    alt: "Ocean waves at a surf break with clear blue water",
    credit: "Unsplash",
    creditUrl: "https://unsplash.com",
  },
  "tire-psi-calculator": {
    id: "1464822759023-fed622ff2c3b",
    alt: "Off-road tires on rocky terrain in mountain backcountry",
    credit: "Emre Gencer",
    creditUrl: "https://unsplash.com/@emregencer",
  },
};

// ─── Helper: resolve the right banner for an article ─────────────────────────

export function getArticleBanner(slug: string, category: Category): BannerImage {
  return ARTICLE_BANNERS[slug] ?? CATEGORY_BANNERS[category];
}
