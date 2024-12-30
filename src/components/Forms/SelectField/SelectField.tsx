import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import { Icon } from '@components/Icon';

import './SelectField.css';

type Props = {
  name: string;
  label: string;
  labelStyle?: 'stack' | 'contain';
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

export const SelectField = ({
  name,
  label,
  labelStyle = 'stack',
  options,
  value = '',
  onChange,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (value) {
      const firstValue = options.find((option) => option.value === value);
      setSelectedOption(firstValue?.value ?? '');
    }
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedOption(value);

    if (onChange) {
      onChange(value);
    }
  };

  const selectedLabel = selectedOption
    ? options.find((option) => option.value === selectedOption)?.label
    : '';
  const hasSelectedValue = selectedLabel !== '';

  const displayLabel = selectedLabel || label;

  return (
    <Field>
      <Label className={clsx({ 'a11y-sr-only': labelStyle === 'contain' })}>
        {label}
      </Label>
      <Listbox name={name} value={selectedOption} onChange={handleChange}>
        <ListboxButton
          className={clsx('select-button', {
            'select-button--has-value': hasSelectedValue,
          })}
        >
          <div className="select-button__label">{displayLabel}</div>

          <div className="select-button__icon ">
            <Icon className="select-button__icon--open" name="plus" />
            <Icon className="select-button__icon--close" name="minus" />
          </div>
        </ListboxButton>
        <ListboxOptions anchor="bottom start" className="select-options">
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              className="select-options__option"
              value={option.value}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};
