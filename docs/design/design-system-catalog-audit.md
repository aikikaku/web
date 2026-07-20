# デザインシステム・カタログ網羅評価（Figma カタログ vs コード実装）

検証日: 2026-07-20
対象: `docs/design/figma-design-system.md`（Source: main, 取得日2026-07-20）の全項目
監査対象ツリー: ブランチ `fix/figma-code-parity`（PR #132、5 commits、origin へ push済み・未マージ）
Figma fileKey: `rAdZUPq1BgzHVRP7QOhXC8`

## この監査の軸

[[PR #132（ページ単位監査）]] とは別軸。あちらは「実ページがそのページ自身のFigmaフレームと一致しているか」。
本監査は「`figma-design-system.md` に載っている個々の token/component に、コード側の唯一の対応実装があり、かつそれが一貫して・効果的に使われているか」を機械的にチェックする。

**重要な注意**: 本ブランチ (`fix/figma-code-parity`) は PR #132 で以下4件をすでに統合済み。**main にはまだ反映されていない**。表の該当行はブランチ現状で「解消済み」と書くが、main は依然として旧状態（重複あり）。
- アコーディオン（Question/Question List）→ `useAccordionHeight` + `AccordionChevron` に統合
- Card Arrow → `CardArrowFlow` に統合
- もっと知るボタン → `MoreLinkButton` に統合
- StoryCard size="m" 横並び + TOPページ重複解消

---

## 追記(2026-07-20 対応実施後)

以下の下線付き見出しの重複・デッドコード・命名不一致に対応し、コミット済み。本節の内容は対応"前"の監査記録として残す(各項目の詳細評価文は当時のまま)。現状のコード対応は `docs/design/figma-design-system.md` の各項目に付記した「→」注記を参照。

**リネーム(Figma名との対応を明確化)**
- `.tag-pill`/`.tag-pill-dark` → `.tag`/`.tag-dark`
- `Header.tsx` → `Navigation.tsx`
- `CheckboxDropdown.tsx` → `DropdownPC.tsx`、`MultiSelectDropdown.tsx` → `DropdownSP.tsx`
- `MobileTocNav.tsx` → `PageNavSP.tsx`

**デッドコード削除**
- `.btn-secondary` / `.btn-secondary-m` / `.btn-secondary-s` / `.btn-ghost` / `.btn-primary-dark`(使用箇所0件のため削除)

**重複解消**
- PropertyFilter/StoriesFilter の適用・クリアボタン → `SortApplyButton.tsx` / `SortClearButton.tsx` に共通化
- PropertyCard/PickupCard のステータス判定・カテゴリラベル・価格フォーマット → `src/lib/propertyDisplay.ts` に共通化
- MobileFilterNav/MobileStoriesFilter/PageNavSP の「フローティングピル+全画面モーダル」殻 → `SpFloatingTrigger.tsx`/`SpModalBackdrop.tsx`/`SpModalCloseButton.tsx` に共通化(showBar可視性判定は`useScrollVisibility.ts`に共通化。ただしPageNavSPは activeIndex 追跡と絡むためスクロールロジック自体は据え置き)
- book アイコンSVG(6ファイル)・Footer内Instagram/YouTubeアイコン(2箇所) → `src/components/ui/icons.tsx` に共通化
- ContactBanner.tsx 内の3枚のCard Contact重複 → `src/components/ui/CardContact.tsx` に抽出

**ディレクトリ再編(2026-07-20、上記のリネーム/重複解消をコミット後に追加実施)**

ユーザーから「`src/components` の構成を `figma-design-system.md` の構造に対応させたい、そうすればディレクトリを見るだけでデザインシステムの導入状況を管理できる SSoT になる」との要望があり、`src/components/ui/` 直下(平置き約33ファイル)を本ドキュメントの見出しに沿ったサブフォルダへ再編した。

- 対象は `ui/` のみ。`home/property/story/voice/owner` はページ機能で凝集させる既存方針を維持し、Figma カテゴリでの再編対象から明示的に除外した(理由: Card 系コンポーネントがドメイン横断で `property/story/voice` に分散しているため、これらを `ui/card/` 等へ統合すると機能的凝集が失われ、85ファイル規模の大規模移動になりリスクに見合わない)。
- Typography/Color/Assets/Breakpoints の4見出しはトークンであり `tailwind.config.ts`/`globals.css` に対応するため、コンポーネントフォルダへの写像対象外とした。
- 「Other」「Pattern」は Figma 側の雑多カテゴリ名であり、そのままフォルダ名に採用すると可読性が下がるため、実体(アコーディオン/カルーセル系→`content/`、SP絞り込みモーダル殻→`filter/`)に即した名前を付けた。マッピングの詳細と対応表は `figma-design-system.md` の「ディレクトリ構成」節を参照。
- 本ドキュメントに掲載の無いユーティリティ/ページ固有コンポーネント(`CmsImage`/`ParallaxLayer`/`Reveal`/`ParkingBanner`/`HeroCardStory`/`SearchProgress`/`Pagination`)は `ui/misc/` に集約し、「カタログ対象外である」ことを隠さず可視化した。
- 全 import パス・Storybook `title` を新パスに追従させ、`tsc --noEmit` / `next lint` / `next build`(28/28ページ生成) / Playwright(TOP・properties・stories・for-owner・staff-interview、コンソールエラー0件)で回帰なしを確認済み。

**保留(意図的に対応しなかった項目とその理由)**
- Heading・Toggle・Card Link・List Item Deco/Def・Pattern>Paper: コード対応が元々存在しないため、新規UI構築はスコープ外として見送り(要ユーザー判断)
- `accent-blue` → `blue` へのリネーム: Tailwindデフォルトカラースケール名と衝突するリスクがあるためユーザー確認の上、現状維持と決定
- `ContactCtaBanner.tsx`: PC/SP一体の responsive マークアップのため `CardContact.tsx` への統合は構造変更のリスクが大きく見送り
- Card Story XL(`FeaturedStoryCard`/`stories/[id]`ヒーロー重複)・`StoryCardLarge`再実装: 今回は対象外、継続課題として残す
- **新規発見(未対応)**: `src/app/page.tsx`(TOPページ)が`ContactBanner.tsx`を使わず、ほぼ同型の「背景画像+見出し+CTAカード」パターンを独自にインライン実装している(1CTA版、`ContactBanner.tsx`は3CTA版で`/properties`のみで使用)。Banner Contactパターンの3つ目の重複実装。今回は検証中に発見しただけで未対応、継続課題

---

## Typography（17項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| 列名/H1〜H6/Category Title 1-2/Body L/M/S/Caption/Caption(太) | `tailwind.config.ts` の `fontSize`（heading-*）+ `globals.css` の `h1`〜`h6` base layer、`.text-body-*`/`.text-category-*`/`.text-caption` | **一貫使用・SSOT**。全ページで個別上書きなく共通クラス経由 |
| Button L (18px) | `globals.css` `.btn-primary`（1箇所使用: `ContactForm.tsx`） | **形骸化寸前**。トークンは存在するが実質1箇所でしか使われず、他のプライマリボタン(SP等)はアドホック実装（下記 Interactive Buttons 参照） |
| Button M (13px) | `globals.css` `.btn-secondary-m` | **デッドコード**（コード内使用箇所0件） |
| Button S (14px) | `globals.css` `.btn-secondary-s` | **デッドコード**（使用箇所0件） |

## Color（10項目: Primary/Secondary/Background/Background+Text/Background+Buttons）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Dark Green/Light Green/Cream/Blue(accent-blue)/Light Blue/Black/White 他 | `tailwind.config.ts` の `colors` | **一貫使用・SSOT**。任意の16進値埋め込みは確認されず、全て名前付きトークン経由 |

## Assets（4項目: Logo/Icon/Favicon/OG Image）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Logo | `/public/images/logo-dark.svg` / `logo-white.svg`（`Header.tsx`/`Footer.tsx` から参照） | **SSOT**。インライン複製なし、アセットファイル参照のみ |
| Favicon | `src/app/favicon.ico` | **SSOT**（Next.js規約） |
| Icon（favicon的な意味） | `src/app/icon.svg` | **SSOT** |
| OG Image | `src/app/opengraph-image.tsx` | **SSOT**（Next.js規約） |

## Breakpoints（3項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Mobile/Tablet・Desktop・Desktop-Ultrawide | `tailwind.config.ts` の `screens`（tablet:993px, desktop:1440px, ultrawide:1920px） | **一貫使用・SSOT** |

## Iconography（System 24px / Social Media 24px）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| System 24px / Social Media 24px | 対応する共通Iconコンポーネント無し。23ファイルにインラインSVGが散在 | **カバレッジ無し・実害あり重複**。book アイコン（同一パス文字列）が `SeeAllButtonSP.tsx`/`MoreLinkButton.tsx`/`PropertyCard.tsx`/`PickupCard.tsx`/`StoryCard.tsx`/`StoryCardOverlay.tsx` の**6箇所**にコピペ。Instagram/YouTubeアイコンも `Footer.tsx` 内でPC/SPブロック間に重複。スタイル変更のたびN箇所同期が必要な状態 |

## Interactive > Buttons（PC/SP計14項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Arrow（円矢印） | `src/components/ui/ArrowButton.tsx` | **模範的SSOT**。コード内コメントで明示的に「唯一の実装」と宣言、全箇所がこれ経由 |
| Button Primary（PC） | `.btn-primary`（1使用） | 形骸化（Typography節参照） |
| Button Secondary（PC） | `.btn-secondary`（globals.css） | **デッドコード**（使用箇所0件）。実際のセカンダリ導線は `.btn-outline-fill`（12箇所）や `SeeAllLink.tsx` が個別に担っている |
| Sort / Sort Clear（PC） | `PropertyFilter.tsx`/`StoriesFilter.tsx` 内に個別実装（適用/クリアボタン） | 下記 Filter 節で詳述: **シェル部分がコピペ重複** |
| Textlink（PC） | `.btn-ghost`（globals.css） | **デッドコード**（使用箇所0件）。実際のテキストリンクは `SeeAllLink.tsx` が個別クラスで実装 |
| Button Primary Sp | `SeeAllButtonSP.tsx` の独自Tailwindクラス（`.btn-primary` 不使用） | Figmaトークンとしての `.btn-primary` を迂回した個別実装 |
| Button Primary Small Sp | `MoreLinkButton.tsx`（mode="sp"）の独自Tailwindクラス | 同上 |
| Button Secondary Small Sp | 対応箇所未確認（`.btn-secondary-s` はデッドコード） | カバレッジ不明瞭 |
| Sort Sp / Sort Clear Sp | `MobileFilterNav.tsx`/`MobileStoriesFilter.tsx` | Filter節で詳述: **シェル重複** |
| Textlink Sp | 明確な対応なし | カバレッジ無し |

## Interactive > Tags

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Tags | `.tag-pill`（25箇所）/ `.tag-pill-dark`（7箇所） | **一貫使用・SSOT**。globals.cssのコメントに「18箇所で完全一致確認の上ベースクラス統合」と経緯あり |

## Interactive > Toggle（PC/SP）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Toggle PC/SP | **対応コード無し**。"toggle" は全てアコーディオン/ドロップダウン/フィルターパネルの開閉状態変数名としての用法で、スイッチUI（`role="switch"`等）は存在しない | **カバレッジ無し**。Figmaノードの並び順的にDropDownの開閉トリガーを指している可能性はあるが、独立コンポーネントとしての実装は無い |

## Interactive > DropDown（PC/SP）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| DropDown PC | `src/components/ui/CheckboxDropdown.tsx` | **SSOT**。`PropertyFilter.tsx`・`StoriesFilter.tsx` の両方がこれをimportして委譲（アドホックな第三の実装なし） |
| DropDown SP | `src/components/ui/MultiSelectDropdown.tsx` | **SSOT**。`MobileFilterNav.tsx`・`MobileStoriesFilter.tsx` の両方が委譲 |

## Components > Navigation（PC/SP, Default/Opened）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Navigation PC/SP（Default/Opened 両状態） | `src/components/ui/Header.tsx` | **SSOT**。`mobileOpen`（SPハンバーガー）・`dropdownOpen`（PCホバー、250msグレース）で両状態を1コンポーネント内に実装 |

## Components > Heading

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Heading（section-heading/sub-heading-1） | **対応する共通コンポーネント無し**。h1〜h6 + `font-mincho` + アドホックなサイズ上書き（`text-[2rem]`/`text-[3rem]` 等）が26箇所以上で個別記述 | **カバレッジ無し**。統一すべきかは意図的差異の可能性も含め未確認（前回の指摘済み・継続課題） |

## Components > Card（PC計13項目・SP計11項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Card Story L/M/S | `src/components/story/StoryCard.tsx`（`size: 'l'\|'m'\|'s'` prop） | **SSOT**（本ブランチでPR #132によりTOPページ重複解消済み。main未反映） |
| Card Story XL | **対応共通コンポーネント無し**。`FeaturedStoryCard`（`stories/page.tsx:96-145`）と `stories/[id]/page.tsx:110` のヒーローブロックが別々に手書き | **重複（2箇所、非効果的）** |
| （派生） `StoryCardLarge` | `stories/page.tsx:44-93` が `StoryCard size="l"` と同一classをページローカルに再実装 | **重複**。`StoryCard` を直接importすべきところを再実装 |
| Card Story SP | `StoryCardOverlay.tsx` | **SSOT**。stories一覧/物件詳細/StoryCarouselの全箇所がこれ経由 |
| Card Voice（PC/SP） | `src/components/voice/VoiceCard.tsx` | **SSOT** |
| Card Contact / Banner Contact | `ContactBanner.tsx`（3CTA固定ピル）/ `ContactCtaBanner.tsx`（2CTAパラメトリック） | **問題なし**。別Figmaノードに対応する意図的な別実装で、各々単独ファイルとして一貫 |
| Card Property / ピックアップ | `PropertyCard.tsx` / `PickupCard.tsx` | **同一ロジックの重複3件**: ①`isSold`/`isNegotiating`/`statusLabel`導出（成約済み/商談中判定）②categoryLabel導出③価格/賃料フォーマットの三項演算子、いずれも一字一句コピペ |
| Card Article（PC） | `src/components/owner/ArticleCarousel.tsx` | **SSOT**（`SlideshowNav`を再利用、単独使用） |
| Card Link | **対応コード無し（確認済み: 全文grepでヒット0）** | **カバレッジ無し** |
| Section / Card / Banner等の残り小項目 | 個別ページ内に散在、共通抽出なし（重大な重複は上記に集約） | 軽微 |

## Post（PC計4項目・SP計2項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Rich Text（PC/SP） | `src/components/ui/RichText.tsx` + `globals.css` `.rich-content` | **概ねSSOT**。ただし `VoiceContent.tsx` の体験談本文は `RichText.tsx` を経由せず、独自の `.voice-rich`（imgのみのルール）で別ルート描画 → **一部不整合** |
| Image + Caption（PC/SP） | `.rich-content img` + `.rich-content p:has(> em:only-child)`（globals.css） | **SSOT**（RichText経由） |
| Comment（PC/SP） | `.rich-content .rich-comment`（globals.css） | **SSOT** |
| Interview Item（PC） | `staff-interview/page.tsx:187-213` の `InterviewItemComponent`（ページローカル関数） | **問題なし**。単一使用のため未抽出は妥当 |

## Other（PC計8項目・SP計7項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Question List / Question（アコーディオン） | `useAccordionHeight` + `AccordionChevron`（`FaqAccordion`/`NewsAccordion`/`VoiceContent`から共通利用） | **解消済み（PR #132、main未反映）**。統合前は3箇所別実装 |
| Card Arrow（PC/SP） | `src/components/ui/CardArrowFlow.tsx`（`for-owner`/`for-customer`で使用） | **解消済み（PR #132、main未反映）** |
| Navigation Slide Show / Side Bar Dots | `src/components/ui/SlideshowNav.tsx` | **SSOT**。`StoryCarousel`/`PropertyCarousel`/`VoiceCarousel`/`ArticleCarousel`/`MoreProperties`/`RelatedStoriesGrid`の6箇所が共通利用。新規追加の関連ストーリードットページャー（`RelatedStoriesGrid.tsx`）も正しく既存コンポーネントを再利用（一発実装せず） |
| Paragraph | `.rich-content p`（globals.css） | **SSOT** |
| List Item Deco / List Item Def | 対応するul/ol/liルールが `.rich-content` 内に無し | **カバレッジ無し** |
| Popup Filter Drop Down SP / Popup Filter List SP | `MobileFilterNav.tsx` / `MobileStoriesFilter.tsx` | 下記Filter節参照。**モーダル殻部分が重複** |

## Pattern（PC計2項目・SP計5項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Paper | 対応する共通「紙面」クラス無し。カード背景色（bg-cream/bg-white/bg-light-green）は各コンポーネントに個別直書き | **カバレッジ無し** |
| Link | `.btn-ghost`（globals.css） | **デッドコード**（使用箇所0件、Interactive>Buttons節のTextlinkと同一問題） |
| Radio Button Sort SP/Card Arrow SP/Rich Text SP/Interview Item SP/Paragraph SP | — | Figma側の整理上の再掲。上記Filter/CardArrowFlow/Post節と同一実体、独立の評価対象ではない |

## Filter（PC計2項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Radio Button Sort / Story Category | `PropertyFilter.tsx`（221行・物件用）と `StoriesFilter.tsx`（131行・ストーリー用） | **下層はSSOT、外殻は重複**。どちらも`CheckboxDropdown`委譲は共通だが、適用ボタン・クリアボタン・Xアイコンパスが一字一句同一にコピペされ、`sameSet`ヘルパーも重複定義。共通コンテナとして未抽出 |
| （SP側）Sort Sp / Sort Clear Sp | `MobileFilterNav.tsx`（255行）/ `MobileStoriesFilter.tsx`（244行） | **外殻が重複（2ファイル）**。フローティングピル・全画面モーダル背景・閉じるボタン(同一SVGパス)がほぼ同一。`MultiSelectDropdown`委譲は共通 |

## Local Nav（PC/SP計2項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Page Nav SP / Page Nav Open SP | `src/components/ui/TocNav.tsx`（PC）/ `MobileTocNav.tsx`（SP） | **コンテンツ部はSSOT**。ただし `MobileTocNav` のSPモーダル殻（フローティングピル・全画面オーバーレイ・閉じるボタン）は上記 `MobileFilterNav`/`MobileStoriesFilter` と**全く同一のパターンが3ファイルにまたがって重複** — 横断的な「SP用フローティングアクション+全画面モーダル」共通コンポーネント化の余地あり |

## Footer（PC/SP: Default/Opened計3項目）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| Footer PC / SP（Default/Opened） | `src/components/ui/Footer.tsx` | **SSOT**。`isAccordionOpen`でSPアコーディオン開閉、PCは静的展開レイアウト。両状態カバー済み |

## Card（状態分け）（計4項目: 掲載中/売却中/商談中・成約済み × カード/ピックアップ）

| Figma項目 | コード対応 | 評価 |
|---|---|---|
| 掲載中/売却中/商談中/成約済みのステータス表示 | `PropertyCard.tsx` / `PickupCard.tsx` | 上記Card節と同一問題（**ロジック3件が一字一句重複**） |

---

## 総括: 重複・カバレッジ欠如の一覧（優先度の参考、対応要否は要相談）

### カバレッジ無し（コード対応が存在しない）
1. Heading（section-heading/sub-heading-1）— 26箇所以上で個別実装
2. Toggle（PC/SP）
3. Card Link
4. List Item Deco / List Item Def
5. Pattern > Paper

### デッドコード（globals.cssに定義されているが使用箇所0件）
6. `.btn-secondary` / `.btn-secondary-m` / `.btn-secondary-s` / `.btn-ghost` / `.btn-primary-dark`

### 重複（複数箇所に同一ロジック/マークアップがコピペ）
7. PropertyCard/PickupCard: ステータス判定・カテゴリラベル・価格フォーマットの3ロジック
8. book アイコンSVG（6ファイル）、Instagram/YouTubeアイコン（Footer内2箇所）
9. Card Story XL（`FeaturedStoryCard` と `stories/[id]` ヒーローが別実装）、および `StoryCardLarge` の再実装
10. PropertyFilter/StoriesFilter の適用・クリアボタン殻
11. MobileFilterNav/MobileStoriesFilter/MobileTocNav の「フローティングピル+全画面モーダル」殻（3ファイル横断）
12. VoiceContent が RichText.tsx を経由せず独自ルートでリッチテキスト描画

### 解消済み（本ブランチ限定、main未反映）
13. Question/Question List（アコーディオン）→ 統合済み
14. Card Arrow → `CardArrowFlow` に統合済み
15. もっと知るボタン → `MoreLinkButton` に統合済み
16. Card Story TOPページ重複 → 解消済み

**次のアクション**: この一覧をもとに、どれを直すか・直さない（意図的差異）と判断するかをご相談したい。
