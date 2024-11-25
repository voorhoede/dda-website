import type { PropsWithChildren, ReactNode } from 'react';
import './DataListItem.css';

export const DataListItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="data-list-item">
      <article className="data-list-item__article">{children}</article>
    </li>
  );
};
