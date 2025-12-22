# 不動産会社Webサイト 実装計画書

## 1. プロジェクト概要

### 1.1 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フロントエンド | Next.js (App Router) | 14.x |
| 言語 | TypeScript | 5.x |
| CMS | microCMS | - |
| スタイリング | Tailwind CSS | 3.x |
| ホスティング | Vercel | - |
| フォーム | Formspree | - |

### 1.2 開発環境

- Node.js: 20.x LTS
- パッケージマネージャー: npm
- エディタ: VS Code（推奨）
- Git: 最新版

---

## 2. 実装フェーズ

### フェーズ0: プロジェクトセットアップ（1日）

#### タスク一覧
- [ ] microCMSアカウント作成・サービス作成
- [ ] Next.jsプロジェクト初期化
- [ ] TypeScript設定
- [ ] Tailwind CSS設定
- [ ] ESLint/Prettier設定
- [ ] Gitリポジトリ初期化
- [ ] Vercelプロジェクト作成・連携
- [ ] 環境変数設定

#### 詳細手順

**1. microCMSセットアップ**
1. https://microcms.io/ でアカウント作成
2. 新規サービス作成（サービス名: ai-kikaku）
3. APIキーを取得（設定 > APIキー）

**2. Next.jsプロジェクト初期化**
```bash
npx create-next-app@latest ai-kikaku --typescript --tailwind --app --eslint
cd ai-kikaku
```

**3. microCMS SDK インストール**
```bash
npm install microcms-js-sdk
```

**4. 環境変数設定**
`.env.local`を作成:
```env
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key
```

**5. ディレクトリ構造作成**
```bash
mkdir -p app/(routes)/properties app/(routes)/stories
mkdir -p components/ui components/property components/story
mkdir -p lib/microcms
mkdir -p types
```

---

### フェーズ1: microCMS API設計（1-2日）

#### タスク一覧
- [ ] Property（物件）API作成
- [ ] Story（ストーリー）API作成
- [ ] Region（地域）API作成
- [ ] CustomerVoice（お客様の声）API作成
- [ ] StaffInterview（スタッフインタビュー）API作成
- [ ] Page（静的ページ）API作成

#### API設計

microCMS管理画面でAPI作成（リスト形式）:

**1. Property（物件）API**
- エンドポイント: `properties`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| title | タイトル | テキストフィールド | ✓ | 物件タイトル |
| type | タイプ | セレクトフィールド | ✓ | sell（売り）/ rent（貸し） |
| category | 区分 | セレクトフィールド | ✓ | property（物件）/ land（土地） |
| label | ラベル | テキストフィールド |  | 中古住宅、売土地等 |
| status | ステータス | セレクトフィールド | ✓ | available（ご案内中）/ sold（成約済み） |
| description | 詳細説明 | リッチエディタ |  | 物件の詳細説明 |
| mainImage | メイン画像 | 画像 | ✓ | 物件のメイン画像 |
| images | 画像ギャラリー | 複数コンテンツ参照 |  | 複数の画像 |
| location | 所在地 | テキストフィールド |  |  |
| nearestStation | 最寄り駅 | テキストフィールド |  |  |
| landArea | 土地面積 | 数値 |  | 単位: m² |
| buildingArea | 建物面積 | 数値 |  | 単位: m² |
| layout | 間取り | テキストフィールド |  | 例: 3LDK |
| constructionDate | 築年月 | テキストフィールド |  | 例: 2020年3月 |
| schoolDistrict | 学区 | テキストフィールド |  |  |
| transactionType | 取引態様 | テキストフィールド |  |  |
| price | 価格 | 数値 |  | 単位: 万円 |
| rent | 賃料 | 数値 |  | 単位: 円/月 |
| remarks | 備考 | テキストエリア |  |  |
| story | 関連ストーリー | コンテンツ参照（stories） |  |  |
| regions | 地域 | 複数コンテンツ参照（regions） |  | 複数選択可 |

