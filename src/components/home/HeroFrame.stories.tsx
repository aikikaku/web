import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroFrame from './HeroFrame';
import { HERO_IMAGES } from '@/lib/heroImages';

const meta: Meta<typeof HeroFrame> = {
  title: 'home/HeroFrame',
  component: HeroFrame,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 320, height: 320, overflow: 'hidden', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HeroFrame>;

// トップ PC ヒーロー右上枠と同じ組み合わせ（3枚でクロスフェード）
export const Default: Story = {
  args: {
    srcs: HERO_IMAGES.topRight,
    alt: '三島の自然',
    sizes: '320px',
  },
};

// 画像1枚のみ: クロスフェードせず静止表示
export const SingleImage: Story = {
  args: {
    srcs: [HERO_IMAGES.bottomRight[0]],
    alt: '三島の街並み',
    sizes: '320px',
  },
};
