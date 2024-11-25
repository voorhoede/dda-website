import type { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';
import './DataList.css';

export const DataList = ({
  children,
  className,
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => {
  return <ul className={clsx('data-list', className)}>{children}</ul>;
};
