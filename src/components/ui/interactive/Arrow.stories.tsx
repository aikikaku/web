import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Arrow from './Arrow';

const meta: Meta<typeof Arrow> = {
  title: 'ui/interactive/Arrow',
  component: Arrow,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] },
    variant: { control: 'radio', options: ['default', 'cream', 'disabled'] },
  },
};
export default meta;

type Story = StoryObj<typeof Arrow>;

export const Default: Story = {
  args: { size: 'md', variant: 'default' },
};

export const Cream: Story = {
  args: { size: 'md', variant: 'cream' },
  decorators: [(Story) => <div className="bg-dark-green p-8"><Story /></div>],
};

export const Disabled: Story = {
  args: { size: 'md', variant: 'disabled' },
};

export const Small: Story = {
  args: { size: 'sm', variant: 'default' },
};
