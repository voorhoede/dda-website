import { type FormHTMLAttributes, type ReactNode } from 'react';
import { TurnstileWidget } from '@components/TurnstileWidget';
import type { TurnstileAction } from '@lib/turnstile';

import './Form.css';

type Props = {
  turnstile?: TurnstileAction;
  submitButton: ReactNode;
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({
  turnstile,
  submitButton,
  children,
  ...rest
}: Props) => {
  return (
    <form className="form" {...rest}>
      <div className="form__fields">{children}</div>

      {turnstile && <TurnstileWidget action={turnstile} />}

      <div className="form__submit">{submitButton}</div>
    </form>
  );
};
