interface RichTextProps {
  content: string;
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
 *   blockquote → コメント吹き出し（アバター付き）
 *   hr         → セクション区切り
 */
export default function RichText({ content }: RichTextProps) {
  // h5 に toc 用の id を付与（既存idがあれば置換）
  let h5Index = 0;
  let processed = content.replace(/<h5([^>]*)>/gi, (_, attrs) => {
    const withoutId = (attrs as string).replace(/\s*id="[^"]*"/gi, '');
    return `<h5${withoutId} id="toc-${h5Index++}">`;
  });

  // blockquote を アバター付き吹き出しレイアウトに変換
  processed = processed.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    (_, inner) => `
      <div class="rich-comment">
        <div class="rich-comment-avatar">
          <div class="rich-comment-avatar-circle"></div>
          <span class="rich-comment-avatar-name">アイ企画</span>
        </div>
        <div class="rich-comment-bubble">${inner}</div>
      </div>`
  );

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
