export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MicroCMSListContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface Region extends MicroCMSListContent {
  name: string;
  slug: string;
  order?: number;
}

export interface Property extends MicroCMSListContent {
  title: string;
  type: 'sell' | 'rent';
  category: 'property' | 'land';
  label?: string;
  status: 'available' | 'negotiating' | 'sold';
  description?: string;
  mainImage?: MicroCMSImage;
  images?: MicroCMSImage[];
  googleMapUrl?: string;
  documentUrl?: string;
  /** 担当者（セレクト）。本文の吹き出しにこの人の名前と写真を出す。未設定なら「アイ企画」 */
  staff?: string[];
  location?: string;
  nearestStation?: string;
  landArea?: number;
  buildingArea?: number;
  layout?: string;
  constructionDate?: string;
  schoolDistrict?: string;
  transactionType?: string;
  /** 価格（円）。表示は formatYen で「3,800 万円」の形にする */
  price?: number;
  /** 賃料（円/月） */
  rent?: number;
  remarks?: string;
  story?: Story;
  regions?: Region[];
}

export interface Story extends MicroCMSListContent {
  title: string;
  subtitle?: string;
  content: string;
  thumbnail: MicroCMSImage;
  images?: MicroCMSImage[];
  property?: Property;
  regions?: Region[];
  category?: 'daily' | 'regional' | 'property';
}

export interface CustomerVoice extends MicroCMSListContent {
  title?: string;
  customerName: string;
  category?: 'inherited' | 'found' | 'other';
  location: string;
  propertyType: string;
  date: string;
  content: string;
  image?: MicroCMSImage;
  order: number;
}

/**
 * スタッフインタビューの記事（オブジェクト形式の API `staff-interview`。1 件だけ）。
 * 必須はタイトルと本文だけ。空の項目は、コードに持つはじめの原稿のものを出す（src/lib/staffInterview.ts）
 */
export interface StaffInterview {
  /** 改行した位置で句を区切る（句の途中では折り返さない） */
  title?: string;
  lead?: string;
  heroImage?: MicroCMSImage;
  /** 記事冒頭の「文：」に出す名前 */
  byline?: string;
  sections?: {
    fieldId: string;
    heading?: string;
    /** 空行で段落を区切る。段落の中の改行はそのまま出る */
    body?: string;
    image?: MicroCMSImage;
  }[];
  writerName?: string;
  writerDescription?: string;
  staffProfiles?: {
    fieldId: string;
    name?: string;
    avatar?: MicroCMSImage;
    description?: string;
  }[];
}

export interface Page extends MicroCMSListContent {
  slug: string;
  title: string;
  content: string;
}

/** トップ PC ヒーローの表示枠（public 画像を slot ごとに列挙） */
export type HeroSlot = 'main' | 'topRight' | 'bottomRight';
