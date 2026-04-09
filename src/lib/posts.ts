import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter, Category } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function getAllSlugs(category: Category): string[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostBySlug(category: Category, slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft) return null;

  return {
    ...frontmatter,
    slug,
    category,
    content,
    readingTime: getReadingTime(content),
  };
}

export function getPostsByCategory(category: Category): Post[] {
  const slugs = getAllSlugs(category);
  return slugs
    .map((slug) => getPostBySlug(category, slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getAllPosts(): Post[] {
  const categories: Category[] = ['ski-snowboard', 'surfing', 'overlanding', 'best-gear'];
  return categories
    .flatMap((cat) => getPostsByCategory(cat))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRecentPosts(count = 6): Post[] {
  return getAllPosts().slice(0, count);
}
