import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from './Header';

// Header はプロパティを取らず、ファイル内の静的 nav 設定を描画するグローバルレイアウト。
// usePathname はテスト対象コンポーネントでは使われていないが、next/navigation フックは
// Storybook (nextjs-vite framework) が自動でモックするため追加設定なしで動作する。
const meta: Meta<typeof Header> = {
  title: 'ui/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-white min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};
