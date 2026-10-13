import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StorySection from './StorySection';
import { mockStories } from '@/lib/mock/data';

/**
 * 物件詳細 (/properties/[id])・/for-owner・/for-customer で使う共通ストーリーセクション。
 * SP は StoryCarousel、PC は 3 列グリッド + 「すべて見る」リンク。
 * variant="dark" が実利用（/for-owner, /for-customer）でのデフォルト。
 */
const meta: Meta<typeof StorySection> = {
  title: 'story/StorySection',
  component: StorySection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'radio', options: ['light', 'dark'] },
  },
  args: {
    stories: mockStories.slice(0, 3),
    title: '物件のその後のはなし',
  },
};
export default meta;

type Story = StoryObj<typeof StorySection>;

/** /for-owner, /for-customer での実利用と同じ dark 配色 */
export const Dark: Story = {
  args: { variant: 'dark' },
};

export const Light: Story = {
  args: { variant: 'light', title: '暮らしを知る' },
};

/** stories が空の場合は何も描画しない（コンポーネントの実挙動） */
export const Empty: Story = {
  args: { stories: [] },
};
