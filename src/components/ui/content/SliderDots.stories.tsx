import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import SliderDots from './SliderDots';

const meta: Meta<typeof SliderDots> = {
  title: 'ui/content/SliderDots',
  component: SliderDots,
};
export default meta;

type Story = StoryObj<typeof SliderDots>;

function Interactive(args: { count: number; size?: 'sm' | 'md'; variant?: 'light' | 'dark' }) {
  const [active, setActive] = useState(0);
  return <SliderDots {...args} activeIndex={active} onDotClick={setActive} />;
}

export const Medium: Story = {
  render: () => <Interactive count={5} size="md" />,
};

export const Small: Story = {
  render: () => <Interactive count={5} size="sm" />,
};

export const Dark: Story = {
  render: () => (
    <div className="bg-dark-green p-4">
      <Interactive count={5} size="md" variant="dark" />
    </div>
  ),
};
