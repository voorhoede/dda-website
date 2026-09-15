import { Turnstile, type TurnstileProps } from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';

type Props = Omit<TurnstileProps, 'sitekey'>;

export const TurnstileWidget = ({
  theme = 'light',
  ...rest
}: Props) => {
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return null;
  }

  return <Turnstile sitekey={TURNSTILE_SITE_KEY} theme={theme} {...rest} />;
};
