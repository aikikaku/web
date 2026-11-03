import { describe, expect, test } from 'vitest';
import { speakerFromStaff, toRichTextHtml } from './richTextHtml';

const html = (staff: string[] | undefined) => toRichTextHtml('<blockquote><p>静かな住宅地です。</p></blockquote>', speakerFromStaff(staff));

describe('吹き出しの話し手', () => {
  test('担当者を選んだ物件は、その人の名前と写真を出す', () => {
    const out = html(['髙野恒成']);
    expect(out).toContain('<span class="rich-comment-avatar-name">髙野恒成</span>');
    expect(out).toContain("background-image:url('/images/staff-interview/avatar-tsunenari.jpg')");
    expect(out).toContain('<div class="rich-comment-bubble"><p>静かな住宅地です。</p></div>');
  });

  test('大地さんを選んだ物件は、大地さんの写真を出す', () => {
    expect(html(['髙野大地'])).toContain("background-image:url('/images/staff-interview/avatar-daichi.jpg')");
  });

  test('担当者が未設定（microCMS では []）・知らない名前なら「アイ企画」のまま（写真は既定）', () => {
    for (const staff of [undefined, [], ['退職した人']]) {
      const out = html(staff);
      expect(out).toContain('<span class="rich-comment-avatar-name">アイ企画</span>');
      expect(out).toContain('<div class="rich-comment-avatar-circle"></div>');
    }
  });
});
