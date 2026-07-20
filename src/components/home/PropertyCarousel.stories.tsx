import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PropertyCarousel from './PropertyCarousel';
import { mockProperties } from '@/lib/mock/data';

const meta: Meta<typeof PropertyCarousel> = {
  title: 'home/PropertyCarousel',
  component: PropertyCarousel,
  // SP 専用（tablet:hidden で 993px 以上は非表示）
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PropertyCarousel>;

// トップページと同じ用法: 新着物件6件
export const Default: Story = {
  args: {
    properties: mockProperties.slice(0, 6),
    href: '/properties',
  },
};

// 物件0件: コンポーネントは null を返し何も表示されない
export const Empty: Story = {
  args: {
    properties: [],
  },
};
