import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CardArrowFlow from './CardArrowFlow';

const meta: Meta<typeof CardArrowFlow> = {
  title: 'ui/content/CardArrowFlow',
  component: CardArrowFlow,
};
export default meta;

type Story = StoryObj<typeof CardArrowFlow>;

export const ForCustomer: Story = {
  args: {
    steps: [
      { title: 'ご相談', desc: 'まずはメール・お電話・ご来店などで、お客様の想いやお探しの条件などご相談ください。' },
      { title: 'ご提案', desc: 'お客様のご要望に合わせた、最適な物件をご提案いたします。' },
      { title: 'ご内見', desc: '実際に物件をご案内し、ご内見いただきます。' },
      { title: 'ご契約', desc: '気に入った物件が見つかりましたら、申込と契約のご案内に進みます。' },
      { title: 'ご入居', desc: '契約後にご入居です。お引越しの見積や火災保険の手続きなど新生活のご準備もお手伝いいたします。' },
    ],
  },
};

export const ForOwner: Story = {
  args: {
    steps: [
      { title: 'ご相談', desc: 'まずはメール・お電話・ご来店などで、お客様の想いと不動産の状況などをご相談ください。' },
      { title: 'ご提案・\n査定', desc: '売却をご検討の方には、査定金額をご提示いたします。' },
      { title: '媒介契約・募集開始', desc: '売却・賃貸の価格や方法などが決定すれば、弊社に仲介をご依頼いただく旨の媒介契約を結び、募集を開始します。' },
      { title: 'ご契約', desc: '双方にご納得いただければ売買・賃貸の契約を結びます。' },
      { title: 'お引渡し', desc: '契約終了後、買主様・借主様から代金を受け取り、不動産の引渡しを行います。' },
    ],
  },
};
