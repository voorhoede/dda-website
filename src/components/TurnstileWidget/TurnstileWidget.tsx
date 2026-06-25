import { Turnstile, type TurnstileProps } from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';

type Props = Omit<TurnstileProps, 'sitekey'> & {
  /** Defaults to the shared `TURNSTILE_SITE_KEY` when omitted. */
  siteKey?: string;
};

export const TurnstileWidget = ({
  siteKey = TURNSTILE_SITE_KEY,
  theme = 'light',
  ...rest
}: Props) => {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return null;
  }

  return <Turnstile sitekey={siteKey} theme={theme} {...rest} />;
};
