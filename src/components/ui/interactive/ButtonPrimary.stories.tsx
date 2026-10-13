import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPrimary from './ButtonPrimary';

const meta: Meta<typeof ButtonPrimary> = {
  title: 'ui/interactive/ButtonPrimary',
  component: ButtonPrimary,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof ButtonPrimary>;

export const Default: Story = {
  args: {
    href: '/properties',
    label: 'すべて見る',
  },
};

export const Disabled: Story = {
  args: {
    href: '/properties',
    label: 'すべて見る',
    disabled: true,
  },
};
