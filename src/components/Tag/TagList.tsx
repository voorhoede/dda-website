import { type ReactNode } from 'react';
import './TagList.css';

export const TagList = ({
  children,
  showEllipses = false,
}: {
  children?: ReactNode;
  showEllipses?: boolean;
}) => {
  if (!children) {
    return <div className="tag-list" />;
  }

  return (
    <ul className="tag-list">
      {children}
      {showEllipses && <li>…</li>}
    </ul>
  );
};
