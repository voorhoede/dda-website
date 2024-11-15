import type { ReactNode } from 'react';
import './DataListItem.css';

export const DataListItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="data-list-item">
      <article className="data-list-item__article">{children}</article>
    </li>
  );
};
