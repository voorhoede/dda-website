import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import './Heading.css';

interface HeadingProps {
  children: ReactNode;
  className?: string;
  displayLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  [key: string]: any;
}

const Heading = ({
  children,
  className,
  displayLevel,
  level,
  ...rest
}: HeadingProps) => {
  const Tag: ElementType = `h${level}`;
  const classes = clsx(className, `heading heading--${displayLevel || level}`);

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;
