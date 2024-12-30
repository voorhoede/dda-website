import { forwardRef, type HTMLAttributes, type PropsWithChildren } from 'react';
import clsx from 'clsx';
import './DataList.css';

export const DataList = forwardRef<
  HTMLElement,
  PropsWithChildren<HTMLAttributes<HTMLUListElement>>
>(({ children, className, ...rest }, ref) => {
  return (
    <ul ref={ref as React.RefObject<HTMLUListElement>} className={clsx('data-list', className)} {...rest}>
      {children}
    </ul>
  );
});
