import { TURNSTILE_SECRET_KEY } from 'astro:env/server';

export type TurnstileAction = 'newsletter' | 'ai-internship';

type SiteverifyResult = {
  success: boolean;
  action?: string;
  'error-codes'?: string[];
};

const MAX_TOKEN_LENGTH = 2048;
const VISITOR_ERROR_CODES = ['invalid-input-response', 'timeout-or-duplicate'];

export async function verifyTurnstile(token: string, action: TurnstileAction): Promise<boolean> {
  if (token.length > MAX_TOKEN_LENGTH) {
    return false;
  }

  let result: SiteverifyResult;
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({})) as Partial<SiteverifyResult>;
      console.error('Turnstile siteverify responded with status', response.status, body['error-codes']);
      return false;
    }
    result = await response.json() as SiteverifyResult;
  } catch (error) {
    console.error('Turnstile siteverify failed', error);
    return false;
  }

  if (result['error-codes']?.some((code) => !VISITOR_ERROR_CODES.includes(code))) {
    console.error('Turnstile siteverify failed', result['error-codes']);
  }

  if (result.success && result.action !== action) {
    console.error('Turnstile token was issued for another action', { expected: action, received: result.action });
    return false;
  }

  return result.success;
}
