import type { HTMLAttributes } from 'react';
import './DataListItem.css';

export const DataListItem = ({ children, ...rest }: HTMLAttributes<HTMLLIElement>) => {
  return (
    <li className="data-list-item" {...rest} >
      <article className="data-list-item__article">{children}</article>
    </li>
  );
};
