import clsx from 'clsx';
import type { HTMLProps, PropsWithChildren, ReactNode } from 'react';
import './Link.css';

type LinkProps = PropsWithChildren<HTMLProps<HTMLAnchorElement>>;

export const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <a className={clsx(className, 'link')} {...rest}>
      {children}
    </a>
  );
};
