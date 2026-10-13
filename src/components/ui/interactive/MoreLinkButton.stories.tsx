import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MoreLinkButton from './MoreLinkButton';

const meta: Meta<typeof MoreLinkButton> = {
  title: 'ui/interactive/MoreLinkButton',
  component: MoreLinkButton,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof MoreLinkButton>;

export const SP: Story = {
  args: { href: '/message', mode: 'sp' },
};

export const PCOnCream: Story = {
  args: { href: '/message', mode: 'pc', pcColor: 'dark-green' },
};

export const PCOnDarkGreen: Story = {
  args: { href: '/staff-interview', mode: 'pc', pcColor: 'cream' },
  decorators: [(Story) => <div className="bg-dark-green p-8"><Story /></div>],
};
