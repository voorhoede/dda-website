import type { ReactNode } from 'react';
import './DataListItemFooter.css';

export const DataListItemFooter = ({ children }: { children: ReactNode }) => {
  return <footer className="data-list-item-footer">{children}</footer>;
};
