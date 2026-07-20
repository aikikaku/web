import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Reveal from './Reveal';

// Reveal はスクロール連動フェードインの IntersectionObserver ラッパー。
// マウント時にビューポート内 (above-the-fold) にある要素は即 `is-visible` になる
// 実装のため、Storybook 上では通常フェードイン済みの状態で表示される。
const meta: Meta<typeof Reveal> = {
  title: 'ui/Reveal',
  component: Reveal,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Reveal>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-light-green rounded-2xl p-8 font-gothic font-medium text-dark-green">
        スクロールでフェードインするコンテンツ
      </div>
    ),
  },
};

/** section タグとして描画（as="section"） */
export const AsSection: Story = {
  args: {
    as: 'section',
    className: 'bg-cream rounded-2xl p-8',
    children: (
      <p className="font-gothic font-medium text-dark-green">as=&quot;section&quot; で描画</p>
    ),
  },
};

/** stagger 用の delayMs 指定（並列要素を順にずらして表示） */
export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      {[0, 120, 240].map((delayMs) => (
        <Reveal key={delayMs} delayMs={delayMs} className="bg-light-green rounded-xl p-6">
          <span className="font-gothic font-medium text-dark-green">delay {delayMs}ms</span>
        </Reveal>
      ))}
    </div>
  ),
};
