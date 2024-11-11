import { Column } from '@components/Grid';
import type { ReactNode } from 'react';

export const TitleSectionFooter = ({ children }: { children: ReactNode }) => {
  return (
    <Column span={{ mobile: 12, desktop: 8 }} start={{ mobile: 1, desktop: 3 }}>
      {children}
    </Column>
  );
};
