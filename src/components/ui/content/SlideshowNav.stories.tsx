import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import SlideshowNav from './SlideshowNav';

// 実際の呼び出し例 (PropertyCarousel / VoiceCarousel / ArticleCarousel) に準拠。
// onPageChange 等は useState でラップしてクリックで実際にドットが動くようにしている。
const meta: Meta<typeof SlideshowNav> = {
  title: 'ui/content/SlideshowNav',
  component: SlideshowNav,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['light', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof SlideshowNav>;

function Wrapper(props: {
  totalPages: number;
  href?: string;
  variant?: 'light' | 'dark';
  spTotalPages?: number;
}) {
  const [activePage, setActivePage] = useState(0);
  const [spActivePage, setSpActivePage] = useState(0);
  return (
    <div className={props.variant === 'dark' ? 'bg-dark-green p-8' : ''}>
      <SlideshowNav
        activePage={activePage}
        totalPages={props.totalPages}
        onPageChange={setActivePage}
        spActivePage={props.spTotalPages ? spActivePage : undefined}
        spTotalPages={props.spTotalPages}
        onSpPageChange={props.spTotalPages ? setSpActivePage : undefined}
        href={props.href}
        variant={props.variant}
      />
    </div>
  );
}

/** PC/SP 共通ページ数、「すべて見る」リンクあり (VoiceCarousel の実使用と同じ形) */
export const Default: Story = {
  render: () => <Wrapper totalPages={4} href="/voice" />,
};

/** dark テーマ (cream text + arrow) */
export const DarkVariant: Story = {
  render: () => <Wrapper totalPages={4} href="/voice" variant="dark" />,
};

/** PC と SP でページ数が異なるケース (ArticleCarousel の実使用と同じ形) */
export const DifferentPcSpPageCounts: Story = {
  render: () => <Wrapper totalPages={3} spTotalPages={6} href="/for-owner" />,
};

/** 1ページのみ（dots 非表示、「すべて見る」リンクのみ） */
export const SinglePage: Story = {
  render: () => <Wrapper totalPages={1} href="/properties" />,
};

/** 「すべて見る」リンクなし（href 未指定） */
export const WithoutButtonPrimary: Story = {
  render: () => <Wrapper totalPages={3} />,
};
