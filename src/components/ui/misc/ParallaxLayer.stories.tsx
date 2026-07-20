import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ParallaxLayer from './ParallaxLayer';

// ParallaxLayer は「relative overflow-hidden な親要素の中に絶対配置の背景として置く」設計
// (コンポーネントの doc comment 参照)。Storybook 上はスクロールトリガーは効かないため
// 静的な背景表示のみを確認する。
const meta: Meta<typeof ParallaxLayer> = {
  title: 'ui/misc/ParallaxLayer',
  component: ParallaxLayer,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ParallaxLayer>;

export const Default: Story = {
  render: (args) => (
    <div className="relative overflow-hidden w-full h-[20rem] rounded-2xl bg-dark-green">
      <ParallaxLayer {...args}>
        <div className="w-full h-full bg-gradient-to-br from-dark-green to-accent-blue" />
      </ParallaxLayer>
      <div className="relative flex items-center justify-center h-full text-white font-gothic font-medium">
        親要素 (relative overflow-hidden)
      </div>
    </div>
  ),
  args: {
    strength: 0.1,
  },
};

/** home/page.tsx での実使用と同じ strength=0.08 */
export const WeakStrength: Story = {
  render: Default.render,
  args: {
    strength: 0.08,
  },
};
