import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'ui/navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

// このコンポーネントは現状 src/app 配下のどのページからも実際には呼ばれていない
// (各ページは JSON-LD の BreadcrumbList のみで見た目のパンくずは独自実装)。
// interface (label / href?) から妥当な例をここで組み立てている。

export const TwoLevel: Story = {
  args: {
    items: [{ label: 'お客様の声' }],
  },
};

export const ThreeLevel: Story = {
  args: {
    items: [
      { label: '物件を探す', href: '/properties' },
      { label: '三島市谷田の一戸建て' },
    ],
  },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: '暮らしを知る', href: '/stories' },
      { label: '光ヶ丘・富士見台', href: '/stories?region=nagaizumi' },
      { label: '家族の夢を叶えた、三島市谷田での新生活' },
    ],
  },
};
