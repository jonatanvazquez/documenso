import { Hono } from 'hono';
import superjson from 'superjson';

import type { SessionValidationResult } from '../lib/session/session';
import { getOptionalSession } from '../lib/utils/get-session';

export const sessionRoute = new Hono()
  .get('/session', async (c) => {
    const session: SessionValidationResult = await getOptionalSession(c);

    return c.json(session);
  })
  .get('/session-json', async (c) => {
    console.log('[SESSION-JSON] Request recibida');
    try {
      const session: SessionValidationResult = await getOptionalSession(c);
      console.log('[SESSION-JSON] Session obtenida:', JSON.stringify(session));

      return c.json(superjson.serialize(session));
    } catch (error) {
      console.error('[SESSION-JSON] Error:', error);
      throw error;
    }
  });
