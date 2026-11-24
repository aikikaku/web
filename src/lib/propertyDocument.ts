/**
 * 物件ページの「物件資料」ボタンの行き先。
 *
 * microCMS の「物件資料 URL」（documentUrl）には、Docs（Superhuman Docs）の表の行の URL を入れる。
 * 行の URL は社内の表を開くものなので、そのまま開かず、その物件の物件資料ページ（別サイト）へ送る。
 * Docs 以外の URL（PDF など）が入っている物件は、今までどおりその URL を開く。
 */

/** 物件資料のサイト。NEXT_PUBLIC_PROPERTY_DOCS_URL で差し替えられる */
export const PROPERTY_DOCS_URL = (process.env.NEXT_PUBLIC_PROPERTY_DOCS_URL || 'https://docs.aikikaku.net').replace(/\/$/, '');

const DOCS_HOSTS = ['docs.superhuman.com', 'coda.io'];

/** Docs の中を指す URL か */
export function isDocsUrl(url: string): boolean {
  try {
    return DOCS_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

/** 「物件資料」ボタンで開く URL。資料が無い物件（documentUrl が空）は null */
export function propertyDocumentHref(property: { id: string; documentUrl?: string }): string | null {
  const url = property.documentUrl?.trim();
  if (!url) return null;
  return isDocsUrl(url) ? `${PROPERTY_DOCS_URL}/properties/${encodeURIComponent(property.id)}` : url;
}
