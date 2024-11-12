import type { ReactNode } from 'react';
import './Card.css';

export const Card = ({ children }: { children: ReactNode }) => {
  return <article className="card">{children}</article>;
};
