import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoryCard from './StoryCard';
import { mockStories } from '@/lib/mock/data';

const story = mockStories[0];
const storyNoRegion = { ...mockStories[1], regions: undefined };

/**
 * size: 'l' | 's' は画像上+テキスト下の縦積みレイアウト。
 * size: 'm' は画像左(264×352)+テキスト右の横並びレイアウト(Figma 4211:24944)。
 */
const meta: Meta<typeof StoryCard> = {
  title: 'story/StoryCard',
  component: StoryCard,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'radio', options: ['l', 'm', 's'] },
    variant: { control: 'radio', options: ['light', 'dark'] },
  },
  args: { story },
};
export default meta;

type Story = StoryObj<typeof StoryCard>;

export const Large: Story = {
  args: { size: 'l', variant: 'light' },
  decorators: [(Story) => <div className="max-w-[30rem]"><Story /></div>],
};

export const Medium: Story = {
  args: { size: 'm', variant: 'light' },
};

export const Small: Story = {
  args: { size: 's', variant: 'light' },
  decorators: [(Story) => <div className="max-w-[30rem]"><Story /></div>],
};

export const Dark: Story = {
  args: { size: 'l', variant: 'dark' },
  decorators: [(Story) => <div className="max-w-[30rem] bg-dark-green p-8"><Story /></div>],
};

/** regions が無いストーリー(地域ラベルが表示されない) */
export const WithoutRegion: Story = {
  args: { story: storyNoRegion, size: 'm', variant: 'light' },
};
