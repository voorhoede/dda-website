import { Grid } from '@components/Grid';
import type { ReactNode } from 'react';
import './TitleSection.css';

export const TitleSection = ({ children }: { children: ReactNode }) => {
  return (
    <Grid className="title-section" gap={24}>
      {children}
    </Grid>
  );
};
