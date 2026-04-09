# WordPress Setup Checklist

Complete these before publishing post #1.

---

## Hosting & Domain

- [ ] Host: WP Engine, Kinsta, or Cloudways (avoid shared hosting)
- [ ] PHP 8.2+, HTTP/2 enabled
- [ ] SSL certificate active (Let's Encrypt or host-provided)
- [ ] Cloudflare: DNS proxied, cache rules set, minification ON

---

## WordPress Core

- [ ] WP installed, admin email set to non-public address
- [ ] Permalinks: `/%category%/%postname%/`
- [ ] Timezone: UTC or your primary audience timezone
- [ ] Delete: Hello World post, Sample Page, default plugins (Akismet if not needed, Hello Dolly)
- [ ] Disable comments globally (Settings > Discussion) — use until traffic warrants moderation

---

## Theme: GeneratePress

- [ ] GeneratePress installed + GP Premium activated
- [ ] Global colors: set brand palette (see brand guide)
- [ ] Typography: clean sans-serif (Inter or DM Sans)
- [ ] Disable: sidebar on posts (full-width layout)
- [ ] Header: Logo + nav (Ski/Snowboard | Surfing | Overlanding | Best Gear)
- [ ] Footer: affiliate disclosure link, privacy policy, sitemap link

---

## Required Plugins

| Plugin           | Purpose                              | Config notes                              |
|------------------|--------------------------------------|-------------------------------------------|
| Rank Math SEO    | SEO, schema, XML sitemap             | Connect to Google Search Console          |
| WP Rocket        | Caching, speed                       | Enable Cloudflare integration             |
| Pretty Links     | Affiliate link cloaking + analytics  | Use `/go/` prefix, 307 redirect           |
| UpdraftPlus      | Backups                              | Daily to S3 or Google Drive               |
| Cloudflare plugin| Cache purge on publish               | Free tier fine                            |
| WP Tasty Tables  | Comparison tables                    | Optional — use for roundup posts          |

---

## Rank Math Configuration

- [ ] Connect Google Search Console
- [ ] Connect Google Analytics 4
- [ ] Enable: FAQ Schema, HowTo Schema, Product Schema
- [ ] XML Sitemap: submit to GSC and Bing Webmaster
- [ ] Set canonical URLs on all pages
- [ ] 404 monitor: ON
- [ ] Breadcrumbs: ON (set in GeneratePress too)

---

## Analytics & Tracking

- [ ] GA4 property created, data stream connected
- [ ] GTM container installed (recommended over direct GA4 embed)
- [ ] GTM triggers:
  - Affiliate click: link click → href contains `/go/`
  - Scroll depth: 25/50/75/100%
- [ ] GSC: domain property verified, sitemap submitted
- [ ] Bing Webmaster Tools: sitemap submitted

---

## Legal Pages (Required Before Launch)

- [ ] Privacy Policy (GDPR + CCPA compliant)
- [ ] Affiliate Disclosure (standalone page + on every post)
- [ ] Terms of Use

Use Iubenda or Termly to generate — don't write from scratch.

---

## Category Pages

Create these as WordPress categories, then add custom category descriptions (800+ words):

- `/ski-snowboard/` — "Ski & Snowboard Gear Reviews"
- `/surfing/` — "Surf Gear Reviews & Guides"
- `/overlanding/` — "Overlanding Gear & Build Guides"
- `/best-gear/` — "Best Outdoor Gear Picks"

Enable category pages in Rank Math with unique meta title + description.

---

## Pre-Launch Speed Test

Target scores before first post:
- Google PageSpeed (mobile): > 85
- Google PageSpeed (desktop): > 95
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
