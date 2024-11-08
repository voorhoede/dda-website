import clsx from 'clsx';
import type { ReactNode } from 'react';
import './Tag.css';

export interface TagProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'blue';
}

export const Tag = ({ children, className, variant = 'default' }: TagProps) => {
  return (
    <span className={clsx(className, `tag tag--${variant}`)}>{children}</span>
  );
};
