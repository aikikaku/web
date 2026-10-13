# デザインシステム Figma対応表

Source: [Notion — ai-kikaku design system](https://app.notion.com/p/sanu/ai-kikaku-design-system-3a1d14f248a8808fae3df4ec578f44ce)
取得日: 2026-07-20
Figma fileKey: `rAdZUPq1BgzHVRP7QOhXC8`

デザインシステムの各要素に対応する Figma node の一覧。

**コード対応の網羅評価**: 2026-07-20、各項目のコード対応(あるいは対応無し)を全項目調査し、以下に「→」で追記した。
詳細な評価根拠・重複/デッドコードの一覧は [design-system-catalog-audit.md](./design-system-catalog-audit.md) を参照。
この行以降の「→」注記はコード側のリネーム・重複解消(2026-07-20実施)後の状態を指す。

**ディレクトリ構成(2026-07-20 追加実施、同日中に方針転換)**: `src/components/ui/` 直下(旧・約33ファイルの平置き)を、本ドキュメントのカテゴリに対応させて以下のサブフォルダへ再編した。`home/property/story/voice/owner` 等の機能別ドメインフォルダは維持し(こちらは Figma カテゴリではなくページ機能で凝集させる方針は変更しない)、あくまで下層の `ui/` のみを本ドキュメントの見出しに合わせている。

**`ui/` の役割の明確化(2026-07-20)**: `ui/` はこのドキュメントに載っている Figma カタログ項目とのみ対応させる、というのが一貫した要求。当初 `ui/misc/` としてカタログ対象外のユーティリティを`ui/`配下に「可視化のため」受け皿として置いていたが、これは`ui/`＝デザインシステム対応、という原則に反するため撤回。`CmsImage`/`ParallaxLayer`/`Reveal`/`ParkingBanner`/`HeroCardStory`/`SearchProgress`/`Pagination`の7点は`ui/`の外の`src/components/common/`(ドメイン横断の技術ユーティリティ置き場、Figma カタログとは無関係)へ移動した。

| `ui/` サブフォルダ | 対応する本ドキュメントの見出し |
| --- | --- |
| `navigation/` | Components > Navigation, Local Nav(PC 版 `TocNav` も同居) |
| `interactive/` | Interactive > Buttons(PC/SP), DropDown |
| `card/` | Components > Card 全体(Card Story / Card Voice / Card Property / Card Contact / Banner Contact / Card Link / Service CTA)。2026-07-20、Card Story/Voice/Propertyをドメインフォルダから昇格し集約 |
| `content/` | Other(Question/Question List, Card Arrow, Side Bar Dots 等) |
| `popup/` | Other > Popup Filter Drop Down SP / List SP(SP 絞り込みモーダル殻。「Filter」はPropertyFilter/StoriesFilterのため予約し`filter`という名前は使わない) |
| `post/` | Post |
| `icons/` | Iconography |
| `footer/` | Footer |

`src/components/common/` は本ドキュメントのカテゴリに対応しない(Figma カタログ対象外)。`ui/` には置かない。

Typography/Color/Assets/Breakpoints は `tailwind.config.ts` / `globals.css` 側のトークンであり、対応するコンポーネントフォルダは存在しない(全項目の対応表は上記各節を参照)。

## Typography

1. 列名: [node-id=4211-26399](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26399&m=dev)
2. H1: [node-id=4211-26400](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26400&m=dev) → `globals.css` `h1`
3. H2: [node-id=4211-26401](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26401&m=dev) → `globals.css` `h2`
4. H3: [node-id=4211-26402](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26402&m=dev) → `globals.css` `h3`
5. H4: [node-id=4211-26403](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26403&m=dev) → `globals.css` `h4`
6. H5: [node-id=4211-26404](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26404&m=dev) → `globals.css` `h5`
7. H6: [node-id=4211-26405](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26405&m=dev) → `globals.css` `h6`
8. Category Title 1: [node-id=4211-26406](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26406&m=dev) → `.text-category-1`
9. Category Title 2: [node-id=4211-26407](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26407&m=dev) → `.text-category-2`
10. Body L: [node-id=4211-26408](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26408&m=dev) → `.text-body-l`
11. Body M: [node-id=4211-26409](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26409&m=dev) → `.text-body-m`
12. Body S: [node-id=4211-26410](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26410&m=dev) → `.text-body-s`
13. Caption: [node-id=4211-26398](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26398&m=dev) → `.text-caption`
14. Caption（太）: [node-id=4211-26412](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26412&m=dev) → 対応クラス無し(アドホック実装)
15. Button L: [node-id=4211-26413](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26413&m=dev) → `.btn-primary`(使用1箇所のみ、形骸化気味)
16. Button M: [node-id=4211-26414](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26414&m=dev) → 対応コード無し(旧`.btn-secondary-m`は使用0件のため2026-07-20削除)
17. Button S: [node-id=4211-26415](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26415&m=dev) → 対応コード無し(旧`.btn-secondary-s`は使用0件のため2026-07-20削除)

## Color

### Primary

1. Dark Green: [node-id=4211-26472](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26472&m=dev) → `tailwind.config.ts` `colors.dark-green`
2. Light Green: [node-id=4211-26475](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26475&m=dev) → `colors.light-green`
3. Cream: [node-id=4211-26476](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26476&m=dev) → `colors.cream`

### Secondary

1. Blue: [node-id=4211-26479](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26479&m=dev) → `colors.accent-blue`(名称不一致は意図的に維持。理由は監査ドキュメント参照)
2. Light Blue: [node-id=4211-26480](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26480&m=dev) → `colors.light-blue`

### Background

1. Black: [node-id=4211-26483](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26483&m=dev) → Tailwind標準色
2. White: [node-id=4211-26484](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26484&m=dev) → Tailwind標準色

### Background + Text

1. [node-id=96-36927](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=96-36927&p=f&m=dev) → 対応コード無し(具体的な組み合わせパターン)

### Background + Buttons

1. [node-id=96-36927](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=96-36927&p=f&m=dev) → 対応コード無し

## Assets

### Logo

1. [node-id=4211-26439](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26439&m=dev) → `/public/images/logo-dark.svg` / `logo-white.svg`

### Icon

1. [node-id=96-36927](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=96-36927&p=f&m=dev) → `src/app/icon.svg`

### Favicon

1. [node-id=96-36927](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=96-36927&p=f&m=dev) → `src/app/favicon.ico`

### OG Image

1. [node-id=96-36927](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=96-36927&p=f&m=dev) → `src/app/opengraph-image.tsx`

## Breakpoints

### Mobile / Tablet

1. [node-id=4211-26422](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26422&m=dev) → `tailwind.config.ts` `screens.tablet`(993px)

### Desktop

1. [node-id=4211-26426](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26426&m=dev) → `screens.desktop`(1440px)

### Desktop - Ultra-wide

1. [node-id=4211-26430](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26430&m=dev) → `screens.ultrawide`(1920px)

## Iconography

### System 24px

1. [node-id=4211-26337](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26337&m=dev) → 対応コード無し(共通Iconコンポーネント無し、各ファイルにインラインSVG。共通アイコンは`src/components/ui/icons/icons.tsx`に一部集約済み)

### Social Media 24px

1. [node-id=4211-26335](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26335&m=dev) → `src/components/ui/icons/icons.tsx`(`InstagramIcon`/`YoutubeIcon`、`footer/Footer.tsx`で共通利用)

## Interactive

### Buttons（PC アイコンは非表示利用可能）

1. 列名: [node-id=4211-26015](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26015&m=dev)
2. Arrow: [node-id=4211-26020](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26020&m=dev) → `src/components/ui/interactive/ArrowButton.tsx`(単一のSSOTとしてコード内で明示)
3. Button Primary: [node-id=4211-26033](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26033&m=dev) → `.btn-primary`(使用1箇所のみ)
4. Button Secondary: [node-id=4211-26046](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26046&m=dev) → 対応コード無し(旧`.btn-secondary`は使用0件のため2026-07-20削除。実質`.btn-outline-fill`/`SeeAllLink.tsx`が代替)
5. Sort: [node-id=4211-26067](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26067&m=dev) → `src/components/ui/interactive/SortApplyButton.tsx`(2026-07-20新設、PropertyFilter.tsx/StoriesFilter.tsxで共通利用)
6. Sort Clear: [node-id=4211-26076](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26076&m=dev) → `src/components/ui/interactive/SortClearButton.tsx`(2026-07-20新設、同上)
7. Textlink: [node-id=4211-26089](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26089&m=dev) → 対応コード無し(旧`.btn-ghost`は使用0件のため2026-07-20削除。実質`SeeAllLink.tsx`が代替)

### Buttons（SP アイコンは非表示利用可能）

1. 列名: [node-id=4211-26113](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26113&m=dev)
2. Button Primary Sp: [node-id=4211-26127](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26127&m=dev) → `src/components/ui/interactive/SeeAllButtonSP.tsx`
3. Button Primary Small Sp: [node-id=4211-26143](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26143&m=dev) → `src/components/ui/interactive/MoreLinkButton.tsx`(`mode="sp"`)
4. Button Secondary Small Sp: [node-id=4211-26159](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26159&m=dev) → 対応コード無し
5. Sort Sp: [node-id=4211-26175](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26175&m=dev) → `MobileFilterNav.tsx` / `MobileStoriesFilter.tsx`内(共通`DropdownSP`経由)
6. Sort Clear Sp: [node-id=4211-26185](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26185&m=dev) → 同上
7. Textlink Sp: [node-id=4211-26195](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26195&m=dev) → 対応コード無し

### Tags

1. [node-id=4211-26218](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26218&m=dev) → `.tag` / `.tag-dark`(2026-07-20に`.tag-pill`/`.tag-pill-dark`からリネーム)

### Toggle

1. Toggle PC: [node-id=4211-26225](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26225&m=dev) → `src/components/ui/interactive/Toggle.tsx`(2026-07-20新設。当初「対応コード無し」と誤評価していたが、`PropertyFilter.tsx`のステータス切替に個別実装が存在すると判明し共通化)
2. Toggle SP: [node-id=4211-26238](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26238&m=dev) → 同上(`MobileFilterNav.tsx`)

### DropDown

1. PC
   1. 列名: [node-id=4211-26253](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26253&m=dev)
   2. 内容: [node-id=4211-26258](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26258&m=dev) → `src/components/ui/interactive/DropdownPC.tsx`(2026-07-20に`CheckboxDropdown.tsx`からリネーム)
2. SP
   1. 列名: [node-id=4211-26295](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26295&m=dev)
   2. 内容: [node-id=4211-26299](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-26299&m=dev) → `src/components/ui/interactive/DropdownSP.tsx`(2026-07-20に`MultiSelectDropdown.tsx`からリネーム)

## Components

### Navigation

1. PC
   1. Type = Default: [node-id=4211-24847](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24847&m=dev) → `src/components/ui/navigation/Navigation.tsx`(`dropdownOpen`、2026-07-20に`Header.tsx`からリネーム)
   2. Type = Opened: [node-id=4211-24867](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24867&m=dev) → 同上
2. SP
   1. Type = Default: [node-id=4211-25409](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25409&m=dev) → `navigation/Navigation.tsx`(`mobileOpen`)
   2. Type = Opened: [node-id=4211-25413](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25413&m=dev) → 同上

### Heading

親フレーム: [node-id=4211-24913](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24913&m=dev)(Heading カテゴリのコンテナ。単体コンポーネントではなく下記4種を内包)

1. page-heading: [node-id=4211-24917](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24917&m=dev) → `src/components/ui/heading/PageHeading.tsx`(2026-07-20新設、H1相当)
2. section-heading: [node-id=4211-24920](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24920&m=dev) → `src/components/ui/heading/SectionHeading.tsx`(2026-07-20新設、H2相当)
3. sub-heading-1: [node-id=4211-24923](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24923&m=dev) → `src/components/ui/heading/SubHeading1.tsx`(2026-07-20新設、H3相当)
4. sub-heading-2: [node-id=4211-24926](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24926&m=dev) → `src/components/ui/heading/SubHeading2.tsx`(2026-07-20新設、H4相当)

**注記**: 上記4コンポーネントは新設のみで、既存の26箇所以上のアドホックなh1〜h6見出し実装をこれらへ移行する作業は別スコープ(未着手・継続課題)。

### Card

**2026-07-20 追記**: Card Story/Card Voice/Card Property(実体としてのカード本体)は、Navigation/Headingと同様に本節の見出しに直接対応させるため、`story/`/`voice`/`property`ドメインフォルダから`src/components/ui/card/`へ昇格した(`git mv`、履歴保持)。ドメインフォルダには引き続きフィルター/カルーセル等のページ機能コンポーネントのみを残す。`ContactBanner.tsx`もFigmaの実レイヤー名`banner-contact`に合わせ`BannerContact.tsx`へ改称。

1. PC
   1. Card Story L: [node-id=4211-24933](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24933&m=dev)(実レイヤー名`card-story-l`) → `src/components/ui/card/CardStory.tsx`(`size="l"`)
   2. Card Story M: [node-id=4211-24944](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24944&m=dev) → `CardStory.tsx`(`size="m"`)
   3. Card Story S: [node-id=4211-24955](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24955&m=dev) → `CardStory.tsx`(`size="s"`)
   4. Card Voice: [node-id=4211-24966](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24966&m=dev)(実レイヤー名`card-voice`) → `src/components/ui/card/CardVoice.tsx`(**未解決**: 実ページ`/voice`は`VoiceContent.tsx`のアコーディオン形式を使い、TOPページの`VoiceCarousel.tsx`は同カルーセル内にローカルな別実装`VoiceCard`関数を持つ。`CardVoice.tsx`自体は`components-preview`ページでのみ使用されており、実ページでの採用状況を要相談)
   5. Section: [node-id=4211-24978](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24978&m=dev) → レイアウト用ラッパー(「お客様の声」カルーセルの外殻)。単体コンポーネント不要(2026-07-20確認)
   6. Card: [node-id=4211-24985](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24985&m=dev) → `src/components/ui/card/ServiceCTA.tsx`(「不動産をお探しの方へ/お持ちの方へ」CTA。2026-07-20判明。TOPページ(`src/app/page.tsx`)のみこれを使わず同一マークアップを独自に持っていたため、`ServiceCTA`に`parallax`オプションを追加し統合)
   7. Section: [node-id=4211-24994](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24994&m=dev) → レイアウト用ラッパー(上記Cardを2枚並べたSection)。単体コンポーネント不要(2026-07-20確認)
   8. Card Contact: [node-id=4211-24998](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-24998&m=dev)(実レイヤー名`card-contact`) → `src/components/ui/card/CardContact.tsx`(2026-07-20新設。`BannerContact.tsx`内の3箇所重複を解消)
   9. Banner Contact: [node-id=4211-25002](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25002&m=dev)(実レイヤー名`banner-contact`) → `src/components/ui/card/BannerContact.tsx`(2026-07-20、`ContactBanner.tsx`から改称)
   10. Card Link: [node-id=4211-25008](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25008&m=dev) → `src/components/ui/card/CardLink.tsx`(2026-07-20新設。当初「対応コード無し」と誤評価していたが、`properties/[id]/page.tsx`の「物件資料」「お問い合わせ」カードに4箇所重複していた同一マークアップと判明し共通化)
   11. Card Property: [node-id=4211-25013](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25013&m=dev)(実レイヤー名`card-property`) → `src/components/ui/card/CardProperty.tsx`(ステータス/カテゴリ/価格ロジックは`src/lib/propertyDisplay.ts`に共通化、2026-07-20)
   12. Card Article: [node-id=4211-25105](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25105&m=dev)(実レイヤー名`card-article`) → `src/components/owner/ArticleCarousel.tsx`(カード自体はcarousel内にinline実装。**未解決**: `ui/card/CardArticle.tsx`として抽出すべきか要相談)
   13. Card Story XL: [node-id=4211-25116](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25116&m=dev) → 対応共通コンポーネント無し(`stories/page.tsx`の`FeaturedStoryCard`と`stories/[id]/page.tsx`のヒーローが別実装、重複あり・継続課題)
2. SP
   1. Card Section SP: [node-id=4211-25438](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25438&m=dev)
   2. Card Story SP: [node-id=4211-25447](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25447&m=dev)(実レイヤー名`card-story-sp`) → `src/components/ui/card/CardStorySp.tsx`(2026-07-20改称、旧`StoryCardOverlay.tsx`)
   3. Card Voice SP: [node-id=4211-25457](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25457&m=dev) → `CardVoice.tsx`(共通。上記4と同じ未解決事項)
   4. Section: [node-id=4211-25469](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25469&m=dev)
   5. Card SP: [node-id=4211-25484](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25484&m=dev) → `ServiceCTA.tsx`(SP部、共通)
   6. Section: [node-id=4211-25489](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25489&m=dev)
   7. Banner Contact SP: [node-id=4211-25492](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25492&m=dev) → `src/components/ui/card/BannerContact.tsx`(SP部)
   8. Card Link SP: [node-id=4211-25498](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25498&m=dev) → 同上(`src/components/ui/card/CardLink.tsx`)
   9. Card Property SP: [node-id=4211-25503](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25503&m=dev)(実レイヤー名`card-propaty-sp`、Figma側タイポ) → `CardProperty.tsx`(SP部) / `src/components/property/PickupCard.tsx`(Figma上に対応する独立ノード無し。TOPページの「ピックアップ物件」向け表示バリアントとしてドメインフォルダに維持)
   10. Card Story SP: [node-id=4211-25584](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25584&m=dev) → **訂正(2026-07-20)**: 実レイヤー名は`card-story-xl-sp`であり「Card Story SP」ではない。`CardStory.tsx`に対応するものではなく、13番Card Story XLのSP版(同じく`stories/page.tsx`の`FeaturedStoryCard`と`stories/[id]/page.tsx`のヒーローの重複・継続課題に含まれる)
   11. Card Article SP: [node-id=4211-25690](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25690&m=dev) → `ArticleCarousel.tsx`(SP部)

## Post

1. PC
   1. Image + Caption: [node-id=4211-25213](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25213&m=dev) → `globals.css` `.rich-content img` / `p:has(> em:only-child)`(`src/components/ui/post/RichText.tsx`経由)。**判断(2026-07-21)**: この要素はmicroCMSのリッチテキストエディタが出力するHTML(`<img>`+`<em>`キャプション)を`.rich-content`でスタイリングするもので、Reactコンポーネントとして差し込む対象ではない(CMS本文内に生成される)。よってReactコンポーネント化はせずCSSで対応が正。RichText.tsx がその適用エントリ
   2. Comment: [node-id=4211-25218](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25218&m=dev) → `globals.css` `.rich-content .rich-comment`(同上。CMS本文のコメント/引用ブロックのスタイル。Reactコンポーネント化せずCSSで対応が正)
   3. Interview Item PC: [node-id=4211-25225](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25225&m=dev) → `staff-interview/page.tsx`の`InterviewItemComponent`(単一使用のためページローカル)
   4. Rich Text PC: [node-id=4211-25237](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25237&m=dev) → `src/components/ui/post/RichText.tsx`(`VoiceContent.tsx`は`.voice-rich`で別ルート描画、一部不整合)
2. SP
   1. Image + Caption SP: [node-id=4211-25706](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25706&m=dev) → 共通(PC参照)
   2. Comment SP: [node-id=4211-25711](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25711&m=dev) → 共通(PC参照)

## Other

1. PC
   1. List Item Deco(実レイヤー名`List Item-deco`): [node-id=4211-25250](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25250&m=dev) → `src/components/ui/content/ListItemDeco.tsx`(2026-07-21新設。ラベル固定幅+値+MAPタグ。`properties/[id]/page.tsx`の物件概要テーブル所在地行で使用)
   2. List Item Def(実レイヤー名`List Item-def`): [node-id=4211-25259](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25259&m=dev) → `src/components/ui/content/ListItemDef.tsx`(2026-07-21新設。ラベル固定幅+値。`properties/[id]/page.tsx`の物件概要テーブル各行で使用)
      **決定(2026-07-21)**: `about/page.tsx`の会社概要`<dl>`は`justify-between`で値を**右寄せ**にする別レイアウト(所在地行にiframe地図・営業時間の複数行+注記など特殊行を含む)。ユーザー確認の結果、about会社概要は**意図的に右寄せデザイン**であり、`ListItemDeco`/`ListItemDef`(Figma List Item仕様=ラベル固定幅・値左寄せ)とは別物として据え置くと確定。about側は移行しない。
   3. Side Bar Dots(実レイヤー名`Slider Dots`): [node-id=4211-25262](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25262&m=dev) → `src/components/ui/content/SliderDots.tsx`(2026-07-21新設。ドット単独のページャー。`NavigationSlideshow`内部・`HeroSlideshowSP`で共通利用。従来は3箇所にインライン重複していたのを抽出)
   4. Navigation Slide Show(実レイヤー名`Navigation-Slideshow`): [node-id=4211-25269](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25269&m=dev) → `src/components/ui/content/NavigationSlideshow.tsx`(2026-07-21、旧`SlideshowNav.tsx`から実レイヤー名に合わせ改称。矢印+`SliderDots`+「すべて見る」。6箇所で共通利用)
   5. Question List(実レイヤー名`Question-list`): [node-id=4211-25275](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25275&m=dev) → アコーディオンのリスト。`FaqAccordion.tsx`(ui/content)/`NewsAccordion.tsx`(home)/`VoiceContent.tsx`(voice)が各文脈の Question-list に相当。開閉ロジックは`src/lib/useAccordionHeight.ts`、シェブロンは`ui/content/AccordionChevron.tsx`で共通化済み
   6. Question(実レイヤー名`Question`、Property 1=Default/Opened のバリアント): [node-id=4211-25281](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25281&m=dev) → 上記アコーディオンの1項目。**判断(2026-07-21)**: 開閉の仕組み(`useAccordionHeight`+`AccordionChevron`)は共通化済みだが、項目の中身がFAQ(緑の回答ボックス)/Voice(画像あり)/News と文脈ごとに実質的に異なるため、単一の`Question.tsx`へ無理に統合せず、各アコーディオン側が中身を持つ構成を維持する
   7. Card Arrow(実レイヤー名`Card_arrow`): [node-id=4211-25302](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25302&m=dev) → `src/components/ui/content/CardArrowFlow.tsx`(Card_arrow=1ステップのカード+矢印。`CardArrowFlow`はそれを縦に連ねたフロー全体で、for-customer/for-ownerで共通利用。「Flow」は意味を持つため名称維持)
   8. Paragraph: [node-id=4211-25308](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25308&m=dev) → `globals.css` `.rich-content p`
2. SP
   1. Side Bar Dots SP: [node-id=4211-25722](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25722&m=dev) → `content/SliderDots.tsx`(size="sm"、共通)
   2. List Item Deco SP: [node-id=4211-25729](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25729&m=dev) → 共通(`ListItemDeco.tsx`がレスポンシブ対応、SP 16px→PC 18px)
   3. List Item Def SP: [node-id=4211-25738](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25738&m=dev) → 共通(`ListItemDef.tsx`、同上)
   4. Question List SP: [node-id=4211-25741](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25741&m=dev) → 共通(PC参照)
   5. Question SP: [node-id=4211-25747](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25747&m=dev) → 共通(PC参照)
   6. Popup Filter Drop Down SP: [node-id=4211-25768](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25768&m=dev) → `MobileFilterNav.tsx` / `MobileStoriesFilter.tsx`(共通`src/components/ui/popup/{SpFloatingTrigger,SpModalBackdrop,SpModalCloseButton}.tsx`経由、2026-07-20共通化。「Filter」の名前は`## Filter`見出し=`PropertyFilter.tsx`/`StoriesFilter.tsx`のために予約するため`ui/popup/`に配置)
   7. Popup Filter List SP: [node-id=4211-25779](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25779&m=dev) → 同上

## Pattern

1. PC
   1. Paper: [node-id=4211-25335](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25335&m=dev) → 対応コード無し(カード背景色は各コンポーネントに個別直書き)
   2. Link: [node-id=4211-25336](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25336&m=dev) → 対応コード無し(旧`.btn-ghost`は使用0件のため2026-07-20削除。Interactive>Buttons>Textlinkと同一実体)
2. SP (Filter/Card Arrow/Post 節の再掲。独立の評価対象ではない)
   1. Radio Button Sort SP: [node-id=4211-25807](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25807&m=dev) → Filter節参照
   2. Interview Item SP: [node-id=4211-25810](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25810&m=dev) → Post節参照
   3. Rich Text SP: [node-id=4211-25821](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25821&m=dev) → Post節参照
   4. Card Arrow SP: [node-id=4211-25834](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25834&m=dev) → Other節(Card Arrow)参照
   5. Paragraph SP: [node-id=4211-25840](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25840&m=dev) → Other節(Paragraph)参照

## Filter

1. PC
   1. Radio Button Sort(実レイヤー名`radio-button sort`): [node-id=4211-25351](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25351&m=dev) → チェックボックス+ラベル1行。**判断(2026-07-21)**: これは`ui/interactive/Dropdown.tsx`のオプション行(options.map内のチェックボックス行)そのもの。Dropdown内部の構成要素であり他に重複が無いため、単独コンポーネント化はせずDropdownの一部として維持。上層の`PropertyFilter.tsx`/`StoriesFilter.tsx`が`Dropdown`+`Sort`+`SortClear`を組み合わせて使う
   2. Story Category(実レイヤー名`Story category`): [node-id=4211-25354](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25354&m=dev) → `src/components/story/StoriesFilter.tsx`のカテゴリ`Dropdown`。ストーリー機能固有のフィルターのためドメインフォルダ`story/`に維持(「Filter」名の予約に準拠)

## Local Nav

1. Page Nav SP: [node-id=4211-25868](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25868&m=dev) → `src/components/ui/navigation/PageNavSp.tsx`(2026-07-20に`MobileTocNav.tsx`からリネーム)
2. Page Nav Open SP: [node-id=4211-25874](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25874&m=dev) → 同上

## Footer

1. PC: [node-id=4211-25375](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25375&m=dev) → `src/components/ui/footer/Footer.tsx`
2. SP
   1. Default: [node-id=4211-25922](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25922&m=dev) → `footer/Footer.tsx`(`isAccordionOpen`)
   2. Opened: [node-id=4211-25962](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-25962&m=dev) → 同上

## Card（状態分け）

**判断(2026-07-21)**: 「Card状態分け」は`card-property`(実レイヤー名)の状態バリアント(掲載中/売却中/商談中/成約済み)であり、Figma上も独立コンポーネントではなく`card-property`のインスタンス(node 4211:11990は`card-property`のinstance)。よって新規コンポーネントは不要で、`ui/card/CardProperty.tsx`(表示)+`src/lib/propertyDisplay.ts`(状態判定ロジック)の組み合わせで対応済み。

1. 掲載中/売却中/商談中
   1. カード: [node-id=4211-11990](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-11990&m=dev) → `src/components/ui/card/CardProperty.tsx`(表示) + `src/lib/propertyDisplay.ts`(状態判定ロジック、2026-07-20共通化)。`PickupCard.tsx`も同ロジックを利用
   2. ピックアップ: [node-id=4211-11998](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-11998&m=dev) → 同上(`PickupCard.tsx`)
2. 成約済み
   1. カード: [node-id=4211-11989](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-11989&m=dev) → 同上
   2. ピックアップ: [node-id=4211-12000](https://www.figma.com/design/rAdZUPq1BgzHVRP7QOhXC8/アイ企画--Dev-?node-id=4211-12000&m=dev) → 同上
