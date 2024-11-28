import type { HTMLProps, PropsWithChildren } from 'react';
import './ImageParadeItem.css';

export type ImageParadeItemProps = PropsWithChildren<HTMLProps<HTMLLIElement>>;

export const ImageParadeItem = ({
  children,
  ...props
}: ImageParadeItemProps) => {
  return (
    <li className="image-parade__item" {...props}>
      {children}
    </li>
  );
};
