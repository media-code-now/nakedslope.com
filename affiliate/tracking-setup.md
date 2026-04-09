# Affiliate Tracking Setup

## 1. Pretty Links — URL Cloaking Convention

All affiliate links should be cloaked under:
```
nakedslope.com/go/{program}/{product-slug}
```

Examples:
```
/go/evo/smith-vantage-helmet
/go/backcountry/osprey-soelden-42
/go/amazon/garmin-inreach-mini
/go/arb/air-compressor-twin
/go/surfline/premium-subscription
```

**Pretty Links settings:**
- Redirect type: 307 (temporary — preserves affiliate attribution)
- Track clicks: ON
- No-follow: ON (required for FTC + Google compliance)
- Categories: match site categories (ski, surf, overlanding)

---

## 2. Program-Specific Setup

### Evo (evo.com)
- Network: Evo in-house / Impact Radius
- Sign up: evo.com/affiliates
- Param format: `?utm_source=nakedslope&utm_medium=affiliate&utm_campaign={post-slug}`
- Deep link support: YES

### Backcountry (backcountry.com)
- Network: CJ Affiliate (Commission Junction)
- Publisher ID required
- Param: standard CJ tracking pixel
- Deep link support: YES

### Amazon Associates
- Program: Amazon Associates (associates.amazon.com)
- Tracking ID: `nakedslope-20` (set this during signup)
- Tag param: `?tag=nakedslope-20`
- NOTE: 24h cookie — prioritize high-AOV products, use as fallback

### Surfline
- Network: ShareASale
- Promote: Premium + Premium+ subscriptions
- Best placement: surfing category, surf trip planning posts

### ARB 4x4 Accessories
- Network: Direct / Impact
- Best placement: overlanding builds, recovery gear posts
- High AOV products = prioritize over Amazon for overlanding

---

## 3. UTM Convention (for GA4)

Apply to ALL outbound affiliate links:
```
utm_source=nakedslope
utm_medium=affiliate
utm_campaign={post-slug}
utm_content={link-position}  # e.g., hero-cta, in-content-1, comparison-table
```

---

## 4. FTC Disclosure

Required on every post with affiliate links. Use this block:

> **Disclosure:** NakedSlope.com earns a commission from purchases made through links on this page at no extra cost to you. We only recommend gear we'd actually use.

Place: below post title / above first product mention.

---

## 5. GA4 Events to Track

| Event                | Trigger                          |
|----------------------|----------------------------------|
| `affiliate_click`    | Click on any `/go/` link         |
| `scroll_depth`       | 25%, 50%, 75%, 100%              |
| `comparison_view`    | User scrolls to comparison table |
| `outbound_click`     | Any external link                |

Set up via GA4 > Configure > Events, or GTM trigger on link click matching `/go/`.
