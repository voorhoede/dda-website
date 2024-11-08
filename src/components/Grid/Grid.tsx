import {
  forwardRef,
  type ReactNode,
  type ElementType,
  type ForwardedRef,
} from 'react';
import { type GapOptions, type ResponsiveGapOptions, formatGap } from './util';
import clsx from 'clsx';
import type { PolymorphicComponentPropsWithRef } from '@lib/polymorphic-component';
import './Grid.css';

const defaultComponent = 'div';

type GridBaseProps = {
  gap?: ResponsiveGapOptions | GapOptions;
  columnGap?: ResponsiveGapOptions | GapOptions;
  rowGap?: ResponsiveGapOptions | GapOptions;
  border?: boolean;
  children?: ReactNode;
};

export type GridProps<C extends ElementType = typeof defaultComponent> =
  PolymorphicComponentPropsWithRef<C, GridBaseProps>;

type GridComponent = <C extends ElementType = typeof defaultComponent>(
  props: GridProps<C>,
) => React.ReactElement | null;

export const Grid = forwardRef(
  <C extends ElementType = typeof defaultComponent>(
    {
      as,
      gap,
      columnGap,
      rowGap,
      className,
      border,
      children,
      ...rest
    }: GridProps<C>,
    ref: ForwardedRef<C>,
  ) => {
    const Component = as || defaultComponent;
    const { desktop, tablet, mobile } = formatGap({ gap, rowGap, columnGap });

    return (
      <Component
        ref={ref}
        className={clsx(className, 'grid', {
          [`grid--row-gap-mobile-${mobile.rowGap}`]: mobile.rowGap,
          [`grid--row-gap-tablet-${tablet.rowGap}`]: tablet.rowGap,
          [`grid--row-gap-desktop-${desktop.rowGap}`]: desktop.rowGap,
          [`grid--column-gap-mobile-${mobile.columnGap}`]: mobile.columnGap,
          [`grid--column-gap-tablet-${tablet.columnGap}`]: tablet.columnGap,
          [`grid--column-gap-desktop-${desktop.columnGap}`]: desktop.columnGap,
          'grid--border': border,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  },
) as GridComponent;
