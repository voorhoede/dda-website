import { Column } from '@components/Grid';
import type { ReactNode } from 'react';
import './TitleSectionContent.css';

export const TitleSectionContent = ({ children }: { children: ReactNode }) => {
  return (
    <Column
      className="title-section-content"
      span={{ mobile: 12, desktop: 8 }}
      start={{ mobile: 1, desktop: 3 }}
    >
      {children}
    </Column>
  );
};
