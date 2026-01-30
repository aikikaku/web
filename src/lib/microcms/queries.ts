import { client } from './client';
import {
  Property,
  Story,
  Region,
  CustomerVoice,
  StaffInterview,
  Page,
} from '@/types/microcms';
import {
  mockGetProperties,
  mockGetProperty,
  mockGetStories,
  mockGetStory,
  mockGetRegions,
  mockGetCustomerVoices,
  mockGetStaffInterviews,
  mockGetPageBySlug,
} from '@/lib/mock/data';
import { isMockMode } from '@/lib/env';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (isMockMode) return mockGetPageBySlug(slug);

  const data = await client
    .getList<Page>({
      endpoint: 'pages',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    })
    .catch(() => null);

  return data?.contents?.[0] ?? null;
}

export async function getProperties(queries: Record<string, unknown> = {}) {
  if (isMockMode) return mockGetProperties(queries);

  return client.getList<Property>({
    endpoint: 'properties',
    queries: queries as Record<string, string | number>,
  });
}

export async function getProperty(id: string) {
  if (isMockMode) {
    const p = mockGetProperty(id);
    if (!p) throw new Error('Not found');
    return p;
  }

  return client.getListDetail<Property>({
    endpoint: 'properties',
    contentId: id,
    queries: { depth: 2 },
  });
}

export async function getStories(queries: Record<string, unknown> = {}) {
  if (isMockMode) return mockGetStories(queries);

  return client.getList<Story>({
    endpoint: 'stories',
    queries: queries as Record<string, string | number>,
  });
}

export async function getStory(id: string) {
  if (isMockMode) {
    const s = mockGetStory(id);
    if (!s) throw new Error('Not found');
    return s;
  }

  return client.getListDetail<Story>({
    endpoint: 'stories',
    contentId: id,
    queries: { depth: 2 },
  });
}

export async function getRegions() {
  if (isMockMode) return mockGetRegions();

  return client.getList<Region>({
    endpoint: 'regions',
    queries: { limit: 50, orders: 'order' },
  });
}

export async function getCustomerVoices() {
  if (isMockMode) return mockGetCustomerVoices();

  return client.getList<CustomerVoice>({
    endpoint: 'customer-voices',
    queries: { limit: 50, orders: 'order' },
  });
}

export async function getStaffInterviews() {
  if (isMockMode) return mockGetStaffInterviews();

  return client.getList<StaffInterview>({
    endpoint: 'staff-interviews',
    queries: { limit: 20, orders: 'order' },
  });
}
