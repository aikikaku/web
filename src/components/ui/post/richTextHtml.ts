/** 吹き出しの話し手。物件の担当者を選んだ時はその人、選んでいない時・ストーリーは「アイ企画」 */
export interface CommentSpeaker {
  name: string;
  /** 丸いアイコンの写真。省略時は globals.css の既定（社内の写真） */
  avatar?: string;
}

const STAFF_AVATARS: Record<string, string> = {
  髙野恒成: '/images/staff-interview/avatar-tsunenari.jpg',
  髙野大地: '/images/staff-interview/avatar-daichi.jpg',
};

/**
 * microCMS の物件の「担当者」から吹き出しの話し手を作る。未設定・知らない名前は「アイ企画」。
 * セレクトフィールドは 1 つしか選べなくても配列で返る（未設定は []）
 */
export function speakerFromStaff(staff: string[] | undefined): CommentSpeaker | undefined {
  const name = staff?.[0];
  return name && STAFF_AVATARS[name] ? { name, avatar: STAFF_AVATARS[name] } : undefined;
}

/**
 * microCMS richEditorV2 の HTML を、サイトのデザインに合わせて組み替える。
 *   h5         → 目次のラベル（id="toc-{index}" を付ける）
 *   blockquote → コメント吹き出し（アバター付き。話し手は speaker、未指定なら「アイ企画」）
 */
export function toRichTextHtml(content: string, speaker?: CommentSpeaker): string {
  // h5 に toc 用の id を付与（既存idがあれば置換）
  let h5Index = 0;
  const withToc = content.replace(/<h5([^>]*)>/gi, (_, attrs) => {
    const withoutId = (attrs as string).replace(/\s*id="[^"]*"/gi, '');
    return `<h5${withoutId} id="toc-${h5Index++}">`;
  });

  return withToc.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    (_, inner) => `
      <div class="rich-comment">
        <div class="rich-comment-avatar">
          <div class="rich-comment-avatar-circle"${speaker?.avatar ? ` style="background-image:url('${speaker.avatar}')"` : ''}></div>
          <span class="rich-comment-avatar-name">${speaker?.name ?? 'アイ企画'}</span>
        </div>
        <div class="rich-comment-bubble">${inner}</div>
      </div>`
  );
}
