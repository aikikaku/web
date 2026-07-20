import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoryCardOverlay from './StoryCardOverlay';
import { mockStories } from '@/lib/mock/data';

const story = mockStories[0];
const storyNoRegion = { ...mockStories[1], regions: undefined };

/**
 * SP/共通の縦長オーバーレイカード（画像全面 + gradient + 下部にタイトル/矢印）。
 * 実際の利用箇所: /stories 一覧の SP フィーチャードカード、物件詳細の関連ストーリー、StoryCarousel。
 */
const meta: Meta<typeof StoryCardOverlay> = {
  title: 'story/StoryCardOverlay',
  component: StoryCardOverlay,
  parameters: { layout: 'padded' },
  args: { story },
  decorators: [(Story) => <div className="max-w-[21.375rem]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof StoryCardOverlay>;

export const Default: Story = {};

/** regions が無いストーリー（地域ラベルが表示されない） */
export const WithoutRegion: Story = {
  args: { story: storyNoRegion },
};

/** カテゴリ = property（物件詳細の関連ストーリー表示で使われるケース） */
export const PropertyCategory: Story = {
  args: { story: { ...story, category: 'property' } },
};
