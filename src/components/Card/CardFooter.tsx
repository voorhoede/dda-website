import type { ReactNode } from 'react';
import './CardFooter.css';

export const CardFooter = ({ children }: { children: ReactNode }) => {
  return <footer className="card-footer">{children}</footer>;
};
