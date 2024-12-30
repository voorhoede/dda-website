import type { HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import './ImageParadeItem.css';

export type ImageParadeItemProps = PropsWithChildren<HTMLProps<HTMLLIElement>>;

export const ImageParadeItem = ({
  children,
  className,
  ...props
}: ImageParadeItemProps) => {
  return (
    <li className={clsx('image-parade__item', className)} {...props}>
      {children}
    </li>
  );
};
