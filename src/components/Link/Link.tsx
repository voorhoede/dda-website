import clsx from 'clsx';
import type { ReactNode } from 'react';
import './Link.css';

interface LinkProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <a className={clsx(className, 'link')} {...rest}>
      {children}
    </a>
  );
};
