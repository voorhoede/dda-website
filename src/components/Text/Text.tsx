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

const Text = ({
  as: Element = 'p',
  children,
  className,
  variant = 'paragraph',
  ...rest
}: TextProps) => {
  const classes = clsx(className, `text text--${variant}`);

  return (
    <Element className={classes} {...rest}>
      {children}
    </Element>
  );
};

export default Text;
