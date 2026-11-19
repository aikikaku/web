import type { Instrumentation } from 'next';
import { SENTRY_DSN, sentryOptions } from '@/lib/monitoring';

/** サーバー側の監視（lib/monitoring.ts）。Sentry の設定があるときだけ読み込む */
export async function register() {
  if (!SENTRY_DSN) return;
  const Sentry = await import('@sentry/nextjs');
  Sentry.init(sentryOptions);
}

/** ページや API の処理中に起きたエラーを Sentry に送る */
export const onRequestError: Instrumentation.onRequestError = async (...args) => {
  if (!SENTRY_DSN) return;
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(...args);
};
