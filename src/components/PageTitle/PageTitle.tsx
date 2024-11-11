import { Grid } from '@components/Grid';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import './PageTitle.css';

export const PageTitle = ({
  children,
  spacious = false,
}: {
  children: ReactNode;
  spacious?: boolean;
}) => {
  return (
    <Grid className={clsx('page-title', { 'page-title--spacious': spacious })}>
      {children}
    </Grid>
  );
};
