import { initBotId } from 'botid/client/core';
import { POSTHOG_HOST, POSTHOG_TOKEN, SENTRY_DSN, sentryOptions } from '@/lib/monitoring';

// Vercel BotID で bot 判定する送信先。サーバー側（src/app/api/contact/route.ts の checkBotId）と対で設定する
initBotId({
  protect: [{ path: '/api/contact', method: 'POST' }],
});

// 監視（lib/monitoring.ts）。環境変数があるときだけ、最初の表示を待たせないよう後から読み込む
if (SENTRY_DSN) {
  void import('@sentry/nextjs').then((Sentry) =>
    Sentry.init({
      ...sentryOptions,
      // 訪問ごとの記録（セッション）は送らない。エラーだけで足り、この記録には IP アドレスを残す指定が付くため
      integrations: (defaults) => defaults.filter((integration) => integration.name !== 'BrowserSession'),
    }),
  );
}

const posthogToken = POSTHOG_TOKEN;
if (posthogToken) {
  void import('posthog-js').then(({ default: posthog }) =>
    posthog.init(posthogToken, {
      api_host: POSTHOG_HOST,
      defaults: '2026-08-30',
      // 画面の記録では、入力欄の中身と画面上の文字をすべて伏せる（お客様の名前・連絡先・相談内容を外に出さない）
      session_recording: { maskAllInputs: true, maskTextSelector: '*' },
    }),
  );
}
