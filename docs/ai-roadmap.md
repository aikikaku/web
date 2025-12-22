# AI機能追加開発ロードマップ

**作成日**: 2025-12-23
**対象プロジェクト**: アイ企画 不動産会社Webサイト
**想定期間**: 2025年〜2026年

---

## エグゼクティブサマリー

本レポートは、アイ企画のWebサイトローンチ後に追加するAI機能について、技術的実装方針と準備事項をまとめたものです。

### 主要な推奨事項

1. **データ基盤の早期整備**: Webサイトリニューアル時点から構造化データとログ収集を開始
2. **段階的実装**: Plan A → Plan B → Plan C の順で、各3-4ヶ月で実装
3. **API設計の拡張性確保**: 将来のMCP対応を見据えた設計
4. **総投資額**: 約800万円〜1,200万円（24ヶ月間）

---

## 目次

1. [AI機能の全体像](#1-ai機能の全体像)
2. [現在の設計への影響分析](#2-現在の設計への影響分析)
3. [今から準備すべきこと](#3-今から準備すべきこと)
4. [各プランの詳細実装方針](#4-各プランの詳細実装方針)
5. [技術スタック推奨](#5-技術スタック推奨)
6. [実装ロードマップ](#6-実装ロードマップ)
7. [コスト見積もり](#7-コスト見積もり)
8. [リスクと対策](#8-リスクと対策)

---

## 1. AI機能の全体像

### 1.1 機能マップ

```
                    ┌─────────────────────────────────┐
                    │   ユーザー接点レイヤー          │
                    │  (Web / LINE / 音声)            │
                    └────────────┬────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────▼─────┐          ┌──────▼──────┐         ┌──────▼──────┐
   │ Plan A   │          │  Plan B     │         │  Plan C     │
   │ AI対話   │          │ ストーリー  │         │ 簡易査定    │
   │コンシェル│          │ 自動生成    │         │ & 投資分析  │
   └────┬─────┘          └──────┬──────┘         └──────┬──────┘
        │                       │                        │
        └───────────────┬───────┴────────────────────────┘
                        │
              ┌─────────▼──────────┐
              │  共通AIインフラ     │
              │ ・Vector DB         │
              │ ・LLM Gateway       │
              │ ・Knowledge Base    │
              └─────────┬──────────┘
                        │
              ┌─────────▼──────────┐
              │  データ基盤         │
              │ ・microCMS          │
              │ ・取引履歴DB        │
              │ ・行動ログ          │
              └────────────────────┘
```

### 1.2 各プランの位置づけ

| プラン | 目的 | ユーザー価値 | ビジネス価値 | 優先度 |
|--------|------|--------------|--------------|--------|
| **Plan A** | 情報探索の効率化 | 24/7即時回答、パーソナライズ提案 | 問い合わせ工数削減、CVR向上 | 🔴 高 |
| **Plan B** | コンテンツ生産性向上 | 全物件にストーリー、SEO改善 | 更新工数90%削減、PV増加 | 🟡 中 |
| **Plan C** | 初期評価の自動化 | 即時査定、投資判断支援 | リード獲得、データ蓄積 | 🟢 低 |
| **MCP対応** | 外部連携基盤 | どこでも同じ体験 | 露出拡大、収益多角化 | 🔵 長期 |

---

## 2. 現在の設計への影響分析

### 2.1 microCMS スキーマへの影響

#### ✅ 現在の設計で対応可能な部分

現在のスキーマは基本的にAI機能を見据えた設計になっています：

- `Property`の`description`（リッチテキスト）: AIが参照可能
- `Story`エンティティ: 自動生成コンテンツの格納先として利用可能
- `relatedStory`リレーション: AI提案の紐づけに対応

#### ⚠️ 追加・拡張が必要な部分

**1. Propertyスキーマの拡張**

```typescript
// 追加が必要なフィールド
interface PropertyExtension {
  // Plan B: ストーリー自動生成用
  aiGeneratedStory?: {
    draft: string;           // AI生成ドラフト
    approved: boolean;       // 承認フラグ
    generatedAt: string;
    version: number;
  };

  // Plan C: 査定情報
  estimatedPrice?: {
    value: number;
    confidence: number;      // 信頼度 0-1
    calculatedAt: string;
    factors: {               // 価格決定要因
      location: number;
      condition: number;
      market: number;
    };
  };

  // Plan A: AI対話用メタデータ
  searchKeywords?: string[]; // 検索最適化キーワード
  embeddingVector?: number[]; // ベクトル検索用（別DBで管理推奨）
  faqTags?: string[];        // よくある質問カテゴリ
}
```

**microCMS上の実装方法**:

1. **カスタムフィールド追加**（Phase 1で対応）
   - `AI生成ドラフト`: テキストエリア（非公開）
   - `承認済みフラグ`: 真偽値
   - `検索キーワード`: テキスト（複数）

2. **別APIエンドポイント作成**（Phase 2以降）
   - `ai-metadata`: AI専用メタデータAPI
   - `property`から参照リレーションで紐づけ

**推奨アプローチ**:
- Phase 1（現在）: 最小限のフィールド追加（`searchKeywords`, `aiDraft`）
- Phase 2（Plan B実装時）: `ai-metadata` API新規作成

**2. 新規APIエンドポイント**

| API名 | 種類 | 用途 | 作成タイミング |
|-------|------|------|----------------|
| `conversations` | リスト | AI対話履歴保存 | Plan A開始時 |
| `local-knowledge` | リスト | ローカルFAQ管理 | Plan A開始時 |
| `property-analytics` | オブジェクト | 物件分析データ | Plan C開始時 |
| `generation-history` | リスト | 生成履歴追跡 | Plan B開始時 |

### 2.2 アーキテクチャへの影響

#### 現在のアーキテクチャ（Phase 1完了時）

```
[Next.js App]
     ↓
[microCMS REST API]
     ↓
[Vercel Edge Network]
```

#### AI機能追加後のアーキテクチャ

```
[Next.js App] ←─────────┐
     ↓                   │
[microCMS] ──→ [Vector DB (Pinecone)]
     ↓                   │
[API Routes] ←──────────┤
     ↓                   │
[OpenAI / Anthropic] ───┘
     ↓
[Vercel KV (Session)]
     ↓
[BigQuery (Analytics)]
```

**追加が必要なインフラコンポーネント**:

1. **Vector Database**: Pinecone または Supabase Vector
2. **LLM Gateway**: OpenAI API / Anthropic Claude API
3. **セッションストア**: Vercel KV または Redis
4. **分析基盤**: BigQuery または Mixpanel
5. **画像解析**: Google Vision API / Restb.ai

### 2.3 データフロー設計への影響

#### 現在（静的サイト中心）

```
1. 管理者 → microCMS編集
2. Webhook → Vercel再デプロイ
3. ユーザー → 静的ページ閲覧
```

#### AI機能追加後（動的処理の追加）

```
1. 管理者 → microCMS編集
2. Webhook → AI処理トリガー → ドラフト生成
3. 承認 → 本番反映
4. ユーザー → AI対話 → リアルタイム応答
5. 行動ログ → BigQuery → モデル改善
```

**設計への影響**:
- Next.js App RouterでのRoute Handlers追加
- Server ActionsによるAI処理の実装
- Streaming Responseのサポート

---

## 3. 今から準備すべきこと

### 3.1 Phase 0（現在〜Webサイトローンチ）: 基盤整備

#### 🎯 最優先タスク

**1. データ構造の拡張性確保**

```typescript
// types/microcms.ts に追加

// AI拡張用の基底型
export interface AIEnhanceable {
  aiMetadata?: {
    lastProcessed?: string;
    version?: number;
    status?: 'pending' | 'processing' | 'completed' | 'failed';
  };
}

// Property型を拡張
export interface Property extends PropertyBase, AIEnhanceable {
  // 既存フィールド...

  // Phase 1で追加（すぐに実装可能）
  searchKeywords?: string[];

  // Phase 2以降で活用（今は空でOK）
  aiDraft?: string;
  aiApproved?: boolean;
}
```

**microCMS上の作業**（今すぐ実施可能）:
1. Property APIに以下フィールド追加:
   - `searchKeywords`: テキスト（複数値、任意）
   - `aiDraft`: テキストエリア（任意、非公開）
   - `aiApproved`: 真偽値（任意）

**2. 行動ログ収集の仕込み**

```typescript
// lib/analytics.ts （新規作成）

export interface UserAction {
  sessionId: string;
  userId?: string;
  action: 'view' | 'search' | 'filter' | 'inquiry' | 'favorite';
  target: {
    type: 'property' | 'story' | 'region';
    id: string;
  };
  metadata?: Record<string, any>;
  timestamp: string;
}

export async function trackAction(action: UserAction) {
  // Phase 0: console.log（開発環境）
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', action);
  }

  // Phase 1: 簡易保存（Vercel KV or localStorage）
  // Phase 2: BigQuery送信
}
```

**今すぐ実装**:
- 物件閲覧、検索、問い合わせのたびに`trackAction`を呼ぶ
- データは収集するだけ（分析は後回し）

**3. 構造化データの埋め込み**

```typescript
// app/properties/[id]/page.tsx
import { JsonLd } from '@/components/JsonLd';

export default async function PropertyPage({ params }: Props) {
  const property = await getProperty(params.id);

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: property.title,
        description: property.description,
        // ... 詳細は省略
      }} />
      {/* ページコンテンツ */}
    </>
  );
}
```

**メリット**:
- SEO改善（今すぐ効果あり）
- AI対話時の文脈理解向上（将来的）
- Google検索のリッチリザルト対応

**4. API設計の拡張性確保**

```typescript
// lib/microcms/client.ts に追加

// 将来のAI処理を見据えたラッパー関数
export async function getPropertyWithAI(id: string) {
  const property = await client.get({
    endpoint: 'properties',
    contentId: id,
  });

  // Phase 0: そのまま返す
  return property;

  // Phase 1以降: AI処理を追加
  // const aiEnhanced = await enhanceWithAI(property);
  // return aiEnhanced;
}
```

#### 📋 今すぐ作成すべきドキュメント

**`docs/ai-preparation.md`** を作成:

```markdown
# AI機能準備状況

## データ収集状況
- [ ] 物件閲覧ログ
- [ ] 検索クエリログ
- [ ] 問い合わせ内容
- [ ] ユーザー行動フロー

## ローカル知識蓄積
- [ ] よくある質問リスト
- [ ] 地域情報データベース
- [ ] 過去の取引事例
- [ ] 物件ストーリー素材

## 技術的準備
- [ ] 構造化データ実装
- [ ] ログ収集基盤
- [ ] API拡張性確保
```

### 3.2 Phase 1（ローンチ後1-3ヶ月）: データ蓄積期間

#### 🎯 目標

- 100件以上の物件データ
- 500件以上のユーザー行動ログ
- 50件以上のローカル知識FAQ

#### タスク

**1. ローカル知識のデータベース化**

既存の問い合わせや知見を構造化:

```typescript
// types/knowledge.ts

export interface LocalKnowledge {
  id: string;
  category: 'area' | 'process' | 'legal' | 'lifestyle' | 'history';
  question: string;
  answer: string;
  relatedRegions?: string[];
  relatedProperties?: string[];
  tags: string[];
  confidence: number; // 情報の信頼度
  source: string;     // 情報ソース
  lastVerified: string;
}
```

**microCMS上の作業**:
1. `local-knowledge` API新規作成（リスト形式）
2. 既存のFAQや知見を手動登録（週1-2件でOK）

**2. 画像・PDFの構造化準備**

```typescript
// lib/document-parser.ts

export async function parsePDF(url: string) {
  // Phase 1: 手動での構造化
  // Phase 2: AI-OCR自動化

  return {
    text: '...',
    sections: [],
    metadata: {}
  };
}
```

**3. OpenAI APIアカウント準備**

- OpenAI Platform でアカウント作成
- API Key取得（使用量制限設定）
- 課金設定（月5,000円程度から）

### 3.3 コード例: 今すぐ追加すべき実装

#### 1. 行動ログ収集

```typescript
// app/properties/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import { trackAction } from '@/lib/analytics';

export default function PropertyPage({ property }: Props) {
  useEffect(() => {
    // ページ閲覧を記録
    trackAction({
      sessionId: getSessionId(),
      action: 'view',
      target: {
        type: 'property',
        id: property.id,
      },
      metadata: {
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
      timestamp: new Date().toISOString(),
    });
  }, [property.id]);

  return (/* ... */);
}
```

#### 2. 検索クエリの保存

```typescript
// app/properties/page.tsx

async function handleSearch(query: string) {
  // 検索実行
  const results = await searchProperties(query);

  // クエリを保存（AI学習用）
  await trackAction({
    action: 'search',
    target: { type: 'property', id: 'all' },
    metadata: {
      query,
      resultCount: results.length,
      filters: getCurrentFilters(),
    },
  });

  return results;
}
```

#### 3. microCMSスキーマ拡張の実装

```typescript
// types/microcms.ts の Property インターフェース更新

export interface Property extends MicroCMSListContent {
  // ... 既存フィールド

  // ✅ 今すぐ追加（microCMS上で設定）
  searchKeywords?: string[];        // AI検索最適化用
  internalNotes?: string;           // 内部メモ（非公開）

  // 📌 フィールドは作成、値は空でOK（将来使用）
  aiDraft?: string;                 // AI生成ドラフト
  aiApproved?: boolean;             // 承認フラグ
  aiGeneratedAt?: string;           // 生成日時
}
```

**microCMS管理画面での設定手順**:

1. Property API の「APIスキーマ」を開く
2. 以下のフィールドを追加:

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|-------------|--------|------|------|------|
| `searchKeywords` | 検索キーワード | テキスト（複数） | × | AI検索用キーワード |
| `internalNotes` | 内部メモ | テキストエリア | × | 非公開情報 |
| `aiDraft` | AI生成ドラフト | テキストエリア | × | 自動生成されたストーリー案 |
| `aiApproved` | AI承認済み | 真偽値 | × | AIコンテンツ承認フラグ |

---

## 4. 各プランの詳細実装方針

### 4.1 Plan A: AIリスニング・コンシェルジュ

#### 概要

ユーザーの自然言語質問に対し、物件情報とローカル知識を組み合わせて回答するAIチャット機能。

#### 技術アーキテクチャ

```
[ユーザー]
    ↓ 質問「三島市で3LDK、駅近の物件は?」
[Next.js App Router]
    ↓ POST /api/chat
[API Route Handler]
    ↓ ①質問をEmbedding化
[OpenAI Embeddings API]
    ↓ ②類似コンテンツ検索
[Pinecone Vector DB] ← microCMSデータを事前にEmbedding
    ↓ ③検索結果を元にプロンプト生成
[OpenAI GPT-4 API]
    ↓ ④回答生成（Streaming）
[ユーザーに表示]
```

#### 実装の詳細

**1. Vector DBへのデータ投入**

```typescript
// scripts/sync-to-vectordb.ts

import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { getAllProperties } from '@/lib/microcms/client';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

async function syncPropertiesToVectorDB() {
  const properties = await getAllProperties();
  const index = pinecone.index('ai-kikaku-properties');

  for (const property of properties) {
    // テキスト化
    const text = `
      ${property.title}
      ${property.type === 'sell' ? '売り' : '貸し'}${property.category}
      ${property.region?.map(r => r.name).join(', ')}
      ${property.description}
      価格: ${property.price}
      ${property.nearestStation ? `最寄り駅: ${property.nearestStation}` : ''}
    `.trim();

    // Embedding生成
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    // Pineconeに保存
    await index.upsert([{
      id: property.id,
      values: embedding.data[0].embedding,
      metadata: {
        title: property.title,
        type: property.type,
        category: property.category,
        price: property.price,
        url: `/properties/${property.id}`,
      },
    }]);
  }

  console.log(`✅ ${properties.length}件の物件をVector DBに同期しました`);
}
```

**実行タイミング**:
- 初回: 手動実行
- 以降: microCMS Webhookから自動実行（物件更新時）

**2. チャットAPI実装**

```typescript
// app/api/chat/route.ts

import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { StreamingTextResponse, OpenAIStream } from 'ai';

const openai = new OpenAI();
const pinecone = new Pinecone();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // 1. ユーザーの質問をEmbedding化
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: lastMessage.content,
  });

  // 2. 類似物件を検索
  const index = pinecone.index('ai-kikaku-properties');
  const searchResults = await index.query({
    vector: embedding.data[0].embedding,
    topK: 5,
    includeMetadata: true,
  });

  // 3. ローカル知識も検索（FAQ等）
  const localKnowledge = await searchLocalKnowledge(lastMessage.content);

  // 4. システムプロンプト生成
  const systemPrompt = `
あなたは静岡県三島市の不動産会社「アイ企画」のAIアシスタントです。
以下の情報を元に、親切で具体的な回答をしてください。

【関連物件】
${searchResults.matches.map(m =>
  `・${m.metadata?.title}（${m.metadata?.type}, ${m.metadata?.price}）\n  URL: ${m.metadata?.url}`
).join('\n')}

【ローカル知識】
${localKnowledge.map(k => `Q: ${k.question}\nA: ${k.answer}`).join('\n\n')}

【回答ルール】
- 具体的な物件を3件まで提案
- URLを必ず含める
- 三島市の生活情報も適宜追加
- わからないことは「担当者に確認します」と正直に答える
`;

  // 5. GPT-4で回答生成（Streaming）
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    stream: true,
    temperature: 0.7,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

**3. フロントエンド実装**

```typescript
// components/ChatWidget.tsx

'use client';

import { useChat } from 'ai/react';

export function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white shadow-xl rounded-lg flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold">アイ企画AIアシスタント</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block p-3 rounded-lg ${
              m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400">入力中...</div>}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="物件について質問してください"
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
}
```

**4. 必要な環境変数**

```env
# .env.local に追加

# OpenAI
OPENAI_API_KEY=sk-...

# Pinecone
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east1-gcp
PINECONE_INDEX=ai-kikaku-properties

# Vercel KV（セッション管理用）
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

#### コスト見積もり（Plan A）

| 項目 | 月間利用 | 単価 | 月額コスト |
|------|----------|------|-----------|
| OpenAI GPT-4 | 10万トークン | $0.03/1Kトークン | $3,000 (約¥45万) |
| Embeddings | 100万トークン | $0.0001/1Kトークン | $100 (約¥1.5万) |
| Pinecone | 1M vectors | $70/month | $70 (約¥1万) |
| Vercel KV | 500MB | $20/month | $20 (約¥3千) |
| **合計** | - | - | **約¥50万/月** |

**コスト削減案**:
- GPT-4 → GPT-3.5-turbo で80%削減（約¥10万/月）
- Claude 3 Haiku併用でさらに削減可能

---

### 4.2 Plan B: ストーリー自動生成エンジン

#### 概要

物件情報とローカル知識を元に、魅力的なストーリーコンテンツを自動生成。人間が最終確認・編集。

#### 技術フロー

```
[microCMS: 新規物件登録]
    ↓ Webhook
[Vercel: /api/webhooks/property]
    ↓ ①物件データ取得
[物件画像解析] ← Google Vision API
    ↓ ②特徴抽出「明るいリビング」「庭付き」
[ストーリー生成] ← GPT-4
    ↓ ③ドラフト作成
[microCMS: aiDraftフィールドに保存]
    ↓ ④管理者確認・編集
[承認]
    ↓ ⑤Story APIに公開
[フロントエンドに表示]
```

#### 実装コード

**1. Webhook受信**

```typescript
// app/api/webhooks/property/route.ts

import { NextRequest } from 'next/server';
import { generateStory } from '@/lib/ai/story-generator';
import { updateProperty } from '@/lib/microcms/client';

export async function POST(req: NextRequest) {
  const { id, status, contents } = await req.json();

  // 新規作成または更新時のみ処理
  if (status !== 'DRAFT' && !contents.new.aiDraft) {
    const property = contents.new;

    // ストーリー生成（非同期）
    const story = await generateStory(property);

    // microCMSのaiDraftフィールドに保存
    await updateProperty(id, {
      aiDraft: story.content,
      aiGeneratedAt: new Date().toISOString(),
      aiApproved: false,
    });

    console.log(`✅ 物件 ${id} のストーリーを生成しました`);
  }

  return new Response('OK', { status: 200 });
}
```

**2. ストーリー生成ロジック**

```typescript
// lib/ai/story-generator.ts

import { OpenAI } from 'openai';
import { analyzeImages } from './image-analyzer';

const openai = new OpenAI();

export async function generateStory(property: Property) {
  // 1. 画像解析
  const imageFeatures = await analyzeImages(property.images);

  // 2. プロンプト構築
  const prompt = `
あなたは不動産ライターです。以下の物件情報から、魅力的なストーリーを600-800字で作成してください。

【物件情報】
タイトル: ${property.title}
タイプ: ${property.type === 'sell' ? '売買' : '賃貸'}
価格: ${property.price}
間取り: ${property.layout}
所在地: ${property.region?.map(r => r.name).join(', ')}
最寄り駅: ${property.nearestStation}

【画像から検出された特徴】
${imageFeatures.map(f => `・${f.label} (${Math.round(f.score * 100)}%)`).join('\n')}

【執筆ルール】
1. 実際に住む家族の視点で書く
2. 具体的な生活シーンを描写（朝の光、子供の遊び場など）
3. 地域の魅力も織り交ぜる（${property.region?.[0]?.name}の特徴）
4. 誇張表現は避け、事実ベースで
5. 最後に物件の客観情報サマリーを箇条書き

【出力形式】
# ストーリータイトル（20字以内）

本文...

## 物件サマリー
- 項目: 値
`;

  // 3. GPT-4で生成
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'あなたは不動産の魅力を伝えるプロのライターです。' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 1500,
  });

  const content = completion.choices[0].message.content || '';

  // 4. メタデータ抽出
  const title = content.match(/# (.+)/)?.[1] || property.title;

  return {
    title,
    content,
    imageFeatures,
    generatedAt: new Date().toISOString(),
    model: 'gpt-4-turbo-preview',
  };
}
```

**3. 画像解析**

```typescript
// lib/ai/image-analyzer.ts

import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function analyzeImages(images: MicroCMSImage[]) {
  const features: Array<{ label: string; score: number }> = [];

  for (const image of images.slice(0, 5)) { // 最大5枚
    const [result] = await client.labelDetection(image.url);
    const labels = result.labelAnnotations || [];

    features.push(...labels.map(l => ({
      label: l.description || '',
      score: l.score || 0,
    })));
  }

  // スコア順でソート、上位10件
  return features
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
```

**4. 管理画面での承認UI**

```typescript
// app/admin/stories/[id]/page.tsx

'use client';

import { useState } from 'react';
import { updateProperty } from '@/lib/microcms/client';

export default function StoryApprovalPage({ property }: Props) {
  const [draft, setDraft] = useState(property.aiDraft);

  async function handleApprove() {
    // Story APIに公開
    await createStory({
      title: extractTitle(draft),
      content: draft,
      relatedProperty: property.id,
    });

    // 承認フラグを立てる
    await updateProperty(property.id, {
      aiApproved: true,
    });

    alert('ストーリーを公開しました');
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1>AI生成ストーリー確認</h1>

      <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p>⚠️ AIが生成したドラフトです。内容を確認・編集してから公開してください。</p>
      </div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full h-96 p-4 border rounded font-mono"
      />

      <div className="mt-4 flex gap-4">
        <button onClick={handleApprove} className="btn-primary">
          承認して公開
        </button>
        <button onClick={() => regenerate()} className="btn-secondary">
          再生成
        </button>
      </div>
    </div>
  );
}
```

#### コスト見積もり（Plan B）

| 項目 | 月間利用 | 単価 | 月額コスト |
|------|----------|------|-----------|
| GPT-4（ストーリー生成） | 20物件 × 2K tokens | $0.03/1K | $1.2 (約¥180) |
| Google Vision API | 100画像 | $1.5/1K | $0.15 (約¥23) |
| microCMS Webhook | 無料枠内 | - | ¥0 |
| **合計** | - | - | **約¥200/月** |

**ROI**:
- 人間が1件書く時間: 2時間 × ¥3,000/時間 = ¥6,000
- AI生成: ¥10 + 校正30分（¥1,500）= ¥1,510
- **削減効果: 75%**

---

### 4.3 Plan C: 画像アップロード簡易査定

#### 概要

ユーザーが物件の写真をアップロードするだけで、AIが位置情報・外観状態を分析し、簡易査定レポートを生成。

#### 技術フロー

```
[ユーザー: 写真アップロード]
    ↓
[Next.js: /api/estimate]
    ↓ ①EXIF抽出
[位置情報取得] ← Geolocation API
    ↓ ②近隣相場検索
[microCMS: 近隣物件取得]
    ↓ ③画像解析
[Google Vision API] → 建物状態スコア
    ↓ ④価格算出
[回帰モデル（簡易版）]
    ↓ ⑤レポート生成
[PDF生成] ← Puppeteer
    ↓
[ユーザーにメール送信]
```

#### 実装コード

**1. アップロード & 解析API**

```typescript
// app/api/estimate/route.ts

import { NextRequest } from 'next/server';
import ExifReader from 'exifreader';
import vision from '@google-cloud/vision';
import { getNearbyProperties } from '@/lib/microcms/client';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  // 1. EXIF読み取り
  const buffer = await file.arrayBuffer();
  const exif = ExifReader.load(buffer);
  const lat = exif.GPSLatitude?.description;
  const lng = exif.GPSLongitude?.description;

  if (!lat || !lng) {
    return Response.json({ error: '位置情報が含まれていません' }, { status: 400 });
  }

  // 2. 画像解析（建物状態）
  const visionClient = new vision.ImageAnnotatorClient();
  const [result] = await visionClient.objectLocalization(buffer);

  const buildingCondition = analyzeBuildingCondition(result);

  // 3. 近隣相場取得
  const nearbyProperties = await getNearbyProperties(lat, lng, 1000); // 半径1km
  const averagePrice = calculateAveragePrice(nearbyProperties);

  // 4. 簡易価格算出
  const estimatedPrice = averagePrice * buildingCondition.multiplier;

  // 5. レポート生成
  const report = await generateReport({
    location: { lat, lng },
    buildingCondition,
    nearbyProperties,
    estimatedPrice,
  });

  return Response.json({
    estimatedPrice,
    confidence: buildingCondition.confidence,
    reportUrl: report.url,
  });
}

function analyzeBuildingCondition(visionResult: any) {
  // 簡易実装: 検出されたオブジェクトから状態推定
  const objects = visionResult.localizedObjectAnnotations || [];

  const hasGarden = objects.some((o: any) => o.name === 'Plant');
  const hasParking = objects.some((o: any) => o.name === 'Car');
  const buildingScore = objects.find((o: any) => o.name === 'Building')?.score || 0.5;

  let multiplier = 1.0;
  if (hasGarden) multiplier += 0.05;
  if (hasParking) multiplier += 0.08;
  if (buildingScore > 0.8) multiplier += 0.1; // 建物がクリアに写っている = 状態良好

  return {
    multiplier,
    confidence: buildingScore,
    features: { hasGarden, hasParking },
  };
}
```

**2. レポート生成（PDF）**

```typescript
// lib/report-generator.ts

import puppeteer from 'puppeteer';

export async function generateReport(data: EstimateData) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; padding: 40px; }
    .header { background: #1e40af; color: white; padding: 20px; }
    .price { font-size: 32px; font-weight: bold; color: #1e40af; }
  </style>
</head>
<body>
  <div class="header">
    <h1>不動産簡易査定レポート</h1>
    <p>アイ企画</p>
  </div>

  <h2>査定結果</h2>
  <div class="price">¥${data.estimatedPrice.toLocaleString()}</div>
  <p>信頼度: ${Math.round(data.confidence * 100)}%</p>

  <h2>近隣相場（半径1km）</h2>
  <ul>
    ${data.nearbyProperties.map(p => `
      <li>${p.title}: ¥${p.price.toLocaleString()}</li>
    `).join('')}
  </ul>

  <h2>検出された特徴</h2>
  <ul>
    ${data.buildingCondition.features.hasGarden ? '<li>庭あり (+5%)</li>' : ''}
    ${data.buildingCondition.features.hasParking ? '<li>駐車場あり (+8%)</li>' : ''}
  </ul>

  <p class="disclaimer">
    ※この査定は簡易的なものであり、実際の価格とは異なる場合があります。
    詳細な査定をご希望の場合は、お気軽にお問い合わせください。
  </p>
</body>
</html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  // Vercel Blobに保存
  const { put } = await import('@vercel/blob');
  const blob = await put(`reports/${Date.now()}.pdf`, pdf, {
    access: 'public',
  });

  return { url: blob.url };
}
```

#### コスト見積もり（Plan C）

| 項目 | 月間利用 | 単価 | 月額コスト |
|------|----------|------|-----------|
| Google Vision API | 50件 | $1.5/1K | $0.075 (約¥11) |
| Vercel Blob Storage | 100MB | $0.15/GB | $0.015 (約¥2) |
| Puppeteer（Serverless） | 50実行 | Vercel Pro内 | ¥0 |
| **合計** | - | - | **約¥13/月** |

---

### 4.4 Plan D: MCP（Model Context Protocol）対応

#### 概要

将来的に、Claude DesktopやLLM統合アプリから、アイ企画の不動産データに直接アクセスできるようにする。

#### 技術要件

**1. MCP Server実装**

```typescript
// mcp-server/index.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getAllProperties, getProperty } from './microcms-client.js';

const server = new Server({
  name: 'ai-kikaku-real-estate',
  version: '1.0.0',
}, {
  capabilities: {
    resources: {},
    tools: {},
  },
});

// リソース定義
server.setRequestHandler('resources/list', async () => ({
  resources: [
    {
      uri: 'aikikaku://properties',
      name: '物件一覧',
      mimeType: 'application/json',
    },
  ],
}));

server.setRequestHandler('resources/read', async (request) => {
  const uri = request.params.uri;

  if (uri === 'aikikaku://properties') {
    const properties = await getAllProperties();
    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(properties, null, 2),
      }],
    };
  }

  throw new Error('Unknown resource');
});

// ツール定義
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'search_properties',
    description: '物件を条件検索する',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['sell', 'rent'] },
        region: { type: 'string' },
        maxPrice: { type: 'number' },
      },
    },
  }],
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'search_properties') {
    const { type, region, maxPrice } = request.params.arguments;
    const results = await searchProperties({ type, region, maxPrice });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(results, null, 2),
      }],
    };
  }

  throw new Error('Unknown tool');
});

// 起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

**2. Claude Desktop設定**

```json
// ~/Library/Application Support/Claude/claude_desktop_config.json

{
  "mcpServers": {
    "ai-kikaku": {
      "command": "node",
      "args": ["/path/to/ai-kikaku/mcp-server/index.js"],
      "env": {
        "MICROCMS_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### 実装タイミング

- **Phase 1**: 基本的なリソース公開（物件一覧取得のみ）
- **Phase 2**: ツール実装（検索、フィルタリング）
- **Phase 3**: 双方向連携（外部から物件情報を更新）

---

## 5. 技術スタック推奨

### 5.1 AI関連サービス比較

| サービス | 用途 | 月額コスト | 推奨度 | 理由 |
|---------|------|-----------|--------|------|
| **OpenAI GPT-4** | 対話・生成 | ¥3-10万 | ⭐⭐⭐⭐ | 高品質、日本語対応良好 |
| **Anthropic Claude** | 対話・生成 | ¥1-3万 | ⭐⭐⭐⭐⭐ | コスパ良、長文対応 |
| **Google Gemini** | 対話・生成 | ¥0.5-2万 | ⭐⭐⭐ | 無料枠大、品質やや劣る |
| **OpenAI Embeddings** | Vector化 | ¥1-3万 | ⭐⭐⭐⭐⭐ | 高精度、低コスト |
| **Pinecone** | Vector DB | ¥1-3万 | ⭐⭐⭐⭐ | 専用サービス、高速 |
| **Supabase Vector** | Vector DB | ¥0-1万 | ⭐⭐⭐⭐⭐ | 既存PostgreSQL活用 |
| **Google Vision** | 画像解析 | ¥1-5千 | ⭐⭐⭐⭐ | 建物認識精度高い |
| **Vercel KV** | セッション | ¥0-2万 | ⭐⭐⭐⭐⭐ | Vercel統合、簡単 |

### 5.2 推奨構成（コストバランス重視）

```typescript
// 推奨技術スタック

export const AI_STACK = {
  // 対話・生成
  llm: {
    primary: 'Claude 3.5 Sonnet',   // Plan A, B
    fallback: 'GPT-3.5 Turbo',      // コスト削減時
  },

  // Embedding
  embedding: 'text-embedding-3-small', // OpenAI

  // Vector DB
  vectorDB: 'Supabase Vector',    // PostgreSQL拡張、低コスト

  // 画像解析
  vision: 'Google Vision API',

  // セッション
  session: 'Vercel KV',

  // 分析
  analytics: 'Vercel Analytics',  // 小規模ならこれで十分
};

// 月額コスト目安
// Plan A: 約¥5-10万
// Plan B: 約¥200
// Plan C: 約¥1,000
// 合計: 約¥5-11万/月
```

---

## 6. 実装ロードマップ

### 6.1 タイムライン

```
2025年
├─ Q1 (1-3月)
│  ├─ 1月: Webサイトローンチ ★
│  ├─ 2月: データ蓄積期間（ログ収集開始）
│  └─ 3月: Plan A 設計・開発開始
│
├─ Q2 (4-6月)
│  ├─ 4月: Plan A β版リリース
│  ├─ 5月: フィードバック収集・改善
│  └─ 6月: Plan B 開発開始
│
├─ Q3 (7-9月)
│  ├─ 7月: Plan B β版リリース
│  ├─ 8月: AI生成コンテンツの蓄積
│  └─ 9月: Plan C 開発開始
│
└─ Q4 (10-12月)
   ├─ 10月: Plan C β版リリース
   ├─ 11月: 全機能統合・最適化
   └─ 12月: MCP対応検討開始

2026年
├─ Q1: MCP Server開発
├─ Q2: 外部連携拡大
└─ Q3-Q4: プラットフォーム化
```

### 6.2 フェーズ別タスク詳細

#### Phase 0: 基盤準備（現在〜2025年1月）

| タスク | 担当 | 期間 | 成果物 |
|--------|------|------|--------|
| microCMSスキーマ拡張 | 開発者 | 1日 | `searchKeywords`等フィールド追加 |
| ログ収集実装 | 開発者 | 2日 | `trackAction()`関数 |
| 構造化データ埋め込み | 開発者 | 1日 | JSON-LD実装 |
| OpenAIアカウント作成 | 管理者 | 1時間 | APIキー取得 |

#### Phase 1: Plan A開発（2025年3-5月）

| タスク | 担当 | 期間 | 成果物 |
|--------|------|------|--------|
| Vector DB構築 | 開発者 | 3日 | Pinecone/Supabase設定 |
| Embedding生成スクリプト | 開発者 | 2日 | `sync-to-vectordb.ts` |
| チャットAPI実装 | 開発者 | 5日 | `/api/chat` |
| フロントエンドUI | 開発者 | 3日 | `ChatWidget.tsx` |
| ローカル知識登録 | 管理者 | 継続 | 50件のFAQ |
| β版テスト | 全員 | 2週間 | フィードバックレポート |

#### Phase 2: Plan B開発（2025年6-8月）

| タスク | 担当 | 期間 | 成果物 |
|--------|------|------|--------|
| Webhook設定 | 開発者 | 1日 | microCMS → Vercel |
| 画像解析実装 | 開発者 | 3日 | Google Vision統合 |
| ストーリー生成ロジック | 開発者 | 4日 | `story-generator.ts` |
| 承認UI作成 | 開発者 | 3日 | 管理画面 |
| プロンプトチューニング | 全員 | 2週間 | 品質向上 |

#### Phase 3: Plan C開発（2025年9-11月）

| タスク | 担当 | 期間 | 成果物 |
|--------|------|------|--------|
| アップロードUI | 開発者 | 2日 | フォーム実装 |
| EXIF解析 | 開発者 | 1日 | 位置情報抽出 |
| 価格算出ロジック | 開発者 | 4日 | 回帰モデル（簡易版） |
| レポートPDF生成 | 開発者 | 3日 | Puppeteer実装 |
| メール送信 | 開発者 | 1日 | Resend統合 |

---

## 7. コスト見積もり

### 7.1 開発コスト（初期）

| フェーズ | 内容 | 工数 | 単価 | 合計 |
|---------|------|------|------|------|
| Phase 0 | 基盤準備 | 4日 | ¥10万/日 | ¥40万 |
| Phase 1 | Plan A開発 | 15日 | ¥10万/日 | ¥150万 |
| Phase 2 | Plan B開発 | 12日 | ¥10万/日 | ¥120万 |
| Phase 3 | Plan C開発 | 10日 | ¥10万/日 | ¥100万 |
| **合計** | - | **41日** | - | **¥410万** |

### 7.2 運用コスト（月額）

| 項目 | Plan A | Plan B | Plan C | 合計 |
|------|--------|--------|--------|------|
| LLM API（Claude） | ¥10万 | ¥200 | ¥0 | **¥10.02万** |
| Embedding API | ¥1.5万 | - | - | **¥1.5万** |
| Vector DB | ¥1万 | - | - | **¥1万** |
| Vision API | - | ¥100 | ¥50 | **¥150** |
| Vercel Pro | ¥2万 | - | - | **¥2万** |
| その他 | ¥5千 | - | - | **¥0.5万** |
| **月額合計** | - | - | - | **約¥15万/月** |

**年間運用コスト**: 約¥180万

### 7.3 ROI分析

#### Plan A: AI対話コンシェルジュ

**コスト**:
- 開発: ¥150万（初回のみ）
- 運用: ¥12万/月 × 12ヶ月 = ¥144万/年
- **合計**: ¥294万/年

**効果**:
- 問い合わせ対応時間削減: 月20時間 × ¥3,000/時間 × 12ヶ月 = ¥72万/年
- CVR向上: 月10件 × 仲介手数料¥30万 = ¥300万/年（保守的見積もり）
- **合計効果**: ¥372万/年

**ROI**: (372 - 294) / 294 = **+26.5%**

#### Plan B: ストーリー自動生成

**コスト**:
- 開発: ¥120万（初回のみ）
- 運用: ¥200/月 × 12ヶ月 = ¥2,400/年
- **合計**: ¥122.4万/年

**効果**:
- コンテンツ制作時間削減: 月10件 × 2時間 × ¥3,000/時間 × 12ヶ月 = ¥72万/年
- SEO改善によるPV増加 → 月3件成約増 × ¥30万 = ¥90万/年
- **合計効果**: ¥162万/年

**ROI**: (162 - 122.4) / 122.4 = **+32.4%**

#### Plan C: 簡易査定

**コスト**:
- 開発: ¥100万（初回のみ）
- 運用: ¥1,000/月 × 12ヶ月 = ¥1.2万/年
- **合計**: ¥101.2万/年

**効果**:
- リード獲得: 月5件 × 成約率20% × ¥30万 = ¥30万/年
- **合計効果**: ¥30万/年

**ROI**: (30 - 101.2) / 101.2 = **-70.4%**（初年度）

**注**: Plan Cは2年目以降、開発コスト償却後に黒字化

### 7.4 総合ROI（3プラン合計）

| 項目 | 初年度 | 2年目以降（年間） |
|------|--------|------------------|
| 開発コスト | ¥410万 | ¥0 |
| 運用コスト | ¥180万 | ¥180万 |
| **総コスト** | **¥590万** | **¥180万** |
| 効果 | ¥564万 | ¥564万 |
| **ROI** | **-4.4%** | **+213%** |

**結論**: 初年度は若干の赤字だが、2年目以降は大幅な黒字。長期的には高いROI。

---

## 8. リスクと対策

### 8.1 技術リスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|----------|------|
| **AI回答の誤情報** | 高 | 中 | ・免責事項の明記<br>・人間による最終確認フロー<br>・信頼度スコア表示 |
| **API料金の高騰** | 中 | 低 | ・使用量上限設定<br>・複数プロバイダの併用<br>・オープンソースLLMの検討 |
| **Vector DB障害** | 中 | 低 | ・Fallback to 通常検索<br>・定期バックアップ |
| **microCMS Webhook遅延** | 低 | 中 | ・非同期処理<br>・リトライ機構 |

### 8.2 ビジネスリスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|----------|------|
| **ユーザーがAI対話を嫌う** | 高 | 低 | ・オプトイン設計<br>・人間対応への誘導も明示 |
| **AI生成コンテンツの品質問題** | 中 | 中 | ・承認フロー必須化<br>・A/Bテスト |
| **競合他社の追随** | 低 | 高 | ・ローカル知識の差別化<br>・継続的改善 |

### 8.3 法的リスク

| リスク | 対策 |
|--------|------|
| **個人情報保護** | ・チャット履歴の匿名化<br>・30日後自動削除<br>・プライバシーポリシー明記 |
| **不動産取引法規** | ・「参考情報」である旨明記<br>・最終判断は宅建士<br>・免責事項の徹底 |
| **著作権（AI生成物）** | ・全コンテンツに人間の編集を入れる<br>・生成元を記録 |

---

## 9. 成功指標（KPI）

### 9.1 Plan A: AI対話コンシェルジュ

| 指標 | 目標値（3ヶ月後） | 測定方法 |
|------|------------------|----------|
| 月間対話セッション数 | 300件 | Vercel KV |
| 平均対話ターン数 | 5回/セッション | ログ分析 |
| 問い合わせ転換率 | 15% | BigQuery |
| ユーザー満足度 | 4.0/5.0 | 対話後アンケート |

### 9.2 Plan B: ストーリー自動生成

| 指標 | 目標値（3ヶ月後） | 測定方法 |
|------|------------------|----------|
| 生成ストーリー数 | 30件/月 | microCMS |
| 承認率 | 80% | 承認/生成数 |
| 平均編集時間 | 30分/件 | タイムトラッキング |
| ストーリー経由のCVR | 20% | Google Analytics |

### 9.3 Plan C: 簡易査定

| 指標 | 目標値（3ヶ月後） | 測定方法 |
|------|------------------|----------|
| 月間査定リクエスト | 20件 | API呼び出し数 |
| 査定→問い合わせ転換率 | 30% | Funnel分析 |
| レポート満足度 | 3.5/5.0 | メールアンケート |

---

## 10. 次のアクション

### 10.1 即座に実施すべきこと（今週）

- [ ] microCMSに`searchKeywords`, `aiDraft`, `aiApproved`フィールドを追加
- [ ] `lib/analytics.ts`を作成し、基本的な行動ログ収集を実装
- [ ] OpenAI Platformでアカウント作成、APIキー取得
- [ ] `docs/ai-preparation.md`を作成し、進捗管理開始

### 10.2 1ヶ月以内

- [ ] ローカル知識FAQのリスト作成開始（目標: 30件）
- [ ] 構造化データ（JSON-LD）の実装
- [ ] 物件閲覧・検索ログの収集開始
- [ ] Plan Aの詳細設計書作成

### 10.3 3ヶ月以内（Webサイトローンチ後）

- [ ] 100件以上の物件データ蓄積
- [ ] 500件以上のユーザー行動ログ収集
- [ ] Vector DB（Pinecone or Supabase）のアカウント作成
- [ ] Plan A開発着手

---

## 11. 結論と推奨事項

### 11.1 主要な推奨事項

1. **段階的実装が必須**
   - 一度に全機能を実装せず、Plan A → B → C の順で3-4ヶ月ごとにリリース
   - 各フェーズでユーザーフィードバックを収集し、次フェーズに反映

2. **データ基盤の早期整備**
   - Webサイトローンチ時点から、AI機能を見据えたデータ収集を開始
   - `searchKeywords`などのフィールドは今すぐ追加（値は後で埋める）

3. **コスト管理の徹底**
   - 初年度は月額15万円程度の運用コストを想定
   - API使用量の上限設定、アラート設定を必ず実施

4. **品質管理体制の構築**
   - AI生成コンテンツは必ず人間が最終確認
   - 誤情報に対する免責事項の明記

### 11.2 期待される成果

**短期（6ヶ月）**:
- Plan A導入により、問い合わせ対応工数が月20時間削減
- AIチャットによる新規リード獲得が月10件増加

**中期（12ヶ月）**:
- 全物件にストーリーが付与され、SEO改善によりPVが30%増加
- AI査定機能により、潜在顧客の初期接触が月20件増加

**長期（24ヶ月）**:
- MCP対応により、外部プラットフォームへの露出が拡大
- 三島エリアの不動産情報における「デフォルトの情報源」としてのポジション確立

---

## 付録

### A. 参考資料

- [OpenAI Platform Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [Pinecone Documentation](https://docs.pinecone.io/)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

### B. 用語集

| 用語 | 説明 |
|------|------|
| **Embedding** | テキストを数値ベクトルに変換する技術。類似度計算に使用 |
| **Vector DB** | ベクトルデータを高速に検索するためのデータベース |
| **RAG** | Retrieval-Augmented Generation。検索結果を元にLLMが回答生成 |
| **MCP** | Model Context Protocol。LLMが外部データソースにアクセスする標準規格 |
| **EXIF** | 画像ファイルに埋め込まれたメタデータ（撮影日時、位置情報等） |

### C. サンプルプロンプト集

**ストーリー生成用プロンプト（Plan B）**:
```
あなたは不動産ライターです。以下の物件から、実際に住む家族の視点でストーリーを書いてください。

【物件情報】
{property details}

【執筆ルール】
1. 冒頭で家族構成を想定（例: 30代夫婦 + 小学生の子供2人）
2. 朝の光、夕方の過ごし方など、具体的な生活シーンを描写
3. 近隣の施設（スーパー、学校等）を自然に織り込む
4. 誇張表現は避け、事実ベースで魅力を伝える
5. 600-800字

【出力形式】
# タイトル（20字以内）
本文...
```

**AI対話用システムプロンプト（Plan A）**:
```
あなたは静岡県三島市の不動産会社「アイ企画」のAIアシスタントです。

【役割】
- 物件探しをサポートし、最適な選択肢を提案
- 三島エリアの生活情報も提供
- わからないことは正直に「担当者に確認します」と答える

【トーン】
- 親しみやすく、でも専門的
- 敬語を使用
- 絵文字は控えめに（物件紹介時のみ）

【回答ルール】
1. まず質問を理解し、要約して確認
2. 関連物件を3件まで具体的に提案（URL必須）
3. 三島の生活情報も適宜追加
4. 次のステップ（内見予約等）を案内
```

---

**作成者**: AI企画 技術チーム
**最終更新**: 2025-12-23
**バージョン**: 1.0

---
