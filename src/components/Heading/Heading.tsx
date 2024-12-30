import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import './Heading.css';

export interface HeadingProps {
  children: ReactNode;
  className?: string;
  displayLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 'p' | 'span';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Heading = ({
  children,
  className,
  displayLevel,
  level,
  ...rest
}: HeadingProps) => {
  const Element: ElementType = typeof level === 'string' ? level : `h${level}`;

  return (
    <Element
      className={clsx(className, `heading heading--${displayLevel || level}`)}
      {...rest}
    >
      {children}
    </Element>
  );
};
