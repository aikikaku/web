import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PropertyCard from './PropertyCard';
import { mockProperties } from '@/lib/mock/data';

const meta: Meta<typeof PropertyCard> = {
  title: 'property/PropertyCard',
  component: PropertyCard,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PropertyCard>;

// Default: 案内中の物件 (prop-1)
export const Default: Story = {
  args: { property: mockProperties[0] },
};

// Sold: 成約済みだが紐づくストーリーが無いケース（「ストーリーを読む」ボタンは出ない） (prop-10)
export const Sold: Story = {
  args: { property: mockProperties.find((p) => p.id === 'prop-10')! },
};

// SoldWithStory: 成約済み＋「継承者のストーリー」導線ありのケース (prop-5、mockデータ側で story を紐付け済み)
export const SoldWithStory: Story = {
  args: { property: mockProperties.find((p) => p.id === 'prop-5')! },
};
