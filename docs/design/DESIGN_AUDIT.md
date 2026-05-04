# デザイン監査レポート（Figma vs 実装）

検証日: 2026-05-02
対象ブランチ: main（790db4d）
Figma fileKey: `rAdZUPq1BgzHVRP7QOhXC8`

---

## 修正サマリ（本セッションで対応）

### ✅ 完了
- **/for-customer**: 欠落していた「暮らしを知る」セクション追加 / CTAバナーを中段に移動 / H1サイズ48px / FAQ外側背景cream化
- **/for-owner**: 「声」と「記事」の順序入れ替え（Figma準拠：記事→声）/ 記事カードの矢印を青丸44pxに / CTAバナーをラウンドコンテナ化 / H1サイズ48px / FAQ外側背景cream化
- **/properties**: PCフィルターのキーワード検索input削除 / SPフィルターからもキーワード検索削除 / H1サイズ48px
- **/about**: ヒーロー・ご挨拶・会社概要のbg-light-green → bg-cream / サービスカードpadding 32→30px / 矢印48→44px / dt統一（text-body-l）/ コンポストとはボックスpadding 32→30px
- **/staff-interview**: eyebrow「スタッフの紹介」→「インタビュー」/ TOC項目数 5→4 / 司会アイコンbg-light-blue→bg-light-green / メインH2サイズ48px
- **/message**: SP本文サイズ16px・行高2.0 / SP見出しサイズ24px・行高1.6 / ヒーロー右画像 rounded-2xl→rounded-[24px]
- **/voice**: PCサイドバーの縦罫線削除 / アクティブ表現を opacity 切替に統一
- **/stories**: ヒーロー本文を3行構成に / FeaturedStoryCardボタンを16px+px-5に / 仲人バナーSPを縦中央寄せ
- **/stories/[id]**: SPヒーロー画像を aspect-square / 物件CTAカードの h-[108px] 撤廃・矢印44px
- **/privacy-policy**: H1サイズ48px
- **共通: FaqAccordion** 回答カード bg-cream → bg-light-green

### ⏸ 未対応（要検討・要外部素材）
- **TOP**: NewsAccordionのmicroCMS news接続（現状mock）
- **/for-owner**: 不動産活用記事のmicroCMS連携（現状ハードコード3件）
- **/stories**: SP用オーバーレイカードコンポーネントの新規作成 / SPカルーセル化（embla-carousel等）
- **/stories/[id]**: TOCのステッパー型UI再設計 / sub-heading-1（caption + h3）構造の追加 / リッチテキストblockquoteのCommentコンポーネント化
- **/voice**: 展開時の手紙画像表示（microCMSスキーマに画像フィールド追加が必要）
- **/voice**: SPカテゴリピル（Figmaに無いが要否確認）
- **/staff-interview**: Storiesセクションの要否確認（Figmaに無し）
- **/message**: section[5]の画像差し替え（section-6.jpg未作成、section-5.jpgを重複使用中）
- **デザイン側で未確認**: StoriesFilterの存続要否、`/properties` 注目物件「物件詳細」ボタンの成約済み表示

---

## 0. 元の優先対応Top10（参考: 監査時点）

| # | ページ | 差分 | 修正先 |
| --- | --- | --- | --- |
| 1 | `/properties` | フィルターにキーワード検索 input が残存（Figmaは1行構成・検索なし） | `src/components/property/PropertyFilter.tsx` |
| 2 | `/for-customer` | 「暮らしを知る」（ストーリー3カード・dark-green）セクションが丸ごと欠落 | `src/app/for-customer/page.tsx` |
| 3 | `/for-customer` | CTAバナーの位置が逆（Figmaは中段 / 実装は最下部） | 同上 |
| 4 | `/for-owner` | 「お客様の声」と「不動産活用に関する記事」の順序が逆 | `src/app/for-owner/page.tsx` |
| 5 | `/for-owner` | 記事一覧がハードコード配列（microCMS未連携） | 同上 |
| 6 | `/about` | ご挨拶セクションの背景が `bg-light-green` だがFigmaは `bg-cream` | `src/app/about/page.tsx` |
| 7 | `/about` | 会社概要セクションの背景が `bg-light-green` だがFigmaは `bg-cream` | 同上 |
| 8 | `/staff-interview` | eyebrowが「スタッフの紹介」だがFigmaは「インタビュー」、TOC項目数が5/Figma4 | `src/app/staff-interview/page.tsx` |
| 9 | `/voice` | 展開時の手紙画像が表示されない、PCサイドバーの縦罫線がFigmaに無い | `src/components/voice/VoiceContent.tsx` |
| 10 | `/for-customer`, `/for-owner` | FAQセクション背景色がFigmaと反転（外＝cream/中＝light-green が正） | `FaqAccordion.tsx` + 各ページ |

