/**
 * 監視（エラーの記録 = Sentry、利用状況と画面操作の記録 = PostHog）の共通の設定。
 * どちらも環境変数が無い間は何もしない。SDK も読み込まない（ページの重さは変わらない）。
 *
 *   NEXT_PUBLIC_SENTRY_DSN             … あれば Sentry にエラーを送る（ブラウザ・サーバーの両方）
 *   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN  … あれば PostHog に利用状況と画面操作の記録を送る
 *   NEXT_PUBLIC_POSTHOG_HOST           … 任意。既定は米国リージョン
 *
 * お客様の情報を外に出さない方針
 *   - PostHog の画面記録は、画面上の文字と入力欄の中身をすべて伏せる（プライバシーポリシーにも書いている）
 *   - Sentry には、エラーの内容と発生した場所だけを送る。問い合わせの中身、Cookie、IP アドレスを残す指定は送らない
 */

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
export const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

/** 本番・プレビュー・開発の区別（Vercel が入れる値。手元は development） */
const ENVIRONMENT = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV;

/** Sentry の設定（ブラウザ・サーバー共通）。エラーだけを送る。速度の計測（トレース）はしない */
export const sentryOptions = {
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
  tracesSampleRate: 0,
  sendDefaultPii: false,
} as const;

/**
 * エラーを Sentry に送る（設定が無ければ何もしない）。ブラウザでもサーバーでも使える。
 * 文字を渡したときは、その文字が Sentry の件名になる。お客様の入力（名前・連絡先・本文）は渡さない
 */
export function reportError(error: unknown, level: 'error' | 'warning' = 'error'): void {
  if (!SENTRY_DSN) return;
  void import('@sentry/nextjs')
    .then((Sentry) => {
      if (typeof error === 'string') Sentry.captureMessage(error, level);
      else Sentry.captureException(error, { level });
    })
    .catch(() => undefined);
}
