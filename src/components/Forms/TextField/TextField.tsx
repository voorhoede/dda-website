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
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'search' | 'email' | 'password' | 'tel';
  autoComplete?: string;
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
  className,
  defaultValue,
  required = false,
  type = 'text',
  autoComplete,
  onChange,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const newValue = event.target.value;
      onChange(newValue);
    }
  };
  
  console.log(className)

  return (
    <Field className={clsx('text-field', className)}>
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
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
        autoComplete={autoComplete}
      />
    </Field>
  );
};
