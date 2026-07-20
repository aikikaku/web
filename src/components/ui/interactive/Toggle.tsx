'use client';

import { useLayoutEffect, useRef, useState } from 'react';

interface ToggleOption {
  value: string;
  label: string;
}

interface Props {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  /** 外枠(コンテナ)への追加クラス。幅・マージン等はここで指定 */
  className?: string;
  /** 各ボタンへの追加クラス。高さ・flexの挙動はここで指定 */
  buttonClassName?: string;
}

/**
 * 2択セグメントコントロール。Figma Toggle PC 4211:26225 / Toggle SP 4211:26238 準拠。
 * アクティブ側の背景を絶対配置のピルでスライド移動させる。
 */
export default function Toggle({
  options,
  value,
  onChange,
  className = '',
  buttonClassName = 'h-[3.25rem] px-6',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    let frame = 0;
    const measure = () => {
      const el = btnRefs.current[value];
      if (!el || !containerRef.current) return;
      const width = el.offsetWidth;
      // 初回マウント直後はフォント読み込み等でまだ0幅の場合があるため、幅が出るまで再試行する
      if (width === 0) {
        frame = requestAnimationFrame(measure);
        return;
      }
      setIndicator({ left: el.offsetLeft, width });
    };
    measure();
    return () => cancelAnimationFrame(frame);
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={`relative flex rounded-[3.125rem] border border-dark-green overflow-hidden p-[0.125rem] ${className}`}
    >
      {indicator && (
        <span
          aria-hidden
          className="absolute top-[0.125rem] bottom-[0.125rem] bg-dark-green rounded-[3.125rem] transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {options.map((option) => (
        <button
          key={option.value}
          ref={(el) => { btnRefs.current[option.value] = el; }}
          type="button"
          onClick={() => onChange(option.value)}
          className={`relative z-10 font-gothic font-medium text-[1rem] leading-none whitespace-nowrap transition-colors duration-300 rounded-[3.125rem] ${buttonClassName} ${
            value === option.value ? 'text-white' : 'text-dark-green'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
