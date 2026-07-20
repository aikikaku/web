import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactBanner from './ContactBanner';

// ContactBanner はプロパティを取らず、常に固定コンテンツ (お問い合わせ CTA) を描画する。
const meta: Meta<typeof ContactBanner> = {
  title: 'ui/card/ContactBanner',
  component: ContactBanner,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ContactBanner>;

export const Default: Story = {};
