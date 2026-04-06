# アイ企画 不動産会社Webサイト

不動産会社「アイ企画」のコーポレートWebサイトプロジェクト

## プロジェクト概要

静岡県の不動産会社のWebサイトを構築するプロジェクトです。物件情報の掲載、ストーリーコンテンツの発信、会社情報の提供を行います。

## ドキュメント

### 設計ドキュメント (`docs/design/`)

| ドキュメント | 概要 |
|---|---|
| [要件定義書](./docs/design/requirements.md) | プロジェクト全体要件、サイト構造、データモデル、機能要件 |
| [実装計画書](./docs/design/implementation-plan.md) | 技術スタック、実装フェーズ、工数見積もり、デプロイ手順 |
| [AI機能ロードマップ](./docs/design/ai-roadmap.md) | ローンチ後のAI機能追加計画（コンシェルジュ・自動生成・査定） |

### 運用ドキュメント (`docs/operations/`)

| ドキュメント | 対象 | 概要 |
|---|---|---|
| [リッチエディタ入力マニュアル](./docs/operations/richeditor-manual.md) | コンテンツ編集者 | microCMSリッチエディタでストーリー・物件詳細を入力する手順書 |

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フロントエンド | Next.js 14 (App Router) |
| 言語 | TypeScript |
| CMS | microCMS |
| スタイリング | Tailwind CSS |
| ホスティング | Vercel |
| フォーム | Formspree |

## サイトマップ

```
.
├── TOP (/)
├── 物件を探す
│   ├── 物件一覧 (/properties)
│   └── 物件詳細 (/properties/[id])
├── 暮らしを知る
│   ├── ストーリー一覧 (/stories)
│   └── ストーリー詳細 (/stories/[id])
├── アイ企画を知る
│   ├── アイ企画について (/about)
│   ├── ご挨拶 (/message)
│   └── スタッフインタビュー (/staff-interview)
├── 不動産をお探しの方へ (/for-customer)
├── 不動産をお持ちの方へ (/for-owner)
├── お客様の声 (/voice)
└── プライバシーポリシー (/privacy-policy)
```

## 主要機能

### フロントエンド
- 物件検索・絞り込み機能
- ストーリーコンテンツ閲覧
- レスポンシブデザイン
- SEO最適化

### CMS管理機能
- 物件情報の管理（作成・編集・削除）
- ストーリーコンテンツの管理
- 画像管理
- WYSIWYGエディタ

## 将来のAI機能（ローンチ後の追加開発）

Webサイトローンチ後、段階的にAI機能を追加し、**AIネイティブな不動産会社**への進化を目指します。

### Phase 1: AI対話コンシェルジュ（2025年Q2）
- ユーザーの自然言語質問に24/7自動応答
- 物件提案とローカル知識の組み合わせ
- 問い合わせ工数削減とCVR向上

### Phase 2: ストーリー自動生成（2025年Q3）
- 物件情報から魅力的なストーリーを自動生成
- 画像解析による特徴抽出
- コンテンツ制作時間を90%削減

### Phase 3: 簡易査定機能（2025年Q4）
- 写真アップロードによる即時査定
- EXIF位置情報と近隣相場の自動分析
- 投資シミュレーションレポート生成

### Phase 4: パーソナルエージェント対応（2026年〜）
- MCP（Model Context Protocol）対応
- 外部プラットフォームとの連携強化
- 三島特化型不動産データベースのハブ化

**詳細**: [AI機能追加ロードマップ](./docs/design/ai-roadmap.md)参照

**投資見積もり**:
- 初期開発コスト: 約410万円
- 月額運用コスト: 約15万円
- 期待ROI: 2年目以降 +213%

## 開発スケジュール

**推奨期間: 約1.5〜2ヶ月**

| フェーズ | 内容 | 工数 |
|---------|------|------|
| 0 | プロジェクトセットアップ | 1-2日 |
| 1 | microCMS API設計 | 2-3日 |
| 2 | 共通コンポーネント実装 | 3-4日 |
| 3 | microCMSクライアント・ユーティリティ | 1-2日 |
| 4 | 物件機能実装 | 4-5日 |
| 5 | ストーリー機能実装 | 3-4日 |
| 6 | 静的ページ実装 | 2-3日 |
| 7 | SEO・メタデータ実装 | 1-2日 |
| 8 | レスポンシブデザイン調整 | 2-3日 |
| 9 | パフォーマンス最適化 | 2-3日 |
| 10 | お問い合わせフォーム実装 | 1-2日 |
| 11 | テスト・デバッグ | 3-4日 |
| 12 | デプロイ・本番環境設定 | 1日 |

## セットアップ

詳細は[実装計画書](./docs/design/implementation-plan.md)の「4. 開発環境セットアップ手順」を参照してください。

### クイックスタート

```bash
# 1. Next.jsプロジェクト作成
npx create-next-app@latest ai-kikaku --typescript --tailwind --app --eslint
cd ai-kikaku

# 2. microCMS SDKインストール
npm install microcms-js-sdk

# 3. 環境変数設定
cp .env.local.example .env.local
# .env.localを編集
# MICROCMS_SERVICE_DOMAIN=your-service-name
# MICROCMS_API_KEY=your-api-key

# 4. 開発サーバー起動
npm run dev
```

## プロジェクト構造

```
ai-kikaku/
├── app/                          # Next.js App Router
│   ├── (routes)/                # ページルート
│   ├── api/                     # API Routes
│   ├── layout.tsx               # ルートレイアウト
│   └── globals.css              # グローバルスタイル
├── components/                   # Reactコンポーネント
│   ├── ui/                      # 共通UIコンポーネント
│   ├── property/                # 物件関連コンポーネント
│   └── story/                   # ストーリー関連コンポーネント
├── lib/                         # ユーティリティ関数
│   ├── microcms/                # microCMS関連
│   └── analytics/               # 分析・ログ収集（AI準備）
├── types/                       # TypeScript型定義
│   └── microcms.ts              # microCMS型定義
├── docs/                        # ドキュメント
│   ├── design/                  # 設計文書（要件定義・実装計画・AIロードマップ）
│   └── operations/              # 運用文書（CMS入力マニュアル等）
├── public/                      # 静的ファイル
├── .env.local                   # 環境変数
├── next.config.js               # Next.js設定
├── tailwind.config.ts           # Tailwind設定
└── tsconfig.json                # TypeScript設定
```

## データモデル

### 主要エンティティ

1. **Property（物件）**
   - 基本情報: タイトル、タイプ（売り/貸し）、区分（物件/土地）
   - 詳細情報: 所在地、価格、間取り、面積等
   - リレーション: ストーリー、地域

2. **Story（ストーリー）**
   - コンテンツ: タイトル、本文（リッチテキスト）
   - リレーション: 物件、地域

3. **Region（地域）**
   - 地域名: 三島市、長泉町、清水町等

4. その他: CustomerVoice、StaffInterview、Page

詳細は[要件定義書](./docs/design/requirements.md)の「3. データモデル設計」を参照してください。

## デプロイ

Vercelへのデプロイ手順は[実装計画書](./docs/design/implementation-plan.md)の「5. デプロイ手順」を参照してください。

```bash
# Vercel CLIでデプロイ
npm i -g vercel
vercel --prod
```

## 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [microCMS公式ドキュメント](https://document.microcms.io/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Vercelドキュメント](https://vercel.com/docs)

## ライセンス

Private（社内プロジェクト）

## 連絡先

プロジェクトに関する質問は、プロジェクト管理者にお問い合わせください。

---

**作成日:** 2025-12-22
**最終更新:** 2025-12-23（AI機能ロードマップ追加）
