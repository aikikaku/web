import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TocNav from './TocNav';

// 実際の呼び出し例 (src/app/staff-interview/page.tsx) の tocItems をそのまま使用
const tocItems = [
  '会社のこと',
  '三島の魅力を伝え続けるということ',
  '中古住宅も大切にする「もったいない精神」',
];

const meta: Meta<typeof TocNav> = {
  title: 'ui/navigation/TocNav',
  component: TocNav,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TocNav>;

// TocNav はページ内の id="toc-{index}" 要素を IntersectionObserver 相当のスクロール監視で
// 検出してアクティブ表示を切り替える。Storybook 単体では対応する見出し要素が DOM 上に
// 存在しないため、実装上 activeIndex は初期値 0（先頭）のまま静的に表示される。
export const Default: Story = {
  args: {
    items: tocItems,
  },
};

/** 目次が1件のみのケース */
export const SingleItem: Story = {
  args: {
    items: ['物件概要'],
  },
};
