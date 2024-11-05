import { type ReactNode } from 'react';
import { type GapOptions, type ResponsiveGapOptions, formatGap } from './util';
import clsx from 'clsx';
import './Grid.css';

interface GridProps {
  gap?: ResponsiveGapOptions | GapOptions;
  columnGap?: ResponsiveGapOptions | GapOptions;
  rowGap?: ResponsiveGapOptions | GapOptions;
  className?: string;
  border?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

export const Grid = ({
  gap,
  columnGap,
  rowGap,
  className,
  border,
  children,
  ...rest
}: GridProps) => {
  const { desktop, tablet, mobile } = formatGap({ gap, rowGap, columnGap });

  const classes = clsx(className, 'grid', {
    [`grid--row-gap-mobile-${mobile.rowGap}`]: mobile.rowGap,
    [`grid--row-gap-tablet-${tablet.rowGap}`]: tablet.rowGap,
    [`grid--row-gap-desktop-${desktop.rowGap}`]: desktop.rowGap,
    [`grid--column-gap-mobile-${mobile.columnGap}`]: mobile.columnGap,
    [`grid--column-gap-tablet-${tablet.columnGap}`]: tablet.columnGap,
    [`grid--column-gap-desktop-${desktop.columnGap}`]: desktop.columnGap,
    'grid--border': border,
  });

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
