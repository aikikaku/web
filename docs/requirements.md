# 不動産会社Webサイト 要件定義書

## 1. プロジェクト概要

### 1.1 目的
不動産会社「アイ企画」のコーポレートWebサイトを構築し、物件情報の掲載、ストーリーコンテンツの発信、会社情報の提供を行う。

### 1.2 対象ユーザー
- 不動産を探している個人・法人
- 不動産を売却・賃貸したいオーナー
- 地域の住民
- 求職者

### 1.3 技術スタック要件
- フロントエンド: Next.js + TypeScript
- CMS: ヘッドレスCMS（WYSIWYGエディタ搭載）
- ホスティング: 静的サイト生成に対応したプラットフォーム

---

## 2. サイト構造

### 2.1 ページ一覧

| ページ名 | パス | 説明 |
|---------|------|------|
| TOP | `/` | トップページ |
| 物件一覧 | `/properties` | 物件の一覧・検索 |
| 物件詳細 | `/properties/[id]` | 個別物件の詳細情報 |
| ストーリー一覧 | `/stories` | 暮らしを知るストーリー一覧 |
| ストーリー詳細 | `/stories/[id]` | 個別ストーリーの詳細 |
| アイ企画について | `/about` | 会社概要・理念 |
| ご挨拶 | `/message` | 代表挨拶 |
| スタッフインタビュー | `/staff-interview` | スタッフ紹介 |
| 不動産をお探しの方へ | `/for-customer` | 購入・賃貸希望者向け |
| 不動産をお持ちの方へ | `/for-owner` | 売却・賃貸希望者向け |
| お客様の声 | `/voice` | 顧客レビュー |
| プライバシーポリシー | `/privacy-policy` | 個人情報保護方針 |

---

## 3. データモデル設計

### 3.1 Property（物件）エンティティ

