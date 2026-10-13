import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroVideo from './HeroVideo';

const meta: Meta<typeof HeroVideo> = {
  title: 'home/HeroVideo',
  component: HeroVideo,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 400, height: 533, overflow: 'hidden', borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HeroVideo>;

// トップ PC ヒーローと同じ用法: 動画をコンテナいっぱいに敷き詰める
export const Default: Story = {
  args: {
    src: '/videos/hero.mp4',
    poster: '/images/home/hero-video-poster.jpg',
    className: 'absolute inset-0 h-full w-full object-cover',
  },
};
