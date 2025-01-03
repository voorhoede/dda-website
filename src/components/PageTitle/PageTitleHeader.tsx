import { Column } from '@components/Grid';
import type { ReactNode } from 'react';

export const PageTitleHeader = ({
  children,
  spacious = false,
}: {
  children: ReactNode;
  spacious?: boolean;
}) => {
  return (
    <Column
      className="container-padding-x"
      span={{ mobile: 12, desktop: spacious ? 10 : 12 }}
      start={{ mobile: 1, desktop: spacious ? 2 : 1 }}
    >
      {children}
    </Column>
  );
};
