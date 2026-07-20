interface Step {
  title: string;
  desc: string;
}

interface CardArrowFlowProps {
  steps: Step[];
}

/**
 * 「ご相談〜ご入居/売却の流れ」のステップ図解。Figma Card Arrow(4211:25302 PC / 4211:25834 SP)準拠。
 * for-customer/for-ownerで同一マークアップが個別にベタ書きされていたため共通化。
 */
export default function CardArrowFlow({ steps }: CardArrowFlowProps) {
  return (
    <div className="max-w-[49.5rem] mx-auto flex flex-col items-center">
      {steps.map((step, i) => (
        <div key={step.title} className="w-full flex flex-col items-center">
          <div className="w-full bg-cream rounded-3xl shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.1)] p-6 tablet:pl-6 tablet:pr-8 tablet:py-8">
            <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-8 items-start tablet:items-center">
              <p className="font-mincho text-lg tablet:text-2xl text-dark-green text-left tablet:text-center w-full tablet:w-[8.75rem] shrink-0 whitespace-pre-line leading-[1.6] tablet:leading-[1.4] tracking-wider">
                {step.title}
              </p>
              <p className="font-gothic font-medium text-body-m text-dark-green whitespace-pre-line flex-1">
                {step.desc}
              </p>
            </div>
          </div>
          {/* Figma 4211:11798 / 4211:11801 (Polygon2 21×18 正三角形, 半透明 dark-green). gap 8px */}
          {i < steps.length - 1 && (
            <span className="inline-flex items-center justify-center w-6 h-6 my-2">
              <svg width="21" height="18" viewBox="0 0 20.7846 18" fill="currentColor" className="text-dark-green/25">
                <path d="M10.3923 18L20.7846 0H0L10.3923 18Z" />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
