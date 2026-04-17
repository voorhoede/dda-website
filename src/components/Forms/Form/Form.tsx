import { type FormHTMLAttributes, type ReactNode } from 'react';
import { TurnstileWidget } from '@components/TurnstileWidget';

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
  const isClient = typeof window !== 'undefined';
  return (
    <form className="form" {...rest}>
      <div className="form__fields">{children}</div>

      {isClient && turnstile && <TurnstileWidget/>}

      <div className="form__submit">{submitButton}</div>
    </form>
  );
};
