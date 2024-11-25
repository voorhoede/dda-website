export type GapOptions = 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 | 72 | 96 | 128;

export interface ResponsiveGapOptions {
  desktop?: GapOptions;
  tablet?: GapOptions;
  mobile?: GapOptions;
}

export function formatGap({
  gap,
  columnGap,
  rowGap,
}: {
  gap?: ResponsiveGapOptions | GapOptions;
  columnGap?: ResponsiveGapOptions | GapOptions;
  rowGap?: ResponsiveGapOptions | GapOptions;
}): {
  desktop: {
    rowGap: GapOptions | undefined;
    columnGap: GapOptions | undefined;
  };
  tablet: { rowGap: GapOptions | undefined; columnGap: GapOptions | undefined };
  mobile: { rowGap: GapOptions | undefined; columnGap: GapOptions | undefined };
} {
  if (gap) {
    if (typeof gap === 'number') {
      return formatGap({ gap: { mobile: gap } });
    }

    return {
      desktop: { rowGap: gap.desktop, columnGap: gap.desktop },
      tablet: { rowGap: gap.tablet, columnGap: gap.tablet },
      mobile: { rowGap: gap.mobile, columnGap: gap.mobile },
    };
  }

  if (typeof columnGap === 'number') {
    return formatGap({ columnGap: { mobile: columnGap }, rowGap: rowGap });
  }

  if (typeof rowGap === 'number') {
    return formatGap({ columnGap: columnGap, rowGap: { mobile: rowGap } });
  }

  rowGap = rowGap as ResponsiveGapOptions;
  columnGap = columnGap as ResponsiveGapOptions;

  return {
    desktop: {
      rowGap: rowGap?.desktop,
      columnGap: columnGap?.desktop,
    },
    tablet: {
      rowGap: rowGap?.tablet,
      columnGap: columnGap?.tablet,
    },
    mobile: {
      rowGap: rowGap?.mobile,
      columnGap: columnGap?.mobile,
    },
  };
}