**2. Story（ストーリー）API**
- エンドポイント: `stories`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| title | タイトル | テキストフィールド | ✓ |
| subtitle | サブタイトル | テキストフィールド |  |
| content | 本文 | リッチエディタ | ✓ |
| thumbnail | サムネイル画像 | 画像 | ✓ |
| images | 画像ギャラリー | 複数コンテンツ参照 |  |
| property | 関連物件 | コンテンツ参照（properties） |  |
| regions | 地域 | 複数コンテンツ参照（regions） |  |

**3. Region（地域）API**
- エンドポイント: `regions`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| name | 地域名 | テキストフィールド | ✓ |
| order | 表示順序 | 数値 |  |

**初期データ:**
- 三島市
- 長泉町
- 清水町
- 沼津市
- 裾野市
- 函南町
- 伊豆の国市
- そのほかの地域

**4. CustomerVoice（お客様の声）API**
- エンドポイント: `customer-voices`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| customerName | お客様名 | テキストフィールド | ✓ |
| location | 地域 | テキストフィールド |  |
| propertyType | 物件タイプ | テキストフィールド |  |
| date | 日付 | テキストフィールド |  |
| content | 内容 | リッチエディタ | ✓ |
| order | 表示順序 | 数値 |  |

**5. StaffInterview（スタッフインタビュー）API**
- エンドポイント: `staff-interviews`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| staffName | スタッフ名 | テキストフィールド | ✓ |
| position | 役職 | テキストフィールド |  |
| photo | 写真 | 画像 |  |
| questions | Q&A | 繰り返しフィールド | ✓ |
| order | 表示順序 | 数値 |  |

**questionsフィールドの構造:**
- question（質問）: テキストエリア
- answer（回答）: テキストエリア

**6. Page（静的ページ）API**
- エンドポイント: `pages`
- API形式: リスト形式

**フィールド設定:**

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| slug | スラッグ | テキストフィールド | ✓ |
| title | タイトル | テキストフィールド | ✓ |
| content | 本文 | リッチエディタ | ✓ |

---

### フェーズ2: 共通コンポーネント実装（3-4日）

#### タスク一覧
- [ ] Layout（Header, Footer）
- [ ] Breadcrumb
- [ ] Button
- [ ] Card
- [ ] Filter
- [ ] Pagination
- [ ] RichText（microCMSのリッチテキスト表示）

#### 実装例

**components/ui/Header.tsx**
```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            アイ企画
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/properties" className="hover:text-blue-600">
                物件を探す
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-blue-600">
                暮らしを知る
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                アイ企画を知る
              </Link>
            </li>
            <li>
              <Link href="/for-customer" className="hover:text-blue-600">
                お探しの方へ
              </Link>
            </li>
            <li>
              <Link href="/for-owner" className="hover:text-blue-600">
                お持ちの方へ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
```

**components/ui/RichText.tsx**（microCMSのリッチエディタ内容を表示）
```typescript
interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
```

**app/layout.tsx**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'アイ企画 - 不動産情報',
  description: '静岡県の不動産情報',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### フェーズ3: microCMSクライアント・型定義実装（1日）

#### タスク一覧
- [ ] microCMSクライアント設定
- [ ] TypeScript型定義作成
- [ ] 画像URL生成ユーティリティ

#### 実装例

**lib/microcms/client.ts**
```typescript
import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
```

**types/microcms.ts**
```typescript
export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export interface Property {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  type: 'sell' | 'rent';
  category: 'property' | 'land';
  label?: string;
  status: 'available' | 'sold';
  description?: string;
  mainImage: MicroCMSImage;
  images?: MicroCMSImage[];
  location?: string;
  nearestStation?: string;
  landArea?: number;
  buildingArea?: number;
  layout?: string;
  constructionDate?: string;
  schoolDistrict?: string;
  transactionType?: string;
  price?: number;
  rent?: number;
  remarks?: string;
  story?: Story;
  regions?: Region[];
}

export interface Story {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  subtitle?: string;
  content: string;
  thumbnail: MicroCMSImage;
  images?: MicroCMSImage[];
  property?: Property;
  regions?: Region[];
}

export interface Region {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  order?: number;
}

export interface CustomerVoice {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  customerName: string;
  location?: string;
  propertyType?: string;
  date?: string;
  content: string;
  order?: number;
}

export interface QA {
  fieldId: string;
  question: string;
  answer: string;
}

export interface StaffInterview {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  staffName: string;
  position?: string;
  photo?: MicroCMSImage;
  questions: QA[];
  order?: number;
}

export interface Page {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  slug: string;
  title: string;
  content: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
```

