import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import { Field, Label, Textarea as HeadlessTextarea } from '@headlessui/react';

import './Textarea.css';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
  onChange?: (value: string) => void;
};

export const Textarea = ({
  name,
  label,
  rows = 4,
  placeholder = '',
  value,
  className,
  defaultValue,
  required = false,
  autoComplete,
  onChange,
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Field className={clsx('textarea', className)}>
      <Label className="textarea__label">{label}</Label>
      <HeadlessTextarea
        name={name}
        rows={rows}
        className="textarea__input"
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
