import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@components/Icon';

import './Loader.css';

export const Loader = ({ className, ...props }: ComponentPropsWithoutRef<typeof Icon>) => {
  return <Icon className={clsx('loader', className)} name="loading" {...props} />;
};
