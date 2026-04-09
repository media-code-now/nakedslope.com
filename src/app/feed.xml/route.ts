import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts().slice(0, 50); // Most recent 50 posts
  const baseUrl = 'https://nakedslope.com';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>NakedSlope — No Fluff. Just Gear.</title>
    <link>${baseUrl}</link>
    <description>Honest gear reviews for skiers, snowboarders, surfers, and overlanders. No sponsored fluff — just what actually works.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.category}/${post.slug}/</link>
      <guid isPermaLink="true">${baseUrl}/${post.category}/${post.slug}/</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.keywords.map((kw) => `<category>${kw}</category>`).join('\n      ')}
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
