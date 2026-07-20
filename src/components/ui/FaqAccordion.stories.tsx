import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FaqAccordion from './FaqAccordion';

const meta: Meta<typeof FaqAccordion> = {
  title: 'ui/FaqAccordion',
  component: FaqAccordion,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof FaqAccordion>;

// 実データ: src/app/for-customer/page.tsx の FaqSection 呼び出しに渡している items
const customerItems = [
  {
    question: '購入にかかる諸経費は？',
    answer:
      '売買代金の約8%前後が目安です。広告の金額は売主様へ支払う売買代金のみで、別途、仲介手数料（上限＝3%＋6万円＋税）、登記費用（登録免許税・司法書士報酬）、ローン関連手数料（事務手数料・保証料・印紙）などが発生します。',
  },
  {
    question: '住宅ローン（購入）や入居審査（賃貸）のポイントは？',
    answer:
      '購入をご検討の際は、まず事前審査で「借入可能額」と「金利タイプ（固定・変動など）」を確認します。\n賃貸の入居審査では、収入状況・勤務先、連帯保証人または保証会社の利用などが確認されます。必要書類（本人確認書類、収入証明など）を事前に整えることで、審査から契約までの手続きがスムーズに進みます。',
  },
  {
    question: '物件の災害リスクはどう確認すれば安心ですか？',
    answer:
      'まずは各市・町が発行するハザードマップ（洪水・土砂災害・津波など）を確認します。ただし、地図で「指定外」でもリスクがゼロではありません。後から指定される可能性や、地盤の弱い地域もあります。物件ごとの状況（地形・標高・周辺の排水計画・過去の災害履歴など）を踏まえて個別にご説明しますので、お気軽にお尋ねください。',
  },
];

export const Default: Story = {
  args: { items: customerItems },
};

export const SingleItem: Story = {
  args: { items: [customerItems[0]] },
};
