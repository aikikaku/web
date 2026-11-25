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

/** カルーセルに出すお客様の声の件数。残りは一覧ページ（/voice）で見せる */
export const VOICE_CAROUSEL_LIMIT = 5;

/** 声の日付（date）の新しい順。同じ日付は「並び順」の小さい方を先に */
const LATEST_VOICES_ORDER = '-date,order';

/**
 * カルーセル用に、お客様の声を新しい順に VOICE_CAROUSEL_LIMIT 件だけ取る。
 * 公開日時（publishedAt）ではなく声の日付で並べる。まとめて登録すると公開日時は登録順になり、古い声が先頭に来るため。
 */
export function getLatestCustomerVoices() {
  return getCustomerVoices({ orders: LATEST_VOICES_ORDER, limit: VOICE_CAROUSEL_LIMIT });
}

export async function getCustomerVoices(options?: { orders?: string; limit?: number }) {
  if (isMockMode) {
    const data = mockGetCustomerVoices();
    let contents = data.contents;
    if (options?.orders === LATEST_VOICES_ORDER) {
      contents = [...contents].sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
    }
    if (options?.limit) contents = contents.slice(0, options.limit);
    return { ...data, contents };
  }

  return client.getList<CustomerVoice>({
    endpoint: 'customer-voices',
    queries: { limit: options?.limit ?? 50, orders: options?.orders ?? 'order' },
  });
}

/**
 * スタッフインタビューの記事（オブジェクト形式の API）。
 * API がまだ無い・入力がまだ無い時（404）は null を返し、ページはコードに持つ原稿を出す。
 * それ以外の失敗（通信の不調など）は投げる。作り直しが失敗になり、前に作ったページが出続ける
 * （null にすると、入力済みの記事がコードの原稿に戻ってしまう）
 */
export async function getStaffInterview(): Promise<StaffInterview | null> {
  if (isMockMode) return null;

  return client.getObject<StaffInterview>({ endpoint: 'staff-interview' }).catch((error: unknown) => {
    if (error instanceof Error && /\b404\b/.test(error.message)) return null;
    throw error;
  });
}

/**
 * 一覧を全件取得する（microCMS の1回の取得は最大 100 件のため、offset を進めて繰り返す）。
 * 「絞り込み」ボタンの該当件数など、全件の一部の項目だけが必要な時に使う
 */
export async function fetchAllPages<T>(
  fetchPage: (q: { limit: number; offset: number }) => Promise<{ contents: T[]; totalCount: number }>,
): Promise<T[]> {
  const LIMIT = 100;
  const first = await fetchPage({ limit: LIMIT, offset: 0 });
  const all = [...first.contents];
  for (let offset = LIMIT; offset < first.totalCount && offset < 1000; offset += LIMIT) {
    all.push(...(await fetchPage({ limit: LIMIT, offset })).contents);
  }
  return all;
}
