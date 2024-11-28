import { useState } from "react";
import clsx from "clsx";
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { Text } from "@components/Text";
import { Icon } from "@components/Icon";

import "./SelectField.css";

type Props = {
  name: string;
  label: string;
  labelStyle?: "stack" | "contain";
  options: { label: string; value: string }[];
}

export const SelectField = ({ name, label, labelStyle = 'stack', options }: Props) => {
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string }>();
  
  return (
    <Field>
      <Label className={clsx({'a11y-sr-only': labelStyle === 'contain'})}>{label}</Label>
      <Listbox name={name} onChange={setSelectedOption}>
        <ListboxButton className="select-button">
          <Text as="span" variant="subtext" className="select-button__label">
            { labelStyle === "contain" ? label : selectedOption ? selectedOption.label : "" }
          </Text>
  
          <div className="select-button__icon ">
            <Icon className="select-button__icon--open" name="plus" />
            {/* <Icon className="select-button__icon--close" name="minus" /> */}
          </div>
        </ListboxButton>
        <ListboxOptions anchor="bottom start" className="select-options">
          {options.map((option) => (
            <ListboxOption key={option.value} className="select-options__option" value={option.value}>
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};
