import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ListItemDeco from './ListItemDeco';

const meta: Meta<typeof ListItemDeco> = {
  title: 'ui/content/ListItemDeco',
  component: ListItemDeco,
  decorators: [
    (Story) => (
      <div className="max-w-[45.8125rem] border-b border-dark-green/10">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ListItemDeco>;

export const WithMapLink: Story = {
  args: {
    label: '所在地',
    value: '静岡県三島市加茂18番地の7',
    mapUrl: 'https://maps.google.com/?q=静岡県三島市加茂18番地の7',
  },
};

export const StaticBadge: Story = {
  args: { label: '所在地', value: '静岡県三島市加茂18番地の7' },
};
