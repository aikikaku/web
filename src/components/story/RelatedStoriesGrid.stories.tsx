import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RelatedStoriesGrid from './RelatedStoriesGrid';
import { mockStories } from '@/lib/mock/data';

const meta: Meta<typeof RelatedStoriesGrid> = {
  title: 'story/RelatedStoriesGrid',
  component: RelatedStoriesGrid,
};
export default meta;

type Story = StoryObj<typeof RelatedStoriesGrid>;

export const Default: Story = {
  args: { stories: mockStories.slice(0, 3) },
};

export const SingleStory: Story = {
  args: { stories: mockStories.slice(0, 1) },
};
