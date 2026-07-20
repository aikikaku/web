import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Pagination from './Pagination';

// 実際の呼び出し例 (src/app/properties/page.tsx) に準拠した props 形状
const meta: Meta<typeof Pagination> = {
  title: 'ui/misc/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

const PER_PAGE = 12;

/** 先頭ページ（前へボタン無効） */
export const FirstPage: Story = {
  args: {
    totalCount: 96,
    perPage: PER_PAGE,
    currentPage: 1,
    basePath: '/properties',
  },
};

/** 中間ページ（省略記号 ... あり） */
export const MiddlePage: Story = {
  args: {
    totalCount: 96,
    perPage: PER_PAGE,
    currentPage: 4,
    basePath: '/properties',
  },
};

/** 最終ページ（次へボタン無効） */
export const LastPage: Story = {
  args: {
    totalCount: 96,
    perPage: PER_PAGE,
    currentPage: 8,
    basePath: '/properties',
  },
};

/** 1ページのみ（矢印は両方とも無効表示） */
export const SinglePage: Story = {
  args: {
    totalCount: 5,
    perPage: PER_PAGE,
    currentPage: 1,
    basePath: '/properties',
  },
};
