/* eslint-disable @typescript-eslint/ban-types */
/**
 * Based on: https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
 */
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor,
} from 'react';

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {},
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends ElementType,
  Props = {},
> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `component` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends ElementType,
  Props = {},
> = InheritableElementProps<C, Props & AsProp<C>>;

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = {},
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };
