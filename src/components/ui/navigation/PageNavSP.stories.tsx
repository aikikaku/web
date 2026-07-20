import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, waitFor } from 'storybook/test';
import PageNavSP from './PageNavSP';

// 実データ: src/app/staff-interview/page.tsx の tocItems
const items = [
  '会社のこと',
  '三島の魅力を伝え続けるということ',
  '中古住宅も大切にする「もったいない精神」',
];

/**
 * PageNavSP は表示可否をスクロール位置から DOM 越しに判定する
 * (`[data-mobile-toc-start]` が画面下端の 60% より上に来たら表示、
 * `[data-mobile-toc-end]` が画面上端の 50% を越えたら非表示)。
 * Storybook canvas でも実際にスクロールして挙動を確認できるよう、
 * 十分な高さのダミーページ + 必要な data 属性 / id を持つセクションを
 * 用意するデコレーターを追加している。
 */
const meta: Meta<typeof PageNavSP> = {
  title: 'ui/navigation/PageNavSP',
  component: PageNavSP,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div>
        {/* start マーカーに届くまでのスペーサー */}
        <div style={{ height: '120vh' }} className="flex items-center justify-center text-gray-400">
          下にスクロールすると SP 用の目次ピルが表示されます
        </div>

        <div data-mobile-toc-start>
          {items.map((label, i) => (
            <div key={i} id={`toc-${i}`} style={{ minHeight: '80vh' }} className="px-4 py-8">
              <h2 className="font-mincho text-heading-24 text-dark-green">{label}</h2>
            </div>
          ))}
        </div>
        <div data-mobile-toc-end />

        <div style={{ height: '60vh' }} />

        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PageNavSP>;

export const Default: Story = {
  args: { items },
};

export const ScrolledIntoView: Story = {
  name: 'Closed pill (scrolled into range)',
  args: { items },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const win = doc.defaultView;
    // data-mobile-toc-start が画面下端の 60% より上に来る程度までスクロール
    win?.scrollTo(0, win.innerHeight * 0.9);
    doc.defaultView?.dispatchEvent(new Event('scroll'));

    const canvas = within(canvasElement);
    await waitFor(() => {
      const button = canvas.getByRole('button', { name: '目次を開く' });
      if (button.className.includes('opacity-0')) {
        throw new Error('closed pill is not visible yet');
      }
    });
  },
};

export const OpenedPanel: Story = {
  name: 'Open panel (after clicking pill)',
  args: { items },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const win = doc.defaultView;
    win?.scrollTo(0, win.innerHeight * 0.9);
    doc.defaultView?.dispatchEvent(new Event('scroll'));

    const canvas = within(canvasElement);
    const openButton = await canvas.findByRole('button', { name: '目次を開く' });
    openButton.click();

    await canvas.findByRole('button', { name: '閉じる' });
  },
};