---

## 1. TOP（`/`）

実装: `src/app/page.tsx`、関連 `src/components/home/*`
Figma: PC=4211-9967 / SP=4211-10603

### 差分
- ヒーロー右上の小画像に `linear-gradient(209deg, #fcfff7 → 0)` のオーバーレイがあるが、Figmaではフェードが弱め/無しに近い。
- 「お客様の声」のページネーション `<` `>` が PCのみ表示で、ボタン化されていない（直近コミットでカルーセル化対応済みだが、矢印部分の動作・スタイルを再点検）。
- お知らせ（NewsAccordion）の中身が `mockNews` 固定で microCMS 未連携。
- 全体構造、画像構成、CTAバナー(1枚構成)、各セクションの配色は概ね一致。

### 修正案
- `src/app/page.tsx` 右上画像のオーバーレイ強度を弱める（または削除）。
- `src/components/home/NewsAccordion.tsx` を microCMS `news` エンドポイントに接続。
- お客様の声のキャレットボタンをクリック可能にして横スクロール/カルーセルと連動。

---

## 2. 物件一覧（`/properties`）

実装: `src/app/properties/page.tsx`、`src/components/property/*`
Figma: PC=4211-10279 / SP=4211-10713

### 差分
- **フィルターバーの構造**: Figmaは1行（Toggle + dropdown × 2 + 絞り込み + クリア）、実装は2行構成でキーワード検索 input が残存。直近コミット `0f83284 fix: ... キーワード検索削除` の意図と矛盾。
- **H1「物件を探す」のフォントサイズ**: Figmaは48px(H2サイズ)、実装は globals.css の h1 既定で `tablet:text-[56px]` と8px大きい。
- 注目物件の「物件詳細」ボタンが `featuredProperty.status !== 'sold'` で非表示。Figmaの仕様再確認が必要。
- ページネーション・駐車場セクション・CTAバナーは概ね一致。

### 修正案
- `PropertyFilter.tsx` のキーワード検索 input を削除し、1行構成に再構築。
- `<h1 className="mb-12">` に明示クラス：`font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green` を付与。

---

## 3. 物件詳細（`/properties/[id]`）

実装: `src/app/properties/[id]/page.tsx`、`src/components/property/PropertyDetailClient.tsx`
Figma: 掲載中PC=4211-10156 / 成約済みPC=4211-10364

### 差分
- 構造（ヒーロー＋TOC＋本文＋概要表＋アクションカード／関連ストーリー／関連物件）は概ね一致。
- `PropertyCard.tsx` のタイトル色 `text-dark-green` が、card-property 仕様で本来 black の可能性あり（要確認）。
- 成約済みヒーローのオーバーレイ `linear-gradient(194deg, rgba(39,51,59,0.5) 4%, ...)` の数値はFigmaメタデータと再照合推奨。

### 修正案
- 致命的な差分はなし。トーン微調整の範囲。

---

## 4. ストーリー一覧（`/stories`）

実装: `src/app/stories/page.tsx`、`src/components/story/*`
Figma: PC=4211-11217 / SP=4211-10959

### 差分
- **フィルタUIがFigmaに存在しない**: 実装の `StoriesFilter`（カテゴリ・地域・絞り込み）はFigma上に描かれていない。要件として残すか要確認。
- **SPカード形態**: Figma SPは2件目以降「画像全面 + 暗グラデ + ラベル + H4(白) + 青丸矢印」のオーバーレイ式。実装はPCと同じ画像下テキストのカード。
- **SPカルーセル**: Figmaは下に左右矢印 + ドット。実装はグリッド表示のみ。
- **FeaturedStoryCardのボタン**: `text-[14px] px-4` と他カードに比べて小さい。Figmaでは他カード同様 `text-[16px]`。
- **仲人バナーのSPレイアウト**: Figmaは縦中央寄せ（ロゴ＋テキスト＋中央矢印）。実装は `flex items-end justify-between` の横並び。
- **ヒーロー本文改行**: Figmaは3行、実装は2行。

