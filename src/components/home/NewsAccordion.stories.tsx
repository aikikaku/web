import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NewsAccordion from './NewsAccordion';

const meta: Meta<typeof NewsAccordion> = {
  title: 'home/NewsAccordion',
  component: NewsAccordion,
  // ニュース内容はコンポーネント内部にハードコードされたモック（外部 props なし）
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 792 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NewsAccordion>;

// 1件目（本文+リンクあり）が開いた初期状態
export const Default: Story = {
  args: {},
};
