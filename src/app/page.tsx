import { getRecentPosts } from "@/lib/posts";
import PostCard from "@/components/ui/PostCard";
import HomeHero from "@/components/ui/HomeHero";
import Marquee from "@/components/ui/Marquee";
import CategoryPanel from "@/components/ui/CategoryPanel";
import StatsBar from "@/components/ui/StatsBar";
import ToolsGrid from "@/components/ui/ToolsGrid";
import EditorialBar from "@/components/ui/EditorialBar";
import ConditionsPreview from "@/components/ui/ConditionsPreview";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import FeaturedStory from "@/components/ui/FeaturedStory";
import PhotoMosaic from "@/components/ui/PhotoMosaic";
import SeasonPicks from "@/components/ui/SeasonPicks";
import ReelsSlider from "@/components/ui/ReelsSlider";
import { CATEGORIES, type Category } from "@/types/content";
import { CATEGORY_BANNERS } from "@/lib/banners";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NakedSlope | Skiing, Surfing & Overlanding Gear Reviews",
  description:
    "Expert gear reviews, buying guides, and calculators for skiing, snowboarding, surfing, and overlanding. Get the best equipment for your next adventure.",
};

const CATEGORY_ORDER: Category[] = [
  "ski-snowboard",
  "surfing",
  "overlanding",
  "best-gear",
];

export default function HomePage() {
  const allPosts = getRecentPosts(6);
  const featuredPost = allPosts[0] ?? null;
  const latestPosts = allPosts.slice(1);

  return (
    <div className="grain">

      {/* 1 ── Full-screen hero */}
      <HomeHero />

      {/* 2 ── Accent marquee */}
      <Marquee
        items={["No Fluff", "Just Gear", "Ski & Snowboard", "Surfing", "Overlanding", "Honest Reviews", "Zero Sponsorships", "Real Terrain"]}
        accent
      />

      {/* 3 ── Featured story */}
      {featuredPost && <FeaturedStory post={featuredPost} />}

      {/* 4 ── Reels slider */}
      <ReelsSlider />

      {/* 5 ── Category panels */}
      <section className="py-10 md:py-16 max-w-7xl md:mx-auto">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-5 px-4 md:px-8">
          What we cover
        </h2>
        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-2">
          {CATEGORY_ORDER.map((cat, i) => (
            <div key={cat} className="shrink-0 w-[78vw] snap-start">
              <CategoryPanel
                label={CATEGORIES[cat].label}
                description={CATEGORIES[cat].description}
                href={`/${cat}/`}
                image={CATEGORY_BANNERS[cat]}
                index={i}
              />
            </div>
          ))}
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 px-8">
          {CATEGORY_ORDER.map((cat, i) => (
            <CategoryPanel
              key={cat}
              label={CATEGORIES[cat].label}
              description={CATEGORIES[cat].description}
              href={`/${cat}/`}
              image={CATEGORY_BANNERS[cat]}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* 5 ── Photo mosaic */}
      <PhotoMosaic />

      {/* 6 ── Stats bar */}
      <StatsBar />

      {/* 7 ── Tools grid */}
      <Marquee items={["Tested", "Ranked", "No Affiliate Fluff", "Real Talk", "Gear That Works", "Field Tested"]} />
      <ToolsGrid />

      {/* 8 ── Live conditions preview */}
      <Marquee items={["Live Surf Data", "Live Snow Data", "10 Surf Spots", "10 Ski Resorts", "Updated Every 15 Min"]} accent />
      <ConditionsPreview />

      {/* 9 ── Season picks */}
      <SeasonPicks />

      {/* 10 ── Editorial trust bar */}
      <EditorialBar />

      {/* 11 ── Latest articles */}
      {latestPosts.length > 0 && (
        <section className="py-10 md:py-16 max-w-7xl md:mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-5 px-4 md:px-8">
            Latest
          </h2>
          {/* Mobile: horizontal snap carousel */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-2">
            {latestPosts.map((post) => (
              <div key={post.slug} className="shrink-0 w-[80vw] snap-start">
                <PostCard post={post} showCategory />
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 px-8">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} showCategory />
            ))}
          </div>
        </section>
      )}

      {/* 12 ── Newsletter CTA */}
      <NewsletterCTA />

    </div>
  );
}
