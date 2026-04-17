import { Turnstile } from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';

export const TurnstileWidget = () => {
  console.log('TURNSTILE_SITE_KEY', TURNSTILE_SITE_KEY);
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return null;
  }

  return <Turnstile sitekey={TURNSTILE_SITE_KEY} theme="light" />;
};
