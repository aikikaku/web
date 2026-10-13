import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navigation from './Navigation';

// Navigation はプロパティを取らず、ファイル内の静的 nav 設定を描画するグローバルレイアウト。
// usePathname はテスト対象コンポーネントでは使われていないが、next/navigation フックは
// Storybook (nextjs-vite framework) が自動でモックするため追加設定なしで動作する。
const meta: Meta<typeof Navigation> = {
  title: 'ui/navigation/Navigation',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-white min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};
