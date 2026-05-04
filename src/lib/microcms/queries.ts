import { client } from './client';
import {
  Property,
  Story,
  Region,
  CustomerVoice,
  StaffInterview,
  Page,
  MicroCMSListResponse,
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

// microCMSのselectフィールドは配列で返るため、文字列に正規化する
function normalizeSelect<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeProperty(p: Property): Property {
  return {
    ...p,
    type: normalizeSelect(p.type),
    category: normalizeSelect(p.category),
    status: normalizeSelect(p.status),
  };
}

function normalizePropertyList(data: MicroCMSListResponse<Property>): MicroCMSListResponse<Property> {
  return { ...data, contents: data.contents.map(normalizeProperty) };
}

function normalizeStory(s: Story): Story {
  return {
    ...s,
    category: s.category ? normalizeSelect(s.category) : undefined,
  };
}

function normalizeStoryList(data: MicroCMSListResponse<Story>): MicroCMSListResponse<Story> {
  return { ...data, contents: data.contents.map(normalizeStory) };
}

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

  const data = await client.getList<Property>({
    endpoint: 'properties',
    queries: queries as Record<string, string | number>,
  });
  return normalizePropertyList(data);
}

export async function getProperty(id: string) {
  if (isMockMode) {
    const p = mockGetProperty(id);
    if (!p) throw new Error('Not found');
    return p;
  }

  const data = await client.getListDetail<Property>({
    endpoint: 'properties',
    contentId: id,
    queries: { depth: 2 },
  });
  return normalizeProperty(data);
}

export async function getStories(queries: Record<string, unknown> = {}) {
  if (isMockMode) return mockGetStories(queries);

  const data = await client.getList<Story>({
    endpoint: 'stories',
    queries: queries as Record<string, string | number>,
  });
  return normalizeStoryList(data);
}

export async function getStory(id: string) {
  if (isMockMode) {
    const s = mockGetStory(id);
    if (!s) throw new Error('Not found');
    return s;
  }

  const data = await client.getListDetail<Story>({
    endpoint: 'stories',
    contentId: id,
    queries: { depth: 2 },
  });
  return normalizeStory(data);
}

export async function getRegions() {
  if (isMockMode) return mockGetRegions();

  return client.getList<Region>({
    endpoint: 'regions',
    queries: { limit: 50, orders: 'order' },
  });
}

export async function getCustomerVoices(options?: { orders?: string; limit?: number }) {
  if (isMockMode) {
    const data = mockGetCustomerVoices();
    if (options?.orders === '-publishedAt') {
      return {
        ...data,
        contents: [...data.contents].sort(
          (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime(),
        ),
      };
    }
    return data;
  }

  return client.getList<CustomerVoice>({
    endpoint: 'customer-voices',
    queries: { limit: options?.limit ?? 50, orders: options?.orders ?? 'order' },
  });
}

export async function getStaffInterviews() {
  if (isMockMode) return mockGetStaffInterviews();

  return client.getList<StaffInterview>({
    endpoint: 'staff-interviews',
    queries: { limit: 20, orders: 'order' },
  });
}
