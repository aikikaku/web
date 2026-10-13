import { Fragment } from 'react';

interface Step {
  /** "\n" は PC のみ改行（SP は 1 行。Figma SP 4470:16071「ご提案・査定」は 1 行） */
  title: string;
  desc: string;
}

interface CardArrowFlowProps {
  steps: Step[];
  /** PC のタイムライン幅。Figma: for-customer 4470:15551 = 792px / for-owner 4470:15607 = 704px */
  maxWidthClassName?: string;
}

/**
 * 「ご相談〜ご入居/売却の流れ」のステップ図解。Figma Card Arrow(4211:25302 PC / 4211:25834 SP)準拠。
 * for-customer/for-ownerで同一マークアップが個別にベタ書きされていたため共通化。
 */
export default function CardArrowFlow({ steps, maxWidthClassName = 'max-w-[49.5rem]' }: CardArrowFlowProps) {
  return (
    <div className={`${maxWidthClassName} mx-auto flex flex-col items-center`}>
      {steps.map((step, i) => (
        <div key={step.title} className="w-full flex flex-col items-center">
          {/* カード: SP p24 / PC pt30 pb32 pl24 pr30・見出しと本文の間 30 (Card_arrow 4470:15611 / Card_arrow-sp 4470:16073) */}
          <div className="w-full bg-cream rounded-3xl shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.1)] p-6 tablet:pl-6 tablet:pr-[1.875rem] tablet:pt-[1.875rem] tablet:pb-8">
            <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-[1.875rem] items-start tablet:items-center">
              {/* 見出し: SP 18px 字間 0.72 (JP/H5) / PC 24px 行間 1.4 字間 0 */}
              <p className="font-mincho text-lg tablet:text-2xl text-dark-green text-left tablet:text-center w-full tablet:w-[8.75rem] shrink-0 leading-[1.6] tablet:leading-[1.4] tracking-[0.04em] tablet:tracking-normal">
                {step.title.split('\n').map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br className="hidden tablet:inline" />}
                    {line}
                  </Fragment>
                ))}
              </p>
              {/* 本文: SP dark-green / PC black */}
              <p className="font-gothic font-medium text-body-m text-dark-green tablet:text-black whitespace-pre-line flex-1">
                {step.desc}
              </p>
            </div>
          </div>
          {/* Figma Polygon2 21×18 (fill #EFF6EC = light-green)。
              間隔: PC (Card_arrow 4211:9792) カード→矢印 16 / 矢印→次カード 16、
              SP (Card_arrow-sp 4211:9898) カード→矢印 8 / 矢印→次カード 16 (timeline gap) */}
          {i < steps.length - 1 && (
            <span className="inline-flex items-end justify-center w-6 h-6 mt-2 tablet:mt-4 mb-4">
              <svg width="21" height="18" viewBox="0 0 20.7846 18" fill="currentColor" className="text-light-green">
                <path d="M10.3923 18L20.7846 0H0L10.3923 18Z" />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
