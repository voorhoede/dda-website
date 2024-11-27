import type { InputHTMLAttributes } from "react";
import { Text } from "@components/Text";

import "./TextInput.css";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
}

export const TextInput = ({ label, name, ...props }: Props) => {
  return (
    <div className="text-input">
      {/* <label className="text-input__label" htmlFor={name}>
        <Text as="span" variant="subtext" >{label}</Text>
      </label> */}
      <input className="text-input__input" type="text" id={name} {...props} />
    </div>
  );
}
