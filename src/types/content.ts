export type Category = 'ski-snowboard' | 'surfing' | 'overlanding' | 'best-gear';

export type PostType = 'commercial' | 'informational' | 'comparison';

export interface PostFrontmatter {
  title: string;
  description: string;
  category: Category;
  type: PostType;
  publishedAt: string;        // ISO date string
  updatedAt?: string;
  slug: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  keywords: string[];
  affiliateDisclosure?: boolean;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: number;        // minutes
}

export interface AffiliateLink {
  label: string;
  href: string;               // internal /go/ URL
  program: 'evo' | 'backcountry' | 'amazon' | 'surfline' | 'arb';
}

export const CATEGORIES: Record<Category, { label: string; description: string }> = {
  'ski-snowboard': {
    label: 'Ski & Snowboard',
    description: 'Gear reviews and guides for skiers and snowboarders. Helmets, boots, skis, bindings — all of it.',
  },
  surfing: {
    label: 'Surfing',
    description: 'Wetsuit reviews, board guides, fins, leashes, and surf forecasting tools. Tested in real water.',
  },
  overlanding: {
    label: 'Overlanding',
    description: 'Recovery gear, rooftop tents, fridges, and build guides for serious overlanders.',
  },
  'best-gear': {
    label: 'Best Gear',
    description: 'Top picks across all categories. If it makes the cut here, it earns its spot.',
  },
};
