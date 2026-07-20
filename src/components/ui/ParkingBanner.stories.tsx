import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ParkingBanner from './ParkingBanner';

// ParkingBanner は props を取らない（内容・リンク先とも固定）
const meta: Meta<typeof ParkingBanner> = {
  title: 'ui/ParkingBanner',
  component: ParkingBanner,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ParkingBanner>;

export const Default: Story = {};
