import { useEffect, useRef } from 'react';
import { Turnstile, type BoundTurnstileObject, type TurnstileProps } from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';
import type { TurnstileAction } from '@lib/turnstile';

type Props = Omit<TurnstileProps, 'sitekey' | 'action'> & {
  action: TurnstileAction;
};

export const TurnstileWidget = ({
  theme = 'light',
  userRef,
  onLoad,
  ...rest
}: Props) => {
  const ownRef = useRef<HTMLDivElement>(null!);
  const containerRef = userRef ?? ownRef;
  const widget = useRef<BoundTurnstileObject>();

  useEffect(() => {
    const form = containerRef.current?.closest('form');
    // Tokens are single-use, so a token read into form data must be replaced before a retry.
    const reset = () => widget.current?.reset();
    form?.addEventListener('formdata', reset);
    return () => form?.removeEventListener('formdata', reset);
  }, [containerRef]);

  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return null;
  }

  return (
    <Turnstile
      sitekey={TURNSTILE_SITE_KEY}
      theme={theme}
      userRef={containerRef}
      onLoad={(widgetId, boundTurnstile) => {
        widget.current = boundTurnstile;
        onLoad?.(widgetId, boundTurnstile);
      }}
      {...rest}
    />
  );
};
