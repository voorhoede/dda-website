import type { ReactNode } from 'react';
import './CardContent.css';

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <div className="card-content">{children}</div>;
};
