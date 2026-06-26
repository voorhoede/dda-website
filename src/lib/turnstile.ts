import { TURNSTILE_SECRET_KEY } from 'astro:env/server';

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Defaults to the shared secret; pass a widget-specific secret to override.
 */
export async function verifyTurnstile(
  token: string,
  secret: string = TURNSTILE_SECRET_KEY,
): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });
  const { success } = await response.json() as { success: boolean };
  return success;
}
