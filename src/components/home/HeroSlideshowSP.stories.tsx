import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroSlideshowSP from './HeroSlideshowSP';

const meta: Meta<typeof HeroSlideshowSP> = {
  title: 'home/HeroSlideshowSP',
  component: HeroSlideshowSP,
  // SP 専用コンポーネント（内部で desktop:hidden、画像も内部に固定配列で持つため props なし）
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HeroSlideshowSP>;

export const Default: Story = {
  args: {},
};
