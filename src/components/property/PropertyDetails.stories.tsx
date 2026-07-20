import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PropertyDetails from './PropertyDetails';
import { mockProperties } from '@/lib/mock/data';

const meta: Meta<typeof PropertyDetails> = {
  title: 'property/PropertyDetails',
  component: PropertyDetails,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PropertyDetails>;

// getPropertyFields は type(sell/rent) x category(property/land) の4パターンで表示項目が変わる。
// mock データから各パターンに該当する実物件をそのまま使う。
export const SellProperty: Story = {
  args: { property: mockProperties[0] }, // prop-1: type=sell, category=property
};

export const SellLand: Story = {
  args: { property: mockProperties[2] }, // prop-3: type=sell, category=land
};

export const RentProperty: Story = {
  args: { property: mockProperties[3] }, // prop-4: type=rent, category=property
};

export const RentLand: Story = {
  args: { property: mockProperties[5] }, // prop-6: type=rent, category=land
};
