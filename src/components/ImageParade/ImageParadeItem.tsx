import type { HTMLProps, PropsWithChildren } from 'react';
import './ImageParadeItem.css';

export type ImageParadeItemProps = PropsWithChildren<
  HTMLProps<HTMLLIElement>
> & {
  backgroundColor?: string;
};

export const ImageParadeItem = ({
  children,
  backgroundColor = '#fff',
  ...props
}: ImageParadeItemProps) => {
  return (
    <li className="image-parade__item" style={{ backgroundColor }} {...props}>
      {children}
    </li>
  );
};
