import {
  forwardRef,
  type ReactNode,
  type ElementType,
  type ForwardedRef,
} from 'react';
import clsx from 'clsx';
import type { PolymorphicComponentPropsWithRef } from '@lib/polymorphic-component';
import './Column.css';

type SpanOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ResponsiveSpan = {
  mobile?: SpanOptions;
  tablet?: SpanOptions;
  desktop?: SpanOptions;
};

const defaultComponent = 'div';

type ColumnBaseProps = {
  span?: SpanOptions | ResponsiveSpan;
  start?: SpanOptions | ResponsiveSpan;
  children?: ReactNode;
};

export type ColumnProps<C extends ElementType = typeof defaultComponent> =
  PolymorphicComponentPropsWithRef<C, ColumnBaseProps>;

type ColumnComponent = <C extends ElementType = typeof defaultComponent>(
  props: ColumnProps<C>,
) => React.ReactElement | null;

function formatSpan(span: SpanOptions | ResponsiveSpan): ResponsiveSpan {
  if (typeof span === 'number') {
    return formatSpan({
      mobile: span,
    });
  }

  return {
    desktop: span.desktop || span.tablet || span.mobile,
    tablet: span.tablet || span.mobile,
    mobile: span.mobile,
  };
}

export const Column = forwardRef(
  <C extends ElementType = typeof defaultComponent>(
    { as, className, span = 1, start, children, ...rest }: ColumnProps<C>,
    ref: ForwardedRef<C>,
  ) => {
    const Component = as || defaultComponent;
    const formattedSpan = formatSpan(span);
    const formattedStart = start ? formatSpan(start) : null;

    return (
      <Component
        ref={ref}
        className={clsx(className, 'column', {
          [`column--span-mobile-${formattedSpan.mobile}`]: formattedSpan.mobile,
          [`column--span-tablet-${formattedSpan.tablet}`]: formattedSpan.tablet,
          [`column--span-desktop-${formattedSpan.desktop}`]:
            formattedSpan.desktop,
          [`column--start-mobile-${formattedStart?.mobile}`]:
            formattedStart?.mobile,
          [`column--start-tablet-${formattedStart?.tablet}`]:
            formattedStart?.tablet,
          [`column--start-desktop-${formattedStart?.desktop}`]:
            formattedStart?.desktop,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  },
) as ColumnComponent;
