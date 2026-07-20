import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SeeAllLink from './SeeAllLink';

const meta: Meta<typeof SeeAllLink> = {
  title: 'ui/SeeAllLink',
  component: SeeAllLink,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof SeeAllLink>;

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
