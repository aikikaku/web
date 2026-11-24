import { describe, expect, it } from 'vitest';
import { propertyDocumentHref } from './propertyDocument';

describe('「物件資料」ボタンの行き先', () => {
  it('Docs の行の URL が入っている物件は、その物件の物件資料ページを開く（Docs そのものは開かない）', () => {
    for (const documentUrl of [
      'https://docs.superhuman.com/d/_dABC#_tugrid-xyz/_rui-row1',
      'https://docs.superhuman.com/d/_dABC/_suPage#_tugrid-xyz/r9&view=modal',
      'https://coda.io/d/_dABC/_suPage#_tugrid-xyz/r9',
    ]) {
      expect(propertyDocumentHref({ id: 'abc123', documentUrl })).toBe('https://docs.aikikaku.net/properties/abc123');
    }
  });

  it('Docs 以外の URL は、そのまま開く', () => {
    expect(propertyDocumentHref({ id: 'abc123', documentUrl: 'https://example.com/shiryo.pdf' })).toBe('https://example.com/shiryo.pdf');
  });

  it('空のときは資料なし', () => {
    expect(propertyDocumentHref({ id: 'abc123' })).toBeNull();
    expect(propertyDocumentHref({ id: 'abc123', documentUrl: '  ' })).toBeNull();
  });
});
