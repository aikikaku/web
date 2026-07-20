import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoryCarousel from './StoryCarousel';
import { mockStories } from '@/lib/mock/data';

const meta: Meta<typeof StoryCarousel> = {
  title: 'home/StoryCarousel',
  component: StoryCarousel,
  argTypes: {
    variant: { control: 'radio', options: ['light', 'dark'] },
  },
  // トップページでは SP〜タブレット幅で表示されるカルーセル（desktop:hidden）
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof StoryCarousel>;

// トップページと同じ用法: 最新ストーリー3件、light（cream背景想定）
export const Default: Story = {
  args: {
    stories: mockStories.slice(0, 3),
    href: '/stories',
    variant: 'light',
  },
};

// dark-green 背景の上で使う場合（cream の dot/矢印）
export const Dark: Story = {
  args: {
    stories: mockStories.slice(0, 3),
    href: '/stories',
    variant: 'dark',
  },
  decorators: [
    (Story) => (
      <div className="bg-dark-green p-4" style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};

// ストーリー0件: コンポーネントは null を返し何も表示されない
export const Empty: Story = {
  args: {
    stories: [],
  },
};
