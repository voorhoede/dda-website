import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import { Field, Input, Label } from '@headlessui/react';

import './TextField.css';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  labelStyle?: 'stack' | 'float';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: string) => void;
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
  value,
  defaultValue,
  required = false,
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
        type="text"
        name={name}
        className="text-field__input"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
      />
    </Field>
  );
};
