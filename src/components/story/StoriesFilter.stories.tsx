import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoriesFilter from './StoriesFilter';

const categoryLabels = [
  { value: 'daily', label: '日々のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'property', label: '物件のつづき' },
];

/**
 * /stories PC 用フィルターバー（CheckboxDropdown ×2 + 絞り込み/クリアボタン）。
 * useRouter / useSearchParams は Storybook の Next.js フレームワーク側で自動モックされる。
 */
const meta: Meta<typeof StoriesFilter> = {
  title: 'story/StoriesFilter',
  component: StoriesFilter,
  parameters: { layout: 'padded' },
  args: {
    categories: categoryLabels,
  },
  decorators: [(Story) => <div className="bg-cream p-8"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof StoriesFilter>;

/** 未選択状態（絞り込み・クリアボタンは disabled） */
export const Default: Story = {};

/** カテゴリのみ選択済み */
export const CategorySelected: Story = {
  args: { currentCategory: 'daily' },
};

/** 地域のみ選択済み（複数選択可） */
export const RegionsSelected: Story = {
  args: { currentRegions: '三島市,長泉町' },
};

/** カテゴリ・地域とも選択済み */
export const AllSelected: Story = {
  args: { currentCategory: 'property', currentRegions: '沼津市' },
};
