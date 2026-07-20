import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VoiceContent from './VoiceContent';
import { mockCustomerVoices } from '@/lib/mock/data';

/**
 * /voice ページ本体。カテゴリは propertyType の文言から自動判定される
 * （'相続'/'売却' → inherited, '購入'/'見つ' → found, それ以外 → other）。
 * mockCustomerVoices は上記3カテゴリを実データのまま自然にカバーしている。
 * サイドバー(PC)・floating 絞り込みモーダル(SP)ともスクロール位置連動だが、
 * Storybook の iframe でも実際の DOM 計測で動作する。
 */
const meta: Meta<typeof VoiceContent> = {
  title: 'voice/VoiceContent',
  component: VoiceContent,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="bg-cream px-4 tablet:px-[4.6875rem] py-12"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof VoiceContent>;

/** 実 mock データ（inherited/found/other が混在）。inherited の先頭が初期展開される */
export const Default: Story = {
  args: { voices: mockCustomerVoices },
};

/** 声が1件もない場合の空状態文言 */
export const Empty: Story = {
  args: { voices: [] },
};

/**
 * 画像付きアコーディオン展開時の見た目確認用。
 * 注意: mockCustomerVoices には image / title を持つ実データが無いため、
 * ここでは先頭データに image と title をフィクスチャとして追加している（要ダブルチェック）。
 */
export const WithImageAndTitle: Story = {
  args: {
    voices: [
      {
        ...mockCustomerVoices[0],
        title: '転勤先の三島で理想の住まいに出会えました',
        image: { url: '/images/mock/property-1.jpg', width: 800, height: 600 },
      },
      ...mockCustomerVoices.slice(1),
    ],
  },
};