**lib/microcms/image.ts**（画像URL生成ユーティリティ）
```typescript
import { MicroCMSImage } from '@/types/microcms';

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'scale' | 'max';
  format?: 'webp' | 'png' | 'jpg';
}

export function getImageUrl(
  image: MicroCMSImage,
  options: ImageOptions = {}
): string {
  const { width, height, fit = 'crop', format } = options;
  const params = new URLSearchParams();

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (fit) params.append('fit', fit);
  if (format) params.append('fm', format);

  const queryString = params.toString();
  return queryString ? `${image.url}?${queryString}` : image.url;
}
```

---

### フェーズ4: 物件機能実装（3-4日）

#### タスク一覧
- [ ] 物件一覧ページ
- [ ] 物件詳細ページ
- [ ] 物件カードコンポーネント
- [ ] 物件フィルターコンポーネント
- [ ] 物件画像ギャラリーコンポーネント

#### 実装例

**app/(routes)/properties/page.tsx**
```typescript
import { client } from '@/lib/microcms/client';
import { Property, MicroCMSListResponse } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilter from '@/components/property/PropertyFilter';

export const revalidate = 3600; // 1時間ごとに再検証

interface PropertiesPageProps {
  searchParams: {
    status?: string;
    type?: string;
    category?: string;
    regions?: string;
  };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  // フィルター条件構築
  const filters: string[] = [];

  if (searchParams.status === 'available') {
    filters.push('status[equals]available');
  }

  if (searchParams.type) {
    filters.push(`type[equals]${searchParams.type}`);
  }

  if (searchParams.category) {
    filters.push(`category[equals]${searchParams.category}`);
  }

  if (searchParams.regions) {
    const regionIds = searchParams.regions.split(',');
    filters.push(`regions[contains]${regionIds[0]}`);
  }

  const data = await client.get<MicroCMSListResponse<Property>>({
    endpoint: 'properties',
    queries: {
      limit: 100,
      filters: filters.join('[and]'),
      orders: '-publishedAt',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">物件を探す</h1>

      <PropertyFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data.contents.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {data.contents.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          条件に一致する物件が見つかりませんでした
        </p>
      )}
    </div>
  );
}
```

