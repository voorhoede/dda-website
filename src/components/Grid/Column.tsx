import { type ReactNode } from 'react';
import clsx from 'clsx';
import './Column.css';

type SpanOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ResponsiveSpan = {
  mobile?: SpanOptions;
  tablet?: SpanOptions;
  desktop?: SpanOptions;
};

interface ColumnProps {
  span?: SpanOptions | ResponsiveSpan;
  start?: SpanOptions | ResponsiveSpan;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

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

export const Column = ({
  className,
  span = 1,
  start,
  children,
  ...rest
}: ColumnProps) => {
  const formattedSpan = formatSpan(span);
  const formattedStart = start ? formatSpan(start) : null;

  return (
    <div
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
    </div>
  );
};
