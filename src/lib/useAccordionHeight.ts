import { useEffect, useRef, useState } from 'react';

/**
 * アコーディオンの開閉に合わせてコンテンツ高さをアニメーションするための共通フック。
 * FaqAccordion/NewsAccordion/VoiceContent(VoiceItem)で同一ロジックが個別実装されていたため共通化。
 */
export function useAccordionHeight(isOpen: boolean, deps: unknown[] = []) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, ...deps]);

  return { contentRef, maxHeight };
}
