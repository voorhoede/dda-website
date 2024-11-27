import type { HTMLAttributes, InputHTMLAttributes } from "react";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";

import "./Select.css";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  label: string;
  formName: string;
  options: { label: string; value: string }[];
}

export const Select = ({ label, name, formName, options, ...props }: Props) => {
  return (
    <details className="select" name={formName}>
      <summary className="select-label">
        <Text as="span" className="select-label__text" variant="subtext">
          {label}
        </Text>
        <div className="select-label__icon">
          <Icon className="select-label__icon--open" name="plus" />
          <Icon className="select-label__icon--close" name="minus" />
        </div>
      </summary>

      <ul className="select__body">
        {options.map((option) => (
          <li key={option.value} className="select-option">
            <input
              className="select-option__input"
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              {...props}
            />
            <label
              className="select-option__label"
              htmlFor={`${name}-${option.value}`}
            >
              <Text as="span" variant="subtext">{ option.label }</Text>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
};
