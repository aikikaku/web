import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent } from 'storybook/test';
import MobileFilterNav from './MobileFilterNav';

/**
 * MobileFilterNav は props を取らず、URL の searchParams (status/types/regions) と
 * scroll 位置（[data-mobile-filter-start] / [data-mobile-filter-end] の可視判定）で
 * 表示を制御する。Storybook では next/navigation を parameters.nextjs.navigation で、
 * scroll 判定用マーカーを decorator で用意する。
 */
const meta: Meta<typeof MobileFilterNav> = {
  title: 'property/MobileFilterNav',
  component: MobileFilterNav,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/properties' },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[32rem] bg-cream">
        {/* floating button の表示条件（画面内スクロール判定）を満たすためのマーカー要素 */}
        <div data-mobile-filter-start />
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MobileFilterNav>;

// floating button のみ表示（デフォルト = ご案内中の物件、絞り込みなし）
export const Default: Story = {};

// floating button クリックで開いたモーダル（絞り込みなしの初期状態）
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '物件を絞り込む' }));
  },
};

// URL に既存の絞り込み条件がある状態でモーダルを開く（chip・トグルが反映されていることを確認）
export const OpenWithFiltersApplied: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/properties',
        query: { status: 'all', types: 'sell_property', regions: '三島市' },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '物件を絞り込む' }));
  },
};
