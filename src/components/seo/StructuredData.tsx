import type { Post } from '@/types/content';

interface WebsiteSchemaProps {
  url: string;
}

export function WebsiteSchema({ url }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NakedSlope',
    url,
    description: 'Honest gear reviews for skiers, snowboarders, surfers, and overlanders. No sponsored fluff — just what actually works.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  url: string;
}

export function OrganizationSchema({ url }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NakedSlope',
    url,
    logo: `${url}/icon.svg`,
    sameAs: [
      'https://twitter.com/nakedslope',
      // Add Instagram, YouTube, etc. when you have them
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  post: Post;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({ post, url, imageUrl }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': post.type === 'commercial' ? 'Product' : 'Article',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'NakedSlope',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NakedSlope',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(post.keywords.length > 0 && { keywords: post.keywords.join(', ') }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
