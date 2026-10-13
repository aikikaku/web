import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FaqSection from './FaqSection';

const meta: Meta<typeof FaqSection> = {
  title: 'ui/content/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof FaqSection>;

// 実データ: src/app/for-owner/page.tsx の faqItems
const ownerItems = [
  {
    question: '査定にはどのくらい時間がかかりますか？',
    answer: '簡易査定は即日〜数日、現地調査を伴う詳細査定は1〜2週間程度です。',
  },
  {
    question: '売却にかかる費用はありますか？',
    answer:
      '査定・提案、媒介契約には費用は発生しません。売却または賃貸が成約した際に、規定の仲介手数料を頂戴いたします。（成果報酬制）',
  },
  {
    question: '古い家でも売れますか？',
    answer:
      'はい、古い家にも魅力があります。リノベーション需要も高まっており、状態に合わせた最適な活用方法をご提案いたします。',
  },
  {
    question: '遠方に住んでいますが対応できますか？',
    answer:
      'はい、オンラインでのご相談や、現地の状況を写真・動画でお伝えするなど、遠方の方にも対応しております。',
  },
];

export const ForOwner: Story = {
  args: { items: ownerItems },
};

export const CustomTitle: Story = {
  args: {
    title: 'よくあるご質問',
    items: ownerItems.slice(0, 2),
  },
};
