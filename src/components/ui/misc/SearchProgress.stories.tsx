import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchProgress from './SearchProgress';

const meta: Meta<typeof SearchProgress> = {
  title: 'ui/misc/SearchProgress',
  component: SearchProgress,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof SearchProgress>;

/** デフォルトラベル「ページを読み込み中...」 */
export const Default: Story = {};

/** カスタムラベル */
export const CustomLabel: Story = {
  args: {
    label: '検索中...',
  },
};
