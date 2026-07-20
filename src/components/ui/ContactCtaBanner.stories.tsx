import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactCtaBanner from './ContactCtaBanner';

const meta: Meta<typeof ContactCtaBanner> = {
  title: 'ui/ContactCtaBanner',
  component: ContactCtaBanner,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ContactCtaBanner>;

// 実際の呼び出し例: src/app/for-customer/page.tsx
export const ForCustomer: Story = {
  args: {
    bgImage: '/images/for-customer/cta-banner.jpg',
    heading: (
      <>
        不動産に関すること、
        <br />
        ぜひご相談ください。
      </>
    ),
    ctas: [
      { label: '不動産をお探しの方', href: '/contact' },
      { label: 'その他のお問い合わせ', href: '/contact' },
    ],
  },
};

// 実際の呼び出し例: src/app/for-owner/page.tsx
export const ForOwner: Story = {
  args: {
    bgImage: '/images/for-owner/banner-contact.jpg',
    heading: (
      <>
        不動産に関すること、
        <br />
        ぜひご相談ください。
      </>
    ),
    ctas: [
      { label: '不動産をお持ちの方', href: '/contact' },
      { label: 'その他のお問い合わせ', href: '/contact' },
    ],
  },
};

export const CustomCaption: Story = {
  args: {
    bgImage: '/images/home/cta-banner.jpg',
    caption: 'お知らせ',
    heading: (
      <>
        まずはお気軽に、
        <br />
        ご相談ください。
      </>
    ),
    ctas: [
      { label: '無料相談を予約する', href: '/contact' },
      { label: '資料をダウンロード', href: '/contact' },
    ],
  },
};
