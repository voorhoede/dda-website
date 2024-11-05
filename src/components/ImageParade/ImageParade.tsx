import { type PropsWithChildren } from 'react';
import clsx from 'clsx';
import './ImageParade.css';

export type ImageParadeProps = PropsWithChildren<{
  direction: 'left' | 'right';
}>;

export const ImageParade = ({ children, direction }: ImageParadeProps) => {
  return (
    <div className={clsx('image-parade', `image-parade--${direction}`)}>
      <ul className="image-parade__list">
        {/* Double the children to create the infinite effect */}
        {children}
        {children}
      </ul>
    </div>
  );
};
