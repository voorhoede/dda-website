import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import './DataList.css';

export const DataList = forwardRef<
  HTMLUListElement,
  PropsWithChildren<HTMLAttributes<HTMLUListElement>>
>(({ children, className, ...rest }, ref) => {
  return (
    <ul ref={ref} className={clsx('data-list', className)} {...rest}>
      {children}
    </ul>
  );
});
