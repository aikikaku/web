import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ArticleCarousel from './ArticleCarousel';

// 実際の /for-owner ページで渡されている記事データを流用（src/app/for-owner/page.tsx 参照）
const realArticles = [
  { tag: '不動産活用', title: '子どもに安心して引き継げる駐車場経営とは？ 今から始める管理の仕組み作り', date: '2025.09.18' },
  { tag: '不動産活用', title: '契約が早い＝空きが埋まる！ 三島市の月極駐車場に電子契約を導入すべき理由', date: '2025.09.18' },
  { tag: '不動産活用', title: '小さな駐車場でも"すぐに埋まる"借り手が見つかるGoogleマップ活用法', date: '2025.09.18' },
  { tag: '不動産活用', title: '空き家を活かす：相続した実家を負動産にしないための3つの選択肢', date: '2025.09.04' },
  { tag: '不動産活用', title: 'サブリースのメリット・デメリットを地元目線で整理する', date: '2025.08.21' },
  { tag: '不動産活用', title: '三島市で進む再開発、所有不動産への影響と備え方', date: '2025.08.07' },
];

const meta: Meta<typeof ArticleCarousel> = {
  title: 'owner/ArticleCarousel',
  component: ArticleCarousel,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ArticleCarousel>;

export const Default: Story = {
  args: { articles: realArticles, href: '/for-owner' },
};

export const SingleArticle: Story = {
  args: { articles: [realArticles[0]], href: '/for-owner' },
};

// articles が空のときは component が null を返す（現状の実装通りの挙動を確認する用）
export const Empty: Story = {
  args: { articles: [], href: '/for-owner' },
};
