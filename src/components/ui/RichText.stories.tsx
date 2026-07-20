import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RichText from './RichText';

// RichText は microCMS richEditorV2 の HTML をそのまま dangerouslySetInnerHTML で描画する。
// 実際の呼び出し (src/app/stories/[id]/page.tsx, src/app/properties/[id]/page.tsx) は
// CMS から取得した content/description 文字列をそのまま渡すのみ。
// ここではコンポーネント自身の doc comment が挙げる対応パターン
// (h5=目次ラベル / h3=見出し / p=本文 / img / p>em=キャプション / blockquote=コメント / hr=区切り)
// を一通り含むサンプル HTML を組み立てている（CMS の実データではなくデモ用に作成）。
const sampleContent = `
<h5>三島の魅力</h5>
<h3>水の都、三島</h3>
<p>三島市は富士山の伏流水が湧き出る「水の都」として知られています。街中を流れるせせらぎは、住む人の心を癒してくれます。</p>
<img src="/images/home/service-bg-sp.png" alt="三島の風景" />
<p><em>写真: 源兵衛川沿いの遊歩道</em></p>
<blockquote><p>実際に住んでみて、水の音が聞こえる暮らしの豊かさを実感しました。</p></blockquote>
<hr />
<h5>アクセス</h5>
<h3>都心からのアクセス</h3>
<p>新幹線を使えば東京から約1時間。通勤・通学にも便利な立地です。</p>
`;

const meta: Meta<typeof RichText> = {
  title: 'ui/RichText',
  component: RichText,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof RichText>;

export const Default: Story = {
  args: {
    content: sampleContent,
  },
};

/** 実際の mock データ (src/lib/mock/data.ts) 相当のシンプルな本文のみのケース */
export const SimpleParagraphsOnly: Story = {
  args: {
    content:
      '<p>三島駅から徒歩12分、閑静な住宅街に位置する物件です。日当たり良好、駐車場2台分あり。</p>',
  },
};
