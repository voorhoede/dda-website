import { forwardRef, type ElementType, type ForwardedRef } from 'react';
import type { IconName } from '@assets/icon-sprite';
import { Icon } from '@components/Icon';
import clsx from 'clsx';
import type { PolymorphicComponentPropsWithRef } from '@lib/polymorphic-component';
import './Button.css';

const defaultComponent = 'button';

type ButtonBaseProps = {
  className?: string;
  height?: 'default' | 'narrow';
  icon?: IconName;
  level?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'large';
  iconOnly?: boolean;
} & (
  | {
      // Button with icon only
      'aria-label': string;
      children?: never;
      icon: IconName;
      iconOnly: true;
    }
  | {
      // Regular button
      iconOnly?: false;
    }
);

export type ButtonProps<C extends ElementType = typeof defaultComponent> =
  PolymorphicComponentPropsWithRef<C, ButtonBaseProps>;

type ButtonComponent = <C extends ElementType = typeof defaultComponent>(
  props: ButtonProps<C>,
) => React.ReactElement | null;

export const Button = forwardRef(
  <C extends ElementType = typeof defaultComponent>(
    {
      as,
      children,
      className,
      height = 'default',
      icon,
      iconOnly = false,
      level = 'primary',
      variant = 'default',
      ...rest
    }: ButtonProps<C>,
    ref: ForwardedRef<C>,
  ) => {
    const Component = as || defaultComponent;
    const commonClasses = clsx(className, 'button', {
      'button--icon-only': iconOnly,
      [`button--${level}`]: level !== 'primary',
      [`button--${variant}`]: variant !== 'default',
      [`button--${height}`]: height !== 'default',
    });

    return (
      <Component
        ref={ref}
        className={commonClasses}
        type={Component === 'button' ? rest.type || 'button' : undefined}
        {...rest}
      >
        {!iconOnly && <span className="button__content">{children}</span>}
        {icon && <Icon className="button__icon" name={icon} />}
      </Component>
    );
  },
) as ButtonComponent;
