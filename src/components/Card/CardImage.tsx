import type { ReactNode } from 'react';
import './CardImage.css';

export const CardImage = ({ children }: { children: ReactNode }) => {
  return <div className="card-image">{children}</div>;
};
