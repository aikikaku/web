'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * Figma 4211:11595 / 4211:11618 「card-story」レイアウト。
 *
 * SP では、メイン写真 (358×268) の下に小さい縦長写真 2 枚 (119×159) が
 * 重なるように配置される。デザイナーの仕様で、SP の場合はスクロール時に
 * 小さい写真がメイン写真の上に少しずつせり上がるパララックスを期待されている。
 *
 * PC では、左 280×368 + 中央 704×469 + 右 280×374 の 3 枚レイアウト。
 */
export default function HeroCardStory({
  mainImage,
  leftImage,
  rightImage,
  mainAlt = '',
  priority = false,
}: {
  mainImage: string;
  leftImage: string;
  rightImage: string;
  mainAlt?: string;
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!container || !left || !right) return;

    const mql = window.matchMedia('(max-width: 992px)');
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mql.matches) {
        // PC ではパララックスを掛けない
        left.style.transform = '';
        right.style.transform = '';
        return;
      }
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // container が画面に入ってから抜けるまでの進行率 0〜1
      const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (vh + rect.height))));
      // 進行率に応じて -60px まで上方向にスライド
      const offset = -progress * 60;
      left.style.transform = `translateY(${offset}px)`;
      right.style.transform = `translateY(${offset * 1.2}px)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* SP: card-story (358 wide × 507 tall, 3 photos with overlap) */}
      <div className="tablet:hidden relative w-full max-w-[358px] mx-auto h-[507px]">
        {/* メイン写真 (top, 358×268) */}
        <div className="absolute left-0 top-0 w-full aspect-[358/268] rounded-2xl overflow-hidden">
          <Image
            src={mainImage}
            alt={mainAlt}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 992px) 100vw, 0px"
          />
        </div>
        {/* 左下の縦長写真 (32, 300, 119×159) */}
        <div
          ref={leftRef}
          className="absolute z-10 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] will-change-transform transition-none"
          style={{ left: '32px', top: '300px', width: '119px', height: '159px' }}
        >
          <Image src={leftImage} alt="" fill className="object-cover" sizes="119px" />
        </div>
        {/* 右下の縦長写真 (207, 348, 119×159) */}
        <div
          ref={rightRef}
          className="absolute z-10 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] will-change-transform transition-none"
          style={{ left: '207px', top: '348px', width: '119px', height: '159px' }}
        >
          <Image src={rightImage} alt="" fill className="object-cover" sizes="119px" />
        </div>
      </div>

      {/* PC: 3 枚レイアウト (左 280×368 / 中央 704 / 右 280×374)
          Figma 1440 フレームで left=0, center=368-1072 (= viewport center ± 352), right=1160-1440。
          viewport > 1440 でも左右の写真は viewport edge に貼り付くべきなので max-w-1440 を使わず
          viewport 直接アンカリング (left-0 / right-0) する。center は left-1/2 -translate-x-1/2。 */}
      <div className="hidden tablet:block relative w-full h-[838px]">
        <div className="absolute left-0 top-[470px] w-[280px] h-[368px] rounded-2xl overflow-hidden">
          <Image
            src={leftImage}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 992px) 280px, 0px"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[259px] w-[704px] aspect-[704/469] rounded-2xl overflow-hidden">
          <Image
            src={mainImage}
            alt={mainAlt}
            fill
            className="object-cover"
            priority={priority}
            sizes="(min-width: 992px) 704px, 0px"
          />
        </div>
        <div className="absolute right-0 top-[96px] w-[280px] h-[374px] rounded-2xl overflow-hidden">
          <Image
            src={rightImage}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 992px) 280px, 0px"
          />
        </div>
      </div>
    </div>
  );
}
