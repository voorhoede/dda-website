import {
  type FormHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { TURNSTILE_SITE_KEY } from 'astro:env/client';

import './Form.css';

type Props = {
  turnstile?: boolean;
  submitButton: ReactNode;
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({
  turnstile = false,
  submitButton,
  children,
  ...rest
}: Props) => {
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!turnstile || !turnstileRef.current) return;

    const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    const element = turnstileRef.current;
    let widgetId: string | undefined;

    const renderWidget = () => {
      widgetId = window.turnstile.render(element, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light',
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.addEventListener('load', renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId !== undefined) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [turnstile]);

  return (
    <form className="form" {...rest}>
      <div className="form__fields">
        {children}
      </div>

      {turnstile && <div ref={turnstileRef} />}

      <div className="form__submit">{submitButton}</div>
    </form>
  );
};
