import type { StaffInterview } from '@/types/microcms';

/** 「」の発言の話し手。both は二人の言葉 */
export type StaffInterviewSpeaker = 'daichi' | 'tsunenari' | 'both';

/**
 * 原稿の「」の発言。どちらの言葉か分かるよう、ストーリー本文と同じアバター付きの吹き出し（Figma Comment 4470:14684）で出す。
 * はじめの原稿の話し手は、原稿に書かれていないため仮置き。microCMS では、段落の頭に「大地：」「恒成：」「ふたり：」と書いて決める
 */
export interface StaffInterviewQuote {
  speaker: StaffInterviewSpeaker;
  text: string;
}

/** microCMS の本文で、段落の頭に書く話し手の名前 */
const SPEAKER_LABELS: Record<string, StaffInterviewSpeaker> = {
  大地: 'daichi',
  恒成: 'tsunenari',
  ふたり: 'both',
  二人: 'both',
};

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
    /** 段落。段落の中の改行は \n のまま持ち、white-space: pre-line で表示する。発言は吹き出しで出す */
    paragraphs: (string | StaffInterviewQuote)[];
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
 * 「大地：」「恒成：」「ふたり：」で始まる段落を、その人の発言（吹き出し）にする。前後の「」は外す。
 * 話し手を書いていない段落は、「」で囲んであっても地の文のまま出す
 */
function quoteOrText(paragraph: string): string | StaffInterviewQuote {
  const match = paragraph.match(/^(\S+?)[ \t\u3000]*[：:][ \t\u3000]*([\s\S]+)$/);
  const speaker = match && SPEAKER_LABELS[match[1]];
  if (!match || !speaker) return paragraph;
  return { speaker, text: match[2].trim().replace(/^「([\s\S]*)」$/, '$1') };
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
      paragraphs: paragraphs(section.body).map(quoteOrText),
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
