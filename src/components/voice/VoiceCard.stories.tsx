import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VoiceCard from './VoiceCard';
import { mockCustomerVoices } from '@/lib/mock/data';

/** components-preview page でも同じ mockCustomerVoices[0] を使用 */
const meta: Meta<typeof VoiceCard> = {
  title: 'voice/VoiceCard',
  component: VoiceCard,
  parameters: { layout: 'padded' },
  args: { voice: mockCustomerVoices[0] },
};
export default meta;

type Story = StoryObj<typeof VoiceCard>;

export const Default: Story = {};

/** content が短くタイトル(customerName＋location/propertyType)のみで完結するケース */
export const ShortContent: Story = {
  args: { voice: mockCustomerVoices[3] },
};

/** location / propertyType の値が長めのケース（レイアウト崩れ確認用） */
export const LongLocationAndType: Story = {
  args: { voice: mockCustomerVoices[2] },
};
