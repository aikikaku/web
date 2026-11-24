import type { StaffInterview } from '@/types/microcms';

/** スタッフインタビューのページが表示に使う形 */
export interface StaffInterviewArticle {
  /** タイトル。意味の切れ目で改行させるため、句ごとに分けて持つ */
  title: string[];
  /** 本文の冒頭に出すリード。タイトルと同じく句ごと */
  lead: string[];
  /** 一番上の写真の URL */
  heroImage: string;
  /** 記事冒頭の「文：」に出す名前 */
  byline: string;
  sections: {
    /** 目次に出す見出し。冒頭の部分は見出しなし */
    heading?: string;
    /** 段落。段落の中の改行は \n のまま持ち、white-space: pre-line で表示する */
    paragraphs: string[];
    /** セクションの末尾に置く写真の URL */
    image?: string;
  }[];
  /** 記事末尾の「この記事を書いた人」 */
  writer: { name: string; description: string };
  staffProfiles: { name: string; avatar?: string; description: string }[];
}

/** 改行で区切って、空の行を捨てる（タイトル・リードの「句」） */
function lines(text: string | undefined): string[] {
  return (text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/** 空行で区切って段落にする。段落の中の改行は残す */
function paragraphs(text: string | undefined): string[] {
  return (text ?? '')
    .replace(/\r\n/g, '\n')
    .split(/\n[ \t　]*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/**
 * microCMS の「スタッフインタビュー」の入力を、ページの表示用の形に変える。
 *
 * - タイトルか本文が空のあいだ（まだ入力していない・取得できない）は、fallback（はじめの原稿）をそのまま返す
 * - 写真・リード・書いた人など、空のままの項目だけ fallback のものを使う
 * - スタッフの顔写真が空の時は、fallback にいる同じ名前の人の写真を使う
 */
export function staffInterviewFromCms(cms: StaffInterview | null, fallback: StaffInterviewArticle): StaffInterviewArticle {
  if (!cms) return fallback;

  const title = lines(cms.title);
  const sections = (cms.sections ?? [])
    .map((section) => ({
      heading: section.heading?.trim() || undefined,
      paragraphs: paragraphs(section.body),
      image: section.image?.url,
    }))
    .filter((section) => section.heading || section.paragraphs.length > 0 || section.image);
  if (title.length === 0 || !sections.some((section) => section.paragraphs.length > 0)) return fallback;

  const lead = lines(cms.lead);
  const staffProfiles = (cms.staffProfiles ?? [])
    .map((staff) => {
      const name = staff.name?.trim() ?? '';
      return {
        name,
        avatar: staff.avatar?.url ?? fallback.staffProfiles.find((f) => f.name === name)?.avatar,
        description: staff.description?.trim() ?? '',
      };
    })
    .filter((staff) => staff.name);

  return {
    title,
    lead: lead.length > 0 ? lead : fallback.lead,
    heroImage: cms.heroImage?.url ?? fallback.heroImage,
    byline: cms.byline?.trim() || fallback.byline,
    sections,
    writer: {
      name: cms.writerName?.trim() || fallback.writer.name,
      description: cms.writerDescription?.trim() || fallback.writer.description,
    },
    staffProfiles: staffProfiles.length > 0 ? staffProfiles : fallback.staffProfiles,
  };
}
