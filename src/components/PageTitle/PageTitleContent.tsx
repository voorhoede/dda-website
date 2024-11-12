import { Column } from '@components/Grid';
import type { ReactNode } from 'react';
import './PageTitleContent.css';

export const PageTitleContent = ({ children }: { children: ReactNode }) => {
  return (
    <Column
      className="page-title-content"
      span={{ mobile: 12, desktop: 8 }}
      start={{ mobile: 1, desktop: 3 }}
    >
      {children}
    </Column>
  );
};