### 修正案
- `FeaturedStoryCard` のボタンを `text-[16px] px-5` に揃える。
- SPオーバーレイカード用コンポーネントを新設し `tablet:hidden` で出し分け、`embla-carousel` 等でカルーセル化。
- 仲人バナーSPを `flex flex-col items-center text-center gap-[30px]` に。
- ヒーロー本文「物件だけじゃわからない、/ 三島での暮らしのこと。/ ここで一緒に、のぞいてみませんか？」の3行に。

---

## 5. ストーリー詳細（`/stories/[id]`）

実装: `src/app/stories/[id]/page.tsx`
Figma: PC=4211-10492 / SP=4211-12095

### 差分
- **TOC**: Figmaは「丸+縦罫線」で繋ぐステッパー型（活性=塗り、非活性=opacity-50）。実装の `TocNav` のスタイル要再点検。
- **本文の見出し構造**: Figmaは `caption 16px + H3 32px Mincho` の sub-heading-1パターン。実装は h3 のみで上の小見出しが無い。
- **「この物件について」CTAカード**: 矢印が Figma 44px に対し実装 48px。`h-[108px]` 固定をやめて `p-[30px]` ベースに。
- **ヒーロー画像 SP**: Figmaは `aspect-[358/358]`（正方形）+ rounded-24。実装は `h-[300px]` でaspect指定なし。
- **画像キャプション**: Figma PC `pl-[30px]` 14px / SP `pl-[8px] pb-[8px]` 12px。RichText側のCSS要調整。
- **コメントブロック**: Figmaに `flex gap-[24px] avatar(50px) + light-green rounded-[24px] quote` あり。実装にUI未実装。

### 修正案
- ヒーロー画像のSPを `aspect-square` に。
- CTAカード `h-[108px]` を撤廃、矢印 `w-11 h-11` (44px) に。
- TOCをステッパー型に再設計（または現状維持時はスタイルだけ近づける）。
- microCMS の richEditorV2 の `<blockquote>` をFigmaのCommentコンポーネントにマッピング。

---

## 6. アイ企画について（`/about`）

実装: `src/app/about/page.tsx`
Figma: PC=4211-10018 / SP=4211-11105

### 差分
- **ヒーロー背景**: 実装は `bg-light-green py-24`、Figmaは `bg-cream`（cream維持）。
- **サービスリンク（for-customer/for-owner）カード**: padding は Figma `p-[30px]`、実装 `p-8`(32px)。矢印は Figma 44px、実装 48px。
- **ご挨拶セクション**: 実装 `bg-light-green`、Figma `bg-cream`。
- **コンポストの「コンポストとは」ボックス**: padding は Figma `p-[30px]`、実装 `p-8`(32px)。
- **会社概要セクション**: 実装 `bg-light-green`、Figma `bg-cream`。
- **会社概要のリスト dt**: 一部 `text-body-m`(16px)、Figmaは全て 18px medium。
- 全体的に矢印アイコンは Figma 44px が標準、実装は `w-12 h-12`(48px)。

### 修正案
- ヒーロー、ご挨拶、会社概要セクションの `bg-light-green` を `bg-cream` または無背景に。
- サービスカード・コンポスト「コンポストとは」ボックスの `p-8` を `p-[30px]` に。
- 矢印アイコンを `w-11 h-11`(44px)に統一。
- 会社概要 dt を全て `text-body-l`(18px) に揃える。

---

## 7. ご挨拶（`/message`）

実装: `src/app/message/page.tsx`
Figma: PC=4211-10129 / SP=4211-11591

