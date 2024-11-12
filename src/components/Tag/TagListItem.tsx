import { Tag, type TagProps } from './Tag';

export const TagListItem = (props: TagProps) => {
  return (
    <li>
      <Tag {...props} />
    </li>
  );
};
