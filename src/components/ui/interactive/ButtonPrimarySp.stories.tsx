import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPrimarySp from './ButtonPrimarySp';

const meta: Meta<typeof ButtonPrimarySp> = {
  title: 'ui/interactive/ButtonPrimarySp',
  component: ButtonPrimarySp,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ButtonPrimarySp>;

/** Default: bg-blue の全幅ボタン + book アイコン */
export const Default: Story = {
  args: {
    href: '/properties',
    label: 'すべて見る',
  },
};

/** book アイコンなし */
export const WithoutIcon: Story = {
  args: {
    href: '/voice',
    label: 'すべて見る',
    showBookIcon: false,
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
