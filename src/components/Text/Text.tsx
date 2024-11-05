import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import './Text.css';

interface TextProps {
  as?: 'p' | 'span';
  children: ReactNode;
  className?: string;
  variant?: 'paragraph' | 'subtext';
  [key: string]: any;
}

export const Text = ({
  as: Element = 'p',
  children,
  className,
  variant = 'paragraph',
  ...rest
}: TextProps) => {
  return (
    <Element className={clsx(className, `text text--${variant}`)} {...rest}>
      {children}
    </Element>
  );
};
