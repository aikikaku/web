import { MetadataRoute } from 'next';
import { getProperties, getStories } from '@/lib/microcms/queries';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-kikaku.jp';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/properties`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/stories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/message`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/staff-interview`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/for-customer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/for-owner`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/voice`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // 物件ページ
  const properties = await getProperties({ limit: 100, fields: 'id,updatedAt' }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 100 }));

  const propertyPages = properties.contents.map((p) => ({
    url: `${BASE_URL}/properties/${p.id}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ストーリーページ
  const stories = await getStories({ limit: 100, fields: 'id,updatedAt' }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 100 }));

  const storyPages = stories.contents.map((s) => ({
    url: `${BASE_URL}/stories/${s.id}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...propertyPages, ...storyPages];
}
