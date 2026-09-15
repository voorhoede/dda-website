import { TURNSTILE_SECRET_KEY } from 'astro:env/server';

export async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token }),
  });
  const { success } = await response.json() as { success: boolean };
  return success;
}
