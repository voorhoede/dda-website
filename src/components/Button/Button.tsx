import type { IconName } from '@assets/icon-sprite';
import { Icon } from '@components/Icon';
import { Link } from '@components/Link';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import './Button.css';

type ButtonProps = {
  className?: string;
  height?: 'default' | 'narrow';
  icon?: IconName;
  level?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'large';
  [key: string]: any;
} & (
  | {
      // Button with text
      'aria-label'?: never;
      as?: 'button';
      children: ReactNode;
      href?: never;
      iconOnly?: false;
    }
  | {
      // Link with text
      'aria-label'?: never;
      as: 'a';
      children: ReactNode;
      href: string;
      iconOnly?: false;
    }
  | {
      // Button with icon only
      'aria-label': string;
      as?: 'button';
      children?: never;
      href?: never;
      icon: IconName;
      iconOnly: true;
    }
  | {
      // Link with icon only
      'aria-label': string;
      as: 'a';
      children?: never;
      href: string;
      icon: IconName;
      iconOnly: true;
    }
);

export const Button = ({
  as = 'button',
  children,
  className,
  height = 'default',
  href,
  icon,
  iconOnly = false,
  level = 'primary',
  variant = 'default',
  ...rest
}: ButtonProps) => {
  const commonClasses = clsx(
    className,
    'button',
    level !== 'primary' && `button--${level}`,
    variant !== 'default' && `button--${variant}`,
    height !== 'default' && `button--${height}`,
    {
      'button--icon-only': iconOnly,
    },
  );

  if (as === 'a' && href) {
    return (
      <Link className={commonClasses} href={href} {...rest}>
        {!iconOnly && <span className="button__content">{children}</span>}
        {icon && <Icon className="button__icon" name={icon} />}
      </Link>
    );
  }

  return (
    <button className={commonClasses} type={rest.type || 'button'} {...rest}>
      {!iconOnly && <span className="button__content">{children}</span>}
      {icon && <Icon className="button__icon" name={icon} />}
    </button>
  );
};
