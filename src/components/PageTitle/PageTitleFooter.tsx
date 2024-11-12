import { Column } from '@components/Grid';
import type { ReactNode } from 'react';
import './PageTitleFooter.css';

export const PageTitleFooter = ({ children }: { children: ReactNode }) => {
  return (
    <Column
      className="page-title-footer"
      span={{ mobile: 12, desktop: 8 }}
      start={{ mobile: 1, desktop: 3 }}
    >
      {children}
    </Column>
  );
};
