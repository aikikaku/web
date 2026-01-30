import { client } from './client';
import {
  Property,
  Story,
  Region,
  CustomerVoice,
  StaffInterview,
  Page,
} from '@/types/microcms';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await client
    .getList<Page>({
      endpoint: 'pages',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    })
    .catch(() => null);

  return data?.contents?.[0] ?? null;
}

export async function getProperties(queries: Record<string, unknown> = {}) {
  return client.getList<Property>({
    endpoint: 'properties',
    queries: queries as Record<string, string | number>,
  });
}

export async function getProperty(id: string) {
  return client.getListDetail<Property>({
    endpoint: 'properties',
    contentId: id,
    queries: { depth: 2 },
  });
}

export async function getStories(queries: Record<string, unknown> = {}) {
  return client.getList<Story>({
    endpoint: 'stories',
    queries: queries as Record<string, string | number>,
  });
}

export async function getStory(id: string) {
  return client.getListDetail<Story>({
    endpoint: 'stories',
    contentId: id,
    queries: { depth: 2 },
  });
}

export async function getRegions() {
  return client.getList<Region>({
    endpoint: 'regions',
    queries: { limit: 50, orders: 'order' },
  });
}

export async function getCustomerVoices() {
  return client.getList<CustomerVoice>({
    endpoint: 'customer-voices',
    queries: { limit: 50, orders: 'order' },
  });
}

export async function getStaffInterviews() {
  return client.getList<StaffInterview>({
    endpoint: 'staff-interviews',
    queries: { limit: 20, orders: 'order' },
  });
}
