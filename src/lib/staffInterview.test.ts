import { describe, expect, it } from 'vitest';
import { staffInterviewFromCms, type StaffInterviewArticle } from './staffInterview';

const fallback: StaffInterviewArticle = {
  title: ['はじめの', 'タイトル'],
  lead: ['はじめのリード'],
  heroImage: '/hero.jpg',
  byline: 'はじめの書き手',
  sections: [{ paragraphs: ['はじめの本文'] }],
  writer: { name: '書いた人', description: '書いた人の紹介' },
  staffProfiles: [
    { name: '髙野大地', avatar: '/daichi.jpg', description: '大地の紹介' },
    { name: '髙野恒成', avatar: '/tsunenari.jpg', description: '恒成の紹介' },
  ],
};
const img = (url: string) => ({ url });

describe('スタッフインタビュー: microCMS の入力 → 表示用の形', () => {
  it('入力が無い・タイトルか本文が空のあいだは、はじめの原稿を出す', () => {
    expect(staffInterviewFromCms(null, fallback)).toBe(fallback);
    expect(staffInterviewFromCms({}, fallback)).toBe(fallback);
    expect(staffInterviewFromCms({ title: 'タイトルだけ' }, fallback)).toBe(fallback);
    expect(staffInterviewFromCms({ sections: [{ fieldId: 's', body: '本文だけ' }] }, fallback)).toBe(fallback);
    expect(staffInterviewFromCms({ title: 'タイトル', sections: [{ fieldId: 's', heading: '見出しだけ' }] }, fallback)).toBe(
      fallback,
    );
  });

  it('タイトルとリードは改行で句に分け、本文は空行で段落に分ける。段落の中の改行は残す', () => {
    const article = staffInterviewFromCms(
      {
        title: '街をつくるのは、\nそこに暮らす人たち。\n',
        lead: '三島で暮らし、\r\n三島で働く。',
        sections: [
          { fieldId: 's', body: '一つ目の段落。\n同じ段落の二行目。\n\n二つ目の段落。\n　\n\n三つ目の段落。' },
          { fieldId: 's', heading: ' 見出し ', body: '見出しの下の段落。', image: img('https://images.microcms-assets.io/a.jpg') },
        ],
      },
      fallback,
    );
    expect(article.title).toEqual(['街をつくるのは、', 'そこに暮らす人たち。']);
    expect(article.lead).toEqual(['三島で暮らし、', '三島で働く。']);
    expect(article.sections).toEqual([
      { heading: undefined, paragraphs: ['一つ目の段落。\n同じ段落の二行目。', '二つ目の段落。', '三つ目の段落。'], image: undefined },
      { heading: '見出し', paragraphs: ['見出しの下の段落。'], image: 'https://images.microcms-assets.io/a.jpg' },
    ]);
  });

  it('空のままの項目だけ、はじめの原稿のものを使う', () => {
    const article = staffInterviewFromCms({ title: 'タイトル', sections: [{ fieldId: 's', body: '本文' }] }, fallback);
    expect(article.title).toEqual(['タイトル']);
    expect(article.lead).toEqual(fallback.lead);
    expect(article.heroImage).toBe('/hero.jpg');
    expect(article.byline).toBe('はじめの書き手');
    expect(article.writer).toEqual(fallback.writer);
    expect(article.staffProfiles).toEqual(fallback.staffProfiles);
  });

  it('入力した項目は、入力のものを使う。スタッフの顔写真が空なら、同じ名前の人のはじめの写真を使う', () => {
    const article = staffInterviewFromCms(
      {
        title: 'タイトル',
        heroImage: img('https://images.microcms-assets.io/hero.jpg'),
        byline: '新しい書き手',
        sections: [{ fieldId: 's', body: '本文' }, { fieldId: 's' }],
        writerName: '新しい人',
        writerDescription: '新しい紹介',
        staffProfiles: [
          { fieldId: 'p', name: '髙野大地', description: '新しい大地の紹介' },
          { fieldId: 'p', name: '新しい人', avatar: img('https://images.microcms-assets.io/new.jpg'), description: '紹介' },
          { fieldId: 'p', name: '写真の無い人' },
          { fieldId: 'p', description: '名前の無い行は出さない' },
        ],
      },
      fallback,
    );
    expect(article.heroImage).toBe('https://images.microcms-assets.io/hero.jpg');
    expect(article.byline).toBe('新しい書き手');
    expect(article.sections).toHaveLength(1);
    expect(article.writer).toEqual({ name: '新しい人', description: '新しい紹介' });
    expect(article.staffProfiles).toEqual([
      { name: '髙野大地', avatar: '/daichi.jpg', description: '新しい大地の紹介' },
      { name: '新しい人', avatar: 'https://images.microcms-assets.io/new.jpg', description: '紹介' },
      { name: '写真の無い人', avatar: undefined, description: '' },
    ]);
  });
});
