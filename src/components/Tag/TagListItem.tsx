import type { ReactNode } from 'react';
import { Tag, type TagProps } from './Tag';

export const TagListItem = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: TagProps['variant'];
}) => {
  return (
    <li>
      <Tag variant={variant}>{children}</Tag>
    </li>
  );
};
