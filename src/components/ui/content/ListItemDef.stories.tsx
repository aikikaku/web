import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ListItemDef from './ListItemDef';

const meta: Meta<typeof ListItemDef> = {
  title: 'ui/content/ListItemDef',
  component: ListItemDef,
  decorators: [
    (Story) => (
      <div className="max-w-[45.8125rem] border-b border-dark-green/10">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ListItemDef>;

export const Default: Story = {
  args: { label: '最寄駅', value: 'JR三島駅 徒歩10分' },
};

export const MultiLine: Story = {
  args: {
    label: '加盟団体',
    value: '公益社団法人 全国宅地建物取引業保証協会\n公益社団法人 静岡県宅地建物取引業協会',
  },
};
