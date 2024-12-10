import type { ReactNode } from 'react';

import './Form.css';

interface Props {
  submitButton: ReactNode;
  children: ReactNode;
}

export const Form = ({ submitButton, children }: Props) => {
  return (
    <form className="form">
      <div className="form__fields">{children}</div>

      <div className="form__submit">{submitButton}</div>
    </form>
  );
};
