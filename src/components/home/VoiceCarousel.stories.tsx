import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VoiceCarousel from './VoiceCarousel';
import { mockCustomerVoices } from '@/lib/mock/data';

const meta: Meta<typeof VoiceCarousel> = {
  title: 'home/VoiceCarousel',
  component: VoiceCarousel,
};
export default meta;

type Story = StoryObj<typeof VoiceCarousel>;

// トップページと同じ用法: お客様の声（PC/SP共通、横スクロールpeek表示）
export const Default: Story = {
  args: {
    voices: mockCustomerVoices,
  },
};

// 1件のみ
export const SingleVoice: Story = {
  args: {
    voices: [mockCustomerVoices[0]],
  },
};

// 0件: コンポーネントは null を返し何も表示されない
export const Empty: Story = {
  args: {
    voices: [],
  },
};
