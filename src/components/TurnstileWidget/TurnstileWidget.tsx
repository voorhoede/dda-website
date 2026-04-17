import { Turnstile } from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';

export const TurnstileWidget = () => {
  return <Turnstile sitekey={TURNSTILE_SITE_KEY} theme="light" />;
};
