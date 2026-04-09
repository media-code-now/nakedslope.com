# NakedSlope.com — Site Architecture

**Tagline:** No fluff. Just gear.
**Model:** Affiliate SEO blog
**Cadence:** 1–2 articles/week

---

## URL Structure

```
nakedslope.com/
├── ski-snowboard/          # Ski & snowboard reviews, guides, comparisons
├── surfing/                # Surf gear, board reviews, wetsuit guides
├── overlanding/            # Overland builds, recovery gear, camp kit
├── best-gear/              # Cross-category top picks / roundups
└── about/
```

## Content Mix (per category)

| Type         | % of content | Intent        | Example                                    |
|--------------|-------------|---------------|--------------------------------------------|
| Commercial   | 60%         | Transactional | "Best Ski Helmets 2026", "Top Wetsuits"    |
| Informational| 40%         | Navigational  | "How to Size Ski Boots", "What is a snorkel lift" |

## Internal Linking Rules

- Every informational post links to ≥1 commercial roundup
- Every commercial roundup links to ≥1 informational explainer
- Category hubs link to top 5 posts per pillar
- Use exact-match anchor text for target keywords

---

## Affiliate Programs

| Program       | Category              | Cookie | Commission     |
|---------------|-----------------------|--------|----------------|
| Evo           | Ski, Surf             | 30d    | 5–8%           |
| Backcountry   | Ski, Overlanding      | 30d    | 8–10%          |
| Amazon        | All                   | 24h    | 3–10%          |
| Surfline      | Surfing (subscription)| 30d    | $10–$25/sub    |
| ARB           | Overlanding           | 45d    | 6%             |

---

## WordPress Setup

- **Theme:** GeneratePress (lightweight, SEO-clean)
- **Plugins required:**
  - Rank Math SEO (schema + XML sitemap)
  - WP Rocket or Perfmatters (speed)
  - Pretty Links (affiliate link cloaking + tracking)
  - Lasso (optional: affiliate link management)
  - WP Tasty (optional: table plugin for comparisons)
  - Cloudflare (CDN + DDoS)
  - UpdraftPlus (backups)

---

## Category Hub Pages

Each category page (`/ski-snowboard/`, etc.) should be:
- A manually curated editorial hub, NOT auto-generated
- ~800 words of intro copy + embedded post grid
- Target keyword: category head term (e.g., "ski gear reviews")
- Schema: `CollectionPage`