**app/(routes)/properties/[id]/page.tsx**
```typescript
import { client } from '@/lib/microcms/client';
import { Property, MicroCMSListResponse } from '@/types/microcms';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import RichText from '@/components/ui/RichText';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

// 静的パス生成
export async function generateStaticParams() {
  const data = await client.get<MicroCMSListResponse<Property>>({
    endpoint: 'properties',
    queries: {
      limit: 100,
      fields: 'id',
    },
  });

  return data.contents.map((property) => ({
    id: property.id,
  }));
}

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await client
    .get<Property>({
      endpoint: 'properties',
      contentId: params.id,
      queries: {
        depth: 2, // 関連コンテンツも取得
      },
    })
    .catch(() => null);

  if (!property) {
    notFound();
  }

  // 関連物件を取得（同じ地域の物件）
  const relatedProperties = await client.get<MicroCMSListResponse<Property>>({
    endpoint: 'properties',
    queries: {
      limit: 3,
      filters: `id[not_equals]${property.id}`,
      orders: '-publishedAt',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyGallery mainImage={property.mainImage} images={property.images} />

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          {property.label && (
            <span
              className={`px-3 py-1 text-sm rounded ${
                property.type === 'sell' ? 'bg-red-500' : 'bg-blue-500'
              } text-white`}
            >
              {property.label}
            </span>
          )}
          <span
            className={`px-3 py-1 text-sm rounded ${
              property.status === 'available'
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white'
            }`}
          >
            {property.status === 'available' ? 'ご案内中' : '成約済み'}
          </span>
        </div>

        <h1 className="text-3xl font-bold">{property.title}</h1>

        {property.description && (
          <div className="mt-4">
            <RichText content={property.description} />
          </div>
        )}
      </div>

      <PropertyDetails property={property} />

      {property.story && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">関連ストーリー</h2>
          <a
            href={`/stories/${property.story.id}`}
            className="text-blue-600 hover:underline"
          >
            {property.story.title}
          </a>
        </div>
      )}

      {relatedProperties.contents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">関連物件</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProperties.contents.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

**components/property/PropertyCard.tsx**
```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const labelColor = property.type === 'sell' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative h-48">
          <Image
            src={getImageUrl(property.mainImage, { width: 400, format: 'webp' })}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
          {property.label && (
            <span
              className={`absolute top-2 left-2 ${labelColor} text-white px-3 py-1 text-sm rounded`}
            >
              {property.label}
            </span>
          )}
          {property.status === 'sold' && (
            <span className="absolute top-2 right-2 bg-gray-600 text-white px-3 py-1 text-sm rounded">
              成約済み
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{property.title}</h3>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {property.price
              ? `${property.price.toLocaleString()}万円`
              : property.rent
              ? `${property.rent.toLocaleString()}円/月`
              : '価格応談'}
          </div>
          {property.layout && (
            <p className="text-sm text-gray-600">{property.layout}</p>
          )}
          {property.landArea && (
            <p className="text-sm text-gray-600">{property.landArea}m²</p>
          )}
          {property.regions && property.regions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {property.regions.map((region) => (
                <span
                  key={region.id}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {region.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
```

---

### フェーズ5: ストーリー機能実装（2-3日）

#### タスク一覧
- [ ] ストーリー一覧ページ
- [ ] ストーリー詳細ページ
- [ ] ストーリーカードコンポーネント

**実装方法は物件機能と同様**

---

### フェーズ6: 静的ページ実装（2-3日）

#### タスク一覧
- [ ] TOPページ
- [ ] アイ企画について
- [ ] ご挨拶
- [ ] スタッフインタビュー
- [ ] 不動産をお探しの方へ
- [ ] 不動産をお持ちの方へ
- [ ] お客様の声
- [ ] プライバシーポリシー

**実装例（TOPページ）:**

```typescript
// app/page.tsx
import { client } from '@/lib/microcms/client';
import { Property, Story, MicroCMSListResponse } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import StoryCard from '@/components/story/StoryCard';

export const revalidate = 3600;

export default async function HomePage() {
  // 新着物件（ご案内中のみ、最新6件）
  const newProperties = await client.get<MicroCMSListResponse<Property>>({
    endpoint: 'properties',
    queries: {
      limit: 6,
      filters: 'status[equals]available',
      orders: '-publishedAt',
    },
  });

  // 最新ストーリー（3件）
  const latestStories = await client.get<MicroCMSListResponse<Story>>({
    endpoint: 'stories',
    queries: {
      limit: 3,
      orders: '-publishedAt',
    },
  });

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            家族の想いを、<br />
            つなぐ不動産へ。
          </h1>
          <p className="text-lg text-gray-600">
            静岡県で暮らしを見つけるお手伝い
          </p>
        </div>
      </section>

      {/* 新着物件セクション */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">新着物件</h2>
          <a
            href="/properties?status=available"
            className="text-blue-600 hover:underline"
          >
            もっと見る →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProperties.contents.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* ストーリーセクション */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">暮らしを知る</h2>
            <a href="/stories" className="text-blue-600 hover:underline">
              もっと見る →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestStories.contents.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### フェーズ7: SEO・メタデータ実装（1日）

#### タスク一覧
- [ ] 動的メタデータ設定
- [ ] OGP設定
- [ ] 構造化データ実装
- [ ] サイトマップ生成
- [ ] robots.txt設定

**実装例:**

```typescript
// app/(routes)/properties/[id]/page.tsx にメタデータ追加
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const property = await client
    .get<Property>({
      endpoint: 'properties',
      contentId: params.id,
    })
    .catch(() => null);

  if (!property) {
    return {
      title: '物件が見つかりません',
    };
  }

  const imageUrl = getImageUrl(property.mainImage, {
    width: 1200,
    height: 630,
    format: 'webp',
  });

  return {
    title: `${property.title} | アイ企画`,
    description: `${property.location || ''} ${property.layout || ''} ${
      property.price
        ? `${property.price.toLocaleString()}万円`
        : property.rent
        ? `${property.rent.toLocaleString()}円/月`
        : ''
    }`.trim(),
    openGraph: {
      title: property.title,
      description: property.location || '',
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.location || '',
      images: [imageUrl],
    },
  };
}
```

---

### フェーズ8: レスポンシブデザイン調整（2-3日）

#### タスク一覧
- [ ] モバイルレイアウト調整
- [ ] タブレットレイアウト調整
- [ ] ハンバーガーメニュー実装
- [ ] 各種ブレークポイント確認

---

### フェーズ9: パフォーマンス最適化（1-2日）

#### タスク一覧
- [ ] 画像最適化確認（microCMS Image API活用）
- [ ] Lazy Loading実装
- [ ] Core Web Vitals測定・改善
- [ ] バンドルサイズ最適化

---

### フェーズ10: お問い合わせフォーム実装（1日）

#### タスク一覧
- [ ] Formspree設定
- [ ] フォームコンポーネント作成
- [ ] バリデーション実装
- [ ] 送信確認ページ作成

---

### フェーズ11: テスト・デバッグ（2-3日）

#### タスク一覧
- [ ] 各ページの動作確認
- [ ] フィルター機能テスト
- [ ] レスポンシブデザイン確認
- [ ] ブラウザ互換性確認
- [ ] アクセシビリティチェック
- [ ] SEO確認

---

### フェーズ12: デプロイ・本番環境設定（1日）

#### タスク一覧
- [ ] Vercelデプロイ
- [ ] 環境変数設定（本番）
- [ ] カスタムドメイン設定
- [ ] SSL証明書設定
- [ ] Google Analytics設定
- [ ] 最終動作確認

---

## 3. 工数見積もり

| フェーズ | 工数（日） |
|---------|----------|
| 0. プロジェクトセットアップ | 1 |
| 1. microCMS API設計 | 1-2 |
| 2. 共通コンポーネント実装 | 3-4 |
| 3. microCMSクライアント・型定義 | 1 |
| 4. 物件機能実装 | 3-4 |
| 5. ストーリー機能実装 | 2-3 |
| 6. 静的ページ実装 | 2-3 |
| 7. SEO・メタデータ実装 | 1 |
| 8. レスポンシブデザイン調整 | 2-3 |
| 9. パフォーマンス最適化 | 1-2 |
| 10. お問い合わせフォーム実装 | 1 |
| 11. テスト・デバッグ | 2-3 |
| 12. デプロイ・本番環境設定 | 1 |
| **合計** | **21-33日** |

**推奨スケジュール: 約1〜1.5ヶ月**

---

## 4. 開発環境セットアップ手順（詳細）

### 4.1 初回セットアップ

```bash
# 1. microCMSアカウント・サービス作成
# https://microcms.io/ でアカウント作成
# 新規サービス作成（サービス名: ai-kikaku）
# APIキーを取得

# 2. Next.jsプロジェクト作成
npx create-next-app@latest ai-kikaku --typescript --tailwind --app --eslint
cd ai-kikaku

# 3. microCMS SDKインストール
npm install microcms-js-sdk

# 4. 環境変数設定
cat > .env.local << EOF
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key
EOF

# 5. ディレクトリ構造作成
mkdir -p lib/microcms types
mkdir -p components/{ui,property,story}
mkdir -p app/\(routes\)/{properties,stories}

# 6. 開発サーバー起動
npm run dev
```

### 4.2 日常開発フロー

```bash
# フロントエンド開発サーバー起動
npm run dev

# ビルド確認
npm run build

# 本番環境プレビュー
npm run start
```

---

## 5. デプロイ手順

### 5.1 Vercelへのデプロイ

```bash
# Vercel CLIインストール（初回のみ）
npm i -g vercel

# デプロイ
vercel

# 本番デプロイ
vercel --prod
```

### 5.2 環境変数設定（Vercel）

Vercel Dashboardで以下を設定:
- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`

---

## 6. 保守・運用

### 6.1 定期メンテナンス

- パッケージアップデート: 月1回
- セキュリティアップデート: 随時
- バックアップ確認: 週1回（microCMSは自動バックアップ）

### 6.2 コンテンツ更新フロー

1. microCMS管理画面にログイン（https://[your-service].microcms.io/）
2. コンテンツ編集
3. プレビュー確認
4. 公開
5. ISRにより自動的にサイト更新（最大1時間後）

### 6.3 即座に更新を反映させる方法（オプション）

**Webhook設定:**
1. microCMS管理画面 > API設定 > Webhook
2. Vercel Deploy Hookを設定
3. コンテンツ公開時に自動ビルド

**Vercel Deploy Hook取得方法:**
1. Vercel Dashboard > Settings > Git > Deploy Hooks
2. Hook名を入力（例: microCMS Webhook）
3. ブランチ選択（main）
4. 生成されたURLをmicroCMSに設定

---

## 7. トラブルシューティング

### 7.1 よくある問題

**画像が表示されない**
- microCMSのCORS設定確認
- 環境変数確認
- next.config.jsのimages設定確認
  ```js
  // next.config.js
  module.exports = {
    images: {
      domains: ['images.microcms-assets.io'],
    },
  };
  ```

**APIレスポンスが遅い**
- ISRのrevalidate時間を調整
- microCMSのクエリ最適化（必要なフィールドのみ取得）
- CDN設定確認

**ビルドエラー**
- 環境変数の設定確認
- microCMS APIキーの権限確認

---

## 8. microCMS特有の機能活用

### 8.1 プレビュー機能

**下書きコンテンツのプレビュー:**

```typescript
// app/(routes)/properties/[id]/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('contentId');
  const draftKey = searchParams.get('draftKey');

  if (!contentId || !draftKey) {
    return new Response('Invalid parameters', { status: 400 });
  }

  // Draft Modeを有効化
  draftMode().enable();

  // 物件詳細ページへリダイレクト
  redirect(`/properties/${contentId}?draftKey=${draftKey}`);
}
```

### 8.2 全文検索の活用

```typescript
// 検索機能の実装例
const searchResults = await client.get({
  endpoint: 'properties',
  queries: {
    q: '三島市', // 全文検索
    limit: 20,
  },
});
```

---

## 9. 参考資料

- Next.js公式ドキュメント: https://nextjs.org/docs
- microCMS公式ドキュメント: https://document.microcms.io/
- Tailwind CSS公式ドキュメント: https://tailwindcss.com/docs
- Vercelドキュメント: https://vercel.com/docs

---

## 10. microCMS料金プラン

| プラン | 月額料金 | API呼び出し | ユーザー数 | おすすめ用途 |
|--------|---------|------------|-----------|-------------|
| Hobby | ¥0 | 10,000回 | 1 | 個人開発・検証 |
| Hobby | ¥980 | 50,000回 | 3 | 小規模サイト |
| Business | ¥49,800 | 2,000,000回 | 10 | 中規模サイト |

**今回のプロジェクト推奨:**
- 開発時: 無料プラン
- 本番運用: Hobby（¥980/月）で十分
  - 想定月間PV: 5,000〜10,000
  - API呼び出し: 約20,000〜30,000回/月

---

## 改訂履歴

| バージョン | 日付 | 変更内容 | 作成者 |
|-----------|------|---------|--------|
| 1.0 | 2025-12-22 | 初版作成（Sanityベース） | - |
| 2.0 | 2025-12-22 | microCMSベースに全面改訂 | - |
