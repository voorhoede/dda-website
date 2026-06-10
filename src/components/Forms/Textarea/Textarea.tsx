import { type ChangeEvent, type ComponentProps } from 'react';
import clsx from 'clsx';
import { Field, Label, Textarea as HeadlessTextarea } from '@headlessui/react';

import './Textarea.css';

type Props = Omit<ComponentProps<typeof HeadlessTextarea>, 'onChange'> & {
  label: string;
  onChange?: (value: string) => void;
};

export const Textarea = ({
  label,
  rows = 4,
  placeholder = '',
  className,
  onChange,
  ...props
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
        rows={rows}
        className="textarea__input"
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      />
    </Field>
  );
};
