interface Props {
  label: string;
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * タグ表示コンポーネント。Figma Tag 4211:26218 (Property 1=Light/Dark) 準拠。
 * 見た目は既存の `.tag`/`.tag-dark` globals.css クラスと同一(18箇所で使用中の
 * className直書きはこの新規コンポーネントへは移行せず現状維持。今後の新規箇所向け)。
 */
export default function Tag({ label, variant = 'light', className = '' }: Props) {
  return (
    <span className={`${variant === 'dark' ? 'tag-dark' : 'tag'} ${className}`}>
      {label}
    </span>
  );
}
