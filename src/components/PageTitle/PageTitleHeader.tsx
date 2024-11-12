import { Column } from '@components/Grid';
import type { ReactNode } from 'react';

export const PageTitleHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Column
      span={{ mobile: 12, desktop: 10 }}
      start={{ mobile: 1, desktop: 2 }}
    >
      {children}
    </Column>
  );
};