#### 基本情報
```typescript
interface Property {
  // ID
  id: string; // UUID

  // 基本属性
  title: string; // 物件タイトル
  type: 'sell' | 'rent'; // 売り/貸し
  category: 'property' | 'land'; // 物件/土地
  label: string; // ラベル（中古住宅、売土地、売マンション、収益物件等）
  status: 'available' | 'sold'; // ご案内中/成約済み

  // 詳細情報
  location: string; // 所在地
  nearestStation: string; // 最寄り駅
  landArea?: number; // 土地面積
  buildingArea?: number; // 建物面積（貸物件のみ）
  layout?: string; // 間取り
  constructionDate?: string; // 築年月
  schoolDistrict?: string; // 学区
  transactionType: string; // 取引態様
  price?: number; // 価格（売物件/売土地）
  rent?: number; // 賃料（貸物件/貸土地）
  remarks?: string; // 備考

  // リッチコンテンツ
  description: RichText; // 詳細説明
  mainImage: Image; // メイン画像
  images: Image[]; // 物件画像配列

  // リレーション
  storyId?: string; // 関連ストーリー（任意）
  regionIds: string[]; // 地域（複数）

  // メタ情報
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

#### 物件種別ごとの表示項目

**売物件:**
- 所在地、最寄駅、種別、土地面積、間取り、築年月、学区、取引態様、価格、備考

**売土地:**
- 所在地、最寄駅、種別、土地面積、学区、取引態様、価格、備考

**貸物件:**
- 所在地、最寄駅、種別、建物面積、間取り、築年月、学区、取引態様、賃料、備考

**貸土地:**
- 所在地、最寄駅、種別、土地面積、学区、取引態様、賃料、備考

### 3.2 Story（ストーリー）エンティティ

```typescript
interface Story {
  id: string;
  title: string;
  subtitle: string;
  content: RichText; // ストーリー本文
  thumbnail: Image;
  images: Image[];
  propertyId?: string; // 関連物件（任意）
  regionIds: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

### 3.3 Region（地域）エンティティ

```typescript
interface Region {
  id: string;
  name: string; // 三島市、長泉町、清水町、沼津市、裾野市、函南町、伊豆の国市、そのほかの地域
  slug: string;
  order: number; // 表示順序
}
```

### 3.4 Image エンティティ

```typescript
interface Image {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
```

### 3.5 CustomerVoice（お客様の声）エンティティ

```typescript
interface CustomerVoice {
  id: string;
  customerName: string;
  location: string;
  propertyType: string;
  date: string;
  content: RichText;
  order: number;
}
```

### 3.6 StaffInterview（スタッフインタビュー）エンティティ

```typescript
interface StaffInterview {
  id: string;
  staffName: string;
  position: string;
  photo: Image;
  questions: QA[]; // Q&A配列
  order: number;
}

interface QA {
  question: string;
  answer: string;
}
```

### 3.7 Page（静的ページ）エンティティ

```typescript
interface Page {
  id: string;
  slug: string; // about, message, for-customer, for-owner, privacy-policy
  title: string;
  content: RichText;
  updatedAt: Date;
}
```

---

## 4. 機能要件

### 4.1 物件関連機能

#### 4.1.1 物件一覧ページ (/properties)

**表示機能:**
- 物件カード表示（グリッドレイアウト、3列）
- 注目物件セクション（上部に大きく1件表示）
- ラベル表示（色分け: 売り系=赤、貸し系=青）
- 物件情報: サムネイル、タイトル、価格/賃料、間取り、面積、地域

**フィルター機能:**
1. **ステータス切替:**
   - 「すべて」: 商談中 + 成約済みの全物件を表示（デフォルト）
   - 「ご案内中の物件」: 商談中の物件のみ表示

2. **物件種別フィルター（複数選択可）:**
   - 売物件
   - 売土地
   - 貸物件
   - 貸土地

3. **地域フィルター（複数選択可）:**
   - 三島市
   - 長泉町
   - 清水町
   - 沼津市
   - 裾野市
   - 函南町
   - 伊豆の国市
   - そのほかの地域

**検索機能:**
- キーワード検索（物件名、所在地などで検索）

**ページネーション:**
- 1ページあたり12件表示
- ページ送り機能

#### 4.1.2 物件詳細ページ (/properties/[id])

**表示機能:**
- メイン画像 + サムネイルギャラリー
- 物件タイトル
- ラベル表示
- ステータス表示（ご案内中/成約済み）
- リッチテキスト詳細説明
- 物件概要テーブル（種別により表示項目が変動）
- 関連ストーリーへのリンク（成約済み物件で表示されることが多い）
- 関連物件セクション（同じ地域の物件3件）
- お問い合わせボタン

**画像ギャラリー:**
- メイン画像表示エリア
- サムネイル一覧（クリックでメイン画像切替）
- 画像の拡大表示機能

#### 4.1.3 TOPページの新着物件セクション

**表示ルール:**
- ご案内中の物件のみ表示
- 最新6件を表示
- 「もっと物件を見る」ボタンで物件一覧（ご案内中フィルター）へ遷移

### 4.2 ストーリー関連機能

#### 4.2.1 ストーリー一覧ページ (/stories)

**表示機能:**
- ストーリーカード表示（グリッドレイアウト）
- カード情報: サムネイル、タイトル、サブタイトル、地域

**フィルター機能:**
- 地域フィルター（複数選択可）
- 検索機能

**ページネーション:**
- 1ページあたり9件表示

#### 4.2.2 ストーリー詳細ページ (/stories/[id])

**表示機能:**
- タイトル・サブタイトル
- メイン画像
- リッチテキストコンテンツ
- 画像ギャラリー（コンテンツ内埋め込み）
- 関連物件へのリンク（物件が紐づいている場合）
- 関連ストーリー表示（同じ地域のストーリー3件）

### 4.3 会社情報ページ

#### 4.3.1 アイ企画について (/about)
- 企業理念・ビジョン
- 地域マップ・情報
- 会社概要テーブル
- 関連物件セクション

#### 4.3.2 ご挨拶 (/message)
- 代表メッセージ（リッチテキスト）
- 代表写真

#### 4.3.3 スタッフインタビュー (/staff-interview)
- スタッフ情報表示
- Q&A形式コンテンツ
- スタッフ写真

### 4.4 サービスページ

#### 4.4.1 不動産をお探しの方へ (/for-customer)
- サービス説明（リッチテキスト）
- 関連物件表示
- FAQ

#### 4.4.2 不動産をお持ちの方へ (/for-owner)
- サービス説明（リッチテキスト）
- FAQ
- お問い合わせCTA

### 4.5 お客様の声 (/voice)

**表示機能:**
- アコーディオン形式のレビュー表示
- レビュー情報: 顧客名、地域、物件タイプ、日付、本文

### 4.6 共通機能

#### 4.6.1 ヘッダー
- ロゴ
- グローバルナビゲーション
  - 物件を探す
  - 暮らしを知る
  - アイ企画を知る
  - お探しの方へ
  - お持ちの方へ
- レスポンシブ対応（ハンバーガーメニュー）

#### 4.6.2 フッター
- サイトマップ
- 会社情報
- SNSリンク（Instagram, YouTube）
- お問い合わせリンク
- プライバシーポリシーリンク

#### 4.6.3 その他共通機能
- パンくずリスト
- ページトップへ戻るボタン
- レスポンシブデザイン（PC、タブレット、モバイル対応）
- ローディング表示

---

## 5. CMS管理機能要件

### 5.1 物件管理

**作成・編集機能:**
- 物件基本情報の入力
- タイプ・カテゴリー選択
- ラベル入力（自由記述）
- ステータス選択
- 詳細情報入力（種別により入力項目が変動）
- リッチテキストエディタ（詳細説明用）
- 画像アップロード・管理（メイン画像 + 複数画像）
- 地域選択（複数選択可）
- ストーリーとの紐づけ

**管理機能:**
- 物件一覧表示（フィルター、検索機能付き）
- 公開/非公開設定
- プレビュー機能
- 削除機能
- 並び順変更

### 5.2 ストーリー管理

**作成・編集機能:**
- タイトル・サブタイトル入力
- リッチテキストエディタ（本文用）
- サムネイル画像アップロード
- 画像ギャラリー管理
- 地域選択（複数選択可）
- 物件との紐づけ

**管理機能:**
- ストーリー一覧表示
- 公開/非公開設定
- プレビュー機能
- 削除機能

### 5.3 地域管理

- 地域の作成・編集・削除
- 表示順序の設定

### 5.4 お客様の声管理

- レビューの作成・編集・削除
- 表示順序の設定

### 5.5 スタッフインタビュー管理

- インタビューの作成・編集・削除
- Q&Aの追加・編集・削除
- 表示順序の設定

### 5.6 静的ページ管理

- ページコンテンツの編集（リッチテキストエディタ）
- プレビュー機能

### 5.7 メディア管理

- 画像のアップロード・管理
- 画像の最適化（自動リサイズ、WebP変換）
- altテキスト設定
- キャプション設定

### 5.8 ユーザー管理（CMS管理者用）

- 管理者アカウント作成・編集
- 権限設定

---

## 6. 非機能要件

### 6.1 パフォーマンス

- ページ読み込み速度: 3秒以内（モバイル環境）
- Core Web Vitals対応
  - LCP（Largest Contentful Paint）: 2.5秒以内
  - FID（First Input Delay）: 100ms以内
  - CLS（Cumulative Layout Shift）: 0.1以下
- 画像の遅延読み込み（Lazy Loading）
- Next.jsの静的生成（SSG）/インクリメンタル静的再生成（ISR）の活用

### 6.2 SEO

- メタタグ設定（title, description）
- OGP設定（Facebook, Twitter）
- 構造化データ（JSON-LD）
  - 物件情報（RealEstateListing）
  - パンくずリスト（BreadcrumbList）
  - 企業情報（Organization）
- サイトマップ自動生成
- robots.txt設定

### 6.3 アクセシビリティ

- WCAG 2.1 レベルAA準拠
- セマンティックHTML
- 適切な見出し構造
- キーボード操作対応
- スクリーンリーダー対応

### 6.4 セキュリティ

- HTTPS対応
- XSS対策
- CSRF対策
- CSP（Content Security Policy）設定
- CMS管理画面の認証・認可

### 6.5 レスポンシブ対応

- ブレークポイント:
  - モバイル: ~767px
  - タブレット: 768px~1023px
  - デスクトップ: 1024px~

### 6.6 ブラウザ対応

- Chrome（最新版）
- Safari（最新版）
- Firefox（最新版）
- Edge（最新版）
- iOS Safari（最新2バージョン）
- Android Chrome（最新2バージョン）

### 6.7 運用・保守

- CMSのバックアップ機能
- エラーログ記録
- アクセス解析（Google Analytics連携）

---

## 7. ビジネスロジック仕様

### 7.1 物件ラベルの色分けルール

```typescript
function getLabelColor(type: 'sell' | 'rent'): string {
  return type === 'sell' ? 'red' : 'blue';
}
```

- 売り物件、売り土地: 赤系
- 貸し物件、貸し土地: 青系

### 7.2 物件概要テーブルの表示項目制御

```typescript
function getPropertyFields(type: 'sell' | 'rent', category: 'property' | 'land') {
  const commonFields = ['所在地', '最寄駅', '種別', '学区', '取引態様', '備考'];

  if (type === 'sell' && category === 'property') {
    return [...commonFields, '土地面積', '間取り', '築年月', '価格'];
  }

  if (type === 'sell' && category === 'land') {
    return [...commonFields, '土地面積', '価格'];
  }

  if (type === 'rent' && category === 'property') {
    return [...commonFields, '建物面積', '間取り', '築年月', '賃料'];
  }

  if (type === 'rent' && category === 'land') {
    return [...commonFields, '土地面積', '賃料'];
  }
}
```

### 7.3 ストーリー表示ロジック

- 物件詳細ページでストーリーを表示する条件:
  - 物件にstoryIdが設定されている
  - 関連ストーリーが公開状態である
  - 成約済み物件の場合に表示されることが多い（必須ではない）

### 7.4 新着物件の定義

- ステータスが「ご案内中」である
- 作成日時（createdAt）が新しい順
- 最大6件表示

---

## 8. 画面遷移図

```
TOP (/)
├─ 物件を探す → 物件一覧 (/properties)
│                  └─ 物件詳細 (/properties/[id])
│                       └─ 関連ストーリー → ストーリー詳細 (/stories/[id])
│
├─ 暮らしを知る → ストーリー一覧 (/stories)
│                  └─ ストーリー詳細 (/stories/[id])
│                       └─ 関連物件 → 物件詳細 (/properties/[id])
│
├─ アイ企画を知る
│   ├─ アイ企画について (/about)
│   ├─ ご挨拶 (/message)
│   └─ スタッフインタビュー (/staff-interview)
│
├─ 不動産をお探しの方へ (/for-customer)
├─ 不動産をお持ちの方へ (/for-owner)
├─ お客様の声 (/voice)
└─ プライバシーポリシー (/privacy-policy)
```

---

## 9. 今後の検討事項

### 9.1 お問い合わせフォーム
- フォームの実装方法（外部サービス連携 or 自前実装）
- メール送信機能
- 自動返信機能

### 9.2 検索機能の拡張
- 価格帯での絞り込み
- 間取りでの絞り込み
- 築年数での絞り込み

### 9.3 多言語対応
- 将来的な英語対応の可能性

### 9.4 会員機能
- お気に入り物件の保存
- 新着物件の通知

---

## 10. 制約事項

1. BaaS（Backend as a Service）は使用しない
   - 理由: Webアプリケーションではなく、コンテンツ管理中心のWebサイトのため

2. CMSは必ずWYSIWYGエディタを搭載していること
   - クライアントが直接コンテンツを編集できるように

3. ヘッドレスCMSを推奨
   - Next.jsとの親和性
   - 将来的な拡張性

---

## 改訂履歴

| バージョン | 日付 | 変更内容 | 作成者 |
|-----------|------|---------|--------|
| 1.0 | 2025-12-22 | 初版作成 | - |
