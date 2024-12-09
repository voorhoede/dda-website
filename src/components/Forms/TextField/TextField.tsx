import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import { Field, Input, Label } from '@headlessui/react';

import './TextField.css';

type Props = {
  name: string;
  label: string;
  labelStyle?: 'stack' | 'float';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'search';
} & (
  | {
      labelStyle?: 'stack';
      placeholder?: string;
    }
  | {
      labelStyle: 'float';
      placeholder?: undefined;
    }
);

export const TextField = ({
  name,
  label,
  labelStyle = 'stack',
  placeholder = '',
  type = 'text',
  value,
  onChange,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newValue = event.target.value;
      onChange(newValue);
    }
  };

  return (
    <Field className="text-field">
      <Label
        className={clsx(
          'text-field__label',
          `text-field__label--${labelStyle}`,
        )}
      >
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        className="text-field__input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
};
