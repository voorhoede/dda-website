import type { FormHTMLAttributes, ReactNode } from 'react';

import './Form.css';

type Props = {
  submitButton: ReactNode;
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ submitButton, children, ...rest }: Props) => {
  return (
    <form className="form" {...rest}>
      <div className="form__fields">{children}</div>

      <div className="form__submit">{submitButton}</div>
    </form>
  );
};
