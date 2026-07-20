import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ServiceCTA from './ServiceCTA';

const meta: Meta<typeof ServiceCTA> = {
  title: 'ui/card/ServiceCTA',
  component: ServiceCTA,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ServiceCTA>;

/** デフォルト画像 (about/message ページでの実使用と同じ、引数省略) */
export const Default: Story = {};

/** カスタム画像を指定 (src/app/staff-interview/page.tsx での実使用と同じ) */
export const CustomImages: Story = {
  args: {
    customerImage: '/images/staff-interview/cta-customer.jpg',
    ownerImage: '/images/staff-interview/cta-owner.jpg',
  },
};