### 差分
- ヒーロー右側写真の角丸: Figma `rounded-[24px]`、実装 `rounded-2xl`(=16px)。
- **PCヒーローのタイトル位置**: Figmaはタイトル「ご挨拶」が `top-[96px]` で写真エリア内に重なる構図。実装は写真とタイトルが縦に分かれる。
- **SPヒーロー写真**: Figmaは3枚構成（中央267×幅 + 左下/右下 119×159）。実装はSPで `hidden tablet:block` により中央のみ表示。
- **本文サイズSP**: Figma 16px lh-2.0、実装は 18px lh-1.8（PC値そのまま）。
- **見出しサイズSP**: Figma 24px lh-1.6、実装は 32px。
- 6番目セクションが `section-5.jpg` を重複利用（要差し替え）。

### 修正案
- 右ヒーロー画像 `rounded-2xl` → `rounded-[24px]`。
- SP用に3枚レイアウトを実装（`hidden tablet:block` を外す）。
- 本文 `text-[18px] leading-[1.8]` を `text-[16px] leading-[2] tablet:text-[18px] tablet:leading-[1.8]` に。
- 見出しを `text-[24px] tablet:text-[32px]` に。
- 6番目セクションの画像を `/images/message/section-6.jpg` 等に差し替え。

---

## 8. スタッフインタビュー（`/staff-interview`）

実装: `src/app/staff-interview/page.tsx`
Figma: PC=4211-11303 / SP=4211-11614

### 差分
- **eyebrow**: 実装「スタッフの紹介」、Figma「インタビュー」。
- **TOC項目数**: 実装5、Figma4（'お客様との関係' / '地域貢献活動' のいずれかが余分）。
- **司会アイコンの背景色**: Figma `bg-light-green`、実装 `bg-light-blue`。
- メインH2サイズが globals.css の h2 (32px相当) になっており、Figma 48px H2 と差。
- 末尾の「暮らしを知る」(Stories)セクションがFigmaに無い（実装で追加されている）。

### 修正案
- L312 「スタッフの紹介」→「インタビュー」。
- L313 H2 を `font-mincho text-[48px] leading-[1.5] tracking-[0.04em] text-dark-green` で明示。
- L166-172 の `tocItems` を Figma の4項目に削減。
- L191 `bg-light-blue` → `bg-light-green`。
- 末尾Storiesセクションの要否を確認（仕様優先で残す場合は維持）。

---

## 9. 不動産をお探しの方へ（`/for-customer`）

実装: `src/app/for-customer/page.tsx`
Figma: PC=4211-11398 / SP=4211-11780

### 差分
- **「暮らしを知る」(ストーリーカード3枚・dark-green)セクションが丸ごと欠落**。Figma順は「物件情報 → CTAバナー → 暮らしを知る → お客様の声 → FAQ」。
- **CTAバナー位置**: Figmaは中段（物件情報直後）、実装は最下部。
- **FAQセクション背景**: Figmaは外側 cream / 内側 light-green、実装は外側 light-green / 内側 cream（反転）。
- **Hero H1**: Figma 48px、実装 globals.cssから56px。
- 特徴リード文の `mb-8` が詰まっており、for-ownerと比較して不揃い（Figma的には `mb-24` 相当）。
- features H3「アイ企画の紡ぐ家づくり」が Figma 2行改行、実装は1行で自然折り返し。
- CTAバナーが full-bleed、Figmaは `rounded-[24px]` ラウンドコンテナ + 外側 `px-[45px]`。

### 修正案
- voicesセクションの前に「暮らしを知る」セクション（dark-green、StoryCard×3）を追加し `getStories({ limit: 3 })` を `Promise.all` に。
- CTAバナーを物件情報セクションの直後に移動し、`rounded-3xl` ラウンドコンテナ化。
- FAQセクションを `bg-cream` に、`FaqAccordion.tsx` の回答カードを `bg-light-green` に。
- Hero H1 を 48px に明示指定。
- 特徴リード文の `mb-8` を `mb-24` に揃える。
- features の改行を `whitespace-pre-line` で2行化。

---

## 10. 不動産をお持ちの方へ（`/for-owner`）

実装: `src/app/for-owner/page.tsx`
Figma: PC=4211-11453 / SP=4211-11896

