import type { ReactNode } from 'react';
import './DataList.css';

export const DataList = ({ children }: { children: ReactNode }) => {
  return <ul className="data-list">{children}</ul>;
};
