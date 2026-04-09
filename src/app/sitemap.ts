import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/types/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nakedslope.com';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/conditions/`,
      lastModified: now,
      changeFrequency: 'always',
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((category) => ({
    url: `${baseUrl}/${category}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ski-snowboard/ski-length-calculator/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/surfing/wetsuit-thickness-calculator/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // All posts
  const posts = getAllPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}/`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...postPages];
}
