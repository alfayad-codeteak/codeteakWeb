import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.codeteak.com';

const privatePaths = ['/admin/', '/api/', '/products/lens', '/blog'];

// AI search engines, assistants, and browsing agents that may read and cite the site.
const aiAgents = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: aiAgents,
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: privatePaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
