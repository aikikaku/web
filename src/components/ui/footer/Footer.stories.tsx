import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from './Footer';

// Footer はプロパティを取らず、ファイル内の静的 footerNav 設定を描画するグローバルレイアウト。
const meta: Meta<typeof Footer> = {
  title: 'ui/footer/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
