import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPrimarySp from './ButtonPrimarySp';

const meta: Meta<typeof ButtonPrimarySp> = {
  title: 'ui/interactive/ButtonPrimarySp',
  component: ButtonPrimarySp,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ButtonPrimarySp>;

/** Default: bg-blue の全幅ボタン(アイコン無し。Figma button-primary-sp) */
export const Default: Story = {
  args: {
    href: '/properties',
    label: 'すべて見る',
  },
};

/** ラベル違い(もっと知る) */
export const MoreLink: Story = {
  args: {
    href: '/about',
    label: 'もっと知る',
  },
};

/** Disabled: bg-dark-green opacity-20 */
export const Disabled: Story = {
  args: {
    href: '/properties',
    label: 'すべて見る',
    disabled: true,
  },
};
