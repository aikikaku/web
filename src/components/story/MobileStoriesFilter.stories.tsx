import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent } from 'storybook/test';
import MobileStoriesFilter from './MobileStoriesFilter';

/**
 * MobileStoriesFilter は内部で `[data-stories-filter-start]` / `[data-stories-filter-end]`
 * の位置を見て floating button の表示・非表示を切り替える（/stories ページの一覧範囲内でのみ表示）。
 * Storybook では実際のスクロール文脈を再現するため、start センチネルを decorator で用意する。
 */
const meta: Meta<typeof MobileStoriesFilter> = {
  title: 'story/MobileStoriesFilter',
  component: MobileStoriesFilter,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-cream min-h-screen">
        <div data-stories-filter-start />
        <div className="p-8 font-gothic text-body-m text-dark-green">
          記事一覧エリア（このダミーコンテンツの範囲内で floating ボタンが表示されます）
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MobileStoriesFilter>;

/** floating button 表示状態（絞り込みモーダルは閉じている） */
export const Closed: Story = {};

/** 絞り込みボタンをクリックしてモーダルを開いた状態（カテゴリ・地域ドロップダウンは閉） */
export const ModalOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = await canvas.findByRole('button', { name: '記事を絞り込む' });
    await userEvent.click(openButton);
  },
};

/** モーダル内でカテゴリドロップダウンを開いた状態 */
export const ModalWithCategoryOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = await canvas.findByRole('button', { name: '記事を絞り込む' });
    await userEvent.click(openButton);
    // 未選択時のカテゴリラベルは 'すべて'（categories[0] = { value: '', label: 'すべて' }）
    const categoryButton = await canvas.findByText('すべて');
    await userEvent.click(categoryButton);
  },
};
