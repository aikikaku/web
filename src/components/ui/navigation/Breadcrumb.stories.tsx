import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'ui/navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

/** 一覧ページ (/voice, /properties, /stories 等) */
export const TwoLevel: Story = {
  args: {
    items: [{ label: 'お客様の声' }],
  },
};

/** アイ企画を知る配下 (/about, /message 等)。「アイ企画を知る」はページが無いのでリンクなし */
export const UnderAboutMenu: Story = {
  args: {
    items: [{ label: 'アイ企画を知る' }, { label: 'アイ企画について' }],
  },
};

/** 詳細ページ (/properties/[id], /stories/[id])。長いタイトルは省略記号で切る */
export const Detail: Story = {
  args: {
    items: [
      { label: '物件を探す', href: '/properties' },
      { label: '静かな住宅街で叶える、理想の暮らし。三島市谷田の中古住宅（4LDK+S）' },
    ],
  },
};
