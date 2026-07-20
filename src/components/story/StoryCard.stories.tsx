import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoryCard from './StoryCard';
import { mockStories } from '@/lib/mock/data';

const story = mockStories[0];
const storyNoRegion = { ...mockStories[1], regions: undefined };

/**
 * size: 'l' | 'm' | 's'
 * 既知の未修正差分: 現状 size="m" は size="l" と同じ縦積みレイアウトで描画される
 * （Figma 上は m は画像左・テキスト右の横並びだが未実装）。ここでは現状の実際の挙動を再現する。
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
  decorators: [(Story) => <div className="max-w-[30rem]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof StoryCard>;

export const Large: Story = {
  args: { size: 'l', variant: 'light' },
};

/** 現状 Large と同一の縦積みレイアウト（Figma の横並びは未実装） */
export const Medium: Story = {
  args: { size: 'm', variant: 'light' },
};

export const Small: Story = {
  args: { size: 's', variant: 'light' },
};

export const Dark: Story = {
  args: { size: 'l', variant: 'dark' },
  decorators: [(Story) => <div className="max-w-[30rem] bg-dark-green p-8"><Story /></div>],
};

/** regions が無いストーリー（地域ラベルが表示されない） */
export const WithoutRegion: Story = {
  args: { story: storyNoRegion, size: 'm', variant: 'light' },
};
