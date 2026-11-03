import { toRichTextHtml, type CommentSpeaker } from './richTextHtml';

export { speakerFromStaff } from './richTextHtml';

interface RichTextProps {
  content: string;
  speaker?: CommentSpeaker;
}

/**
 * microCMS richEditorV2 の HTML を表示するコンポーネント。
 *
 * 対応するデザインパターン:
 *   h5         → セクションカテゴリ（目次ラベル）— id="toc-{index}" が自動付与
 *   h3         → セクション見出し
 *   p          → 本文
 *   img        → 画像（角丸・横幅100%）
 *   p > em     → 画像キャプション（イタリックで入力）
 *   blockquote → コメント吹き出し（アバター付き。話し手は speaker、未指定なら「アイ企画」）
 *   hr         → セクション区切り
 */
export default function RichText({ content, speaker }: RichTextProps) {
  const processed = toRichTextHtml(content, speaker);

  return (
    <div
      className="rich-content"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

/**
 * リッチテキスト HTML から h5 見出しを抽出して目次データを生成する。
 */
export function extractTocFromHtml(html: string): string[] {
  const matches = html.matchAll(/<h5[^>]*>(.*?)<\/h5>/gi);
  return Array.from(matches, (m) => m[1].replace(/<[^>]*>/g, ''));
}
