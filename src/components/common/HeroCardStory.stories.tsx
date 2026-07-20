import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroCardStory from './HeroCardStory';

const meta: Meta<typeof HeroCardStory> = {
  title: 'common/HeroCardStory',
  component: HeroCardStory,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof HeroCardStory>;

// 実際の呼び出し例: src/app/message/page.tsx
export const Message: Story = {
  args: {
    mainImage: '/images/message/hero-center.jpg',
    leftImage: '/images/message/hero-left.jpg',
    rightImage: '/images/message/hero-right.jpg',
    mainAlt: 'ご挨拶',
    priority: true,
  },
};

// 実際の呼び出し例: src/app/staff-interview/page.tsx
export const StaffInterview: Story = {
  args: {
    mainImage: '/images/staff-interview/hero.jpg',
    leftImage: '/images/staff-interview/photo-interview-1.jpg',
    rightImage: '/images/staff-interview/photo-caption.jpg',
    mainAlt: '髙野大地と髙野恒成のインタビュー風景',
    priority: true,
  },
};
