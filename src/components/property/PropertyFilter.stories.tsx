import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, userEvent } from 'storybook/test';
import PropertyFilter from './PropertyFilter';

/**
 * PropertyFilter は props を取らず、URL の searchParams (status/types/regions) を
 * 直接読み書きする（PC 専用: `hidden tablet:flex`）。Storybook では next/navigation を
 * parameters.nextjs.navigation 経由でモックする。
 */
const meta: Meta<typeof PropertyFilter> = {
  title: 'property/PropertyFilter',
  component: PropertyFilter,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/properties' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof PropertyFilter>;

// デフォルト（ご案内中の物件、絞り込みなし）
export const Default: Story = {};

// URL 側に絞り込み条件がある状態（トグル位置・チェック済みチップ・クリアボタン活性化を確認）
export const FiltersApplied: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/properties',
        query: { status: 'all', types: 'sell_property,rent_land', regions: '三島市,沼津市' },
      },
    },
  },
};

// 「物件」ドロップダウンを開いた状態
export const DropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '物件' }));
  },
};
