import type { IconName } from '@assets/icon-sprite';
import clsx from 'clsx';
import './Icon.css';

interface IconProps {
  className?: string;
  name: IconName;
  [key: string]: any;
}

export const Icon = ({ className, name, ...rest }: IconProps) => {
  const ariaLabel = rest['aria-label'];

  return (
    <svg
      {...rest}
      aria-label={ariaLabel}
      className={clsx('icon', className)}
      role={rest.role ? rest.role : ariaLabel ? 'img' : 'presentation'}
      data-icon={name}
    >
      <use href={`#${name}`} xlinkHref={`#${name}`} />
    </svg>
  );
};
