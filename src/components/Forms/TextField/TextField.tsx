import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

import "./TextField.css";

type Props = {
  name: string;
  label: string;
  labelStyle?: "stack" | "float";
  placeholder?: string;
} & (
  | {
      labelStyle?: "stack";
      placeholder?: string;
    }
  | {
      labelStyle: "float";
      placeholder?: undefined;
    }
);

export const TextField = ({
  name,
  label,
  labelStyle = "stack",
  placeholder = "",
}: Props) => {
  return (
    <Field className="text-field">
      <Label
        className={clsx(
          "text-field__label",
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
      />
    </Field>
  );
};
