import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MoreProperties from './MoreProperties';
import { mockProperties } from '@/lib/mock/data';

const meta: Meta<typeof MoreProperties> = {
  title: 'property/MoreProperties',
  component: MoreProperties,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof MoreProperties>;

// 本番 (properties/[id]/page.tsx) は同 category/type の物件を最大 6 件シャッフルして渡す
export const Default: Story = {
  args: { properties: mockProperties.slice(0, 6), href: '/properties' },
};

export const SingleProperty: Story = {
  args: { properties: [mockProperties[0]], href: '/properties' },
};

// properties が空のときは component が null を返す（現状の実装通りの挙動を確認する用）
export const Empty: Story = {
  args: { properties: [], href: '/properties' },
};
