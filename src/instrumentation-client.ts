import { initBotId } from 'botid/client/core';

// Vercel BotID で bot 判定する送信先。サーバー側（src/app/api/contact/route.ts の checkBotId）と対で設定する
initBotId({
  protect: [{ path: '/api/contact', method: 'POST' }],
});