### 差分
- **セクション順序**: Figma「物件のその後 → 記事 → 声 → FAQ → CTA」、実装「物件のその後 → 声 → 記事 → FAQ → CTA」。
- **記事セクション**: ハードコード配列（3件）、microCMS未連携。
- **記事カードの「記事を読む」ボタン**: Figmaは右下の青丸ラウンドArrow(44×44)。実装は枠付きの細長ボタン。
- FAQ背景色の問題は `/for-customer` と同じ。
- Hero H1サイズが Figma 48pxに対し実装56px。
- features H3「アイ企画の家じまい」が Figma 2行・実装1行。
- CTAバナーが full-bleed（ラウンドコンテナ化が必要）。

### 修正案
- voices セクション(L336-393) と articles セクション(L395-446) の順序を入れ替え。
- 記事を microCMS 等から取得するデータドリブン化、`ArticleCard` を新設。
- 記事カードの右下に Arrow ラウンドボタン (`w-12 h-12 bg-accent-blue rounded-full`)。
- FAQ背景の修正、CTAバナーのラウンドコンテナ化、Hero H1 サイズ修正は for-customer と同様。

---

## 11. お客様の声（`/voice`）

実装: `src/app/voice/page.tsx`、`src/components/voice/VoiceContent.tsx`
Figma: PC=4211-11510 / SP=4211-11175

### 差分
- **PCサイドバー**: Figmaは「丸+ラベル」のシンプルなリスト（active=塗り潰し、inactive=opacity-50）。実装は丸の間に縦罫線を引いている（Figmaに無い）。
- **アクティブ状態の表現**: Figmaはマーカー塗り潰し+全体の不透明度で区別。実装はマーカーが border 空でラベルのみ opacity-50。
- **展開コンテンツ**: Figmaはテキスト + 手紙の写真（aspect-[260/368]）が表示。実装は `voice.content` のみで画像表示ロジック無し。
- **見出しのフォーマット**: Figmaは「タイトル + 顧客名」の2段構成。実装は「customerName 場所/物件種別 + 日付」。
- **SPカテゴリピル**: Figmaに無い。実装はSP上部に表示。

### 修正案
- VoiceContent.tsx L104-134 から縦罫線を削除し、シンプルな丸+ラベルに。
- マーカーをアクティブ時=塗り潰し、非アクティブも塗り潰し+全体 opacity-50 に。
- 展開時に画像を表示（microCMSスキーマに画像フィールド追加 or 確認）。
- 見出しの構成をタイトル + 顧客名の2段に統一検討。
- SPカテゴリピルはFigmaに無いため要否を確認。

---

## 12. プライバシーポリシー（`/privacy-policy`）

実装: `src/app/privacy-policy/page.tsx`
Figma: PC=4211-11540 / SP=4211-11185

### 差分
- H1サイズ: Figma 48px、実装は globals.css から 56px。
- それ以外（最大幅、本文サイズ、改行、`2021.01　アイ企画`、背景色、padding）は概ね忠実。

### 修正案
- L55 `<h1 className="mb-24">` を `<h1 className="text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.92px] mb-24">` に変更。

---

## 横断的な指摘（複数ページに影響）

1. **globals.css の H1 既定サイズ問題**: `tablet:text-[56px]` が継承され、`/properties`、`/for-customer`、`/for-owner`、`/privacy-policy` などで Figma の 48px(H2サイズ)を逸脱。これらのページ単位で h1 にクラスを上書き、または h1 ベーススタイルを 48px に下げる検討。
2. **矢印アイコン 48px → 44px**: Figma標準が 44px(`w-11 h-11`)、実装は `w-12 h-12`(48px)。`about`、`stories/[id]` の物件CTA等、複数箇所で揃え直しが必要。
3. **FAQセクション背景色の反転**: `/for-customer`、`/for-owner` で外側=light-green / 内側=cream になっている。Figmaは外側=cream / 内側=light-green。`FaqAccordion.tsx` 内部の `bg-cream` を `bg-light-green` に変更し、各ページの `<section className="bg-light-green ...">` を `bg-cream` に。
4. **CTAバナーの full-bleed問題**: `/for-customer`、`/for-owner` で全幅オーバーレイ。Figmaは `rounded-[24px] max-w-[1350px] mx-auto` のラウンドコンテナ。
5. **microCMS未連携**: TOPの `NewsAccordion`（mock）、`/for-owner` の記事3件（ハードコード）。本番運用前に要対応。
