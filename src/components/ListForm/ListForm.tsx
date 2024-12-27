import { useState, type FormEvent, forwardRef, useCallback } from 'react';
import debounce from 'debounce';
import './ListForm.css';
import clsx from 'clsx';

type OnChange = (name: string, value: string) => void;
type FormData = Record<string, string>;

interface ListFormProps {
  className?: string;
  initialValues: FormData;
  onChange: (formData: FormData) => void;
  search: ({
    onChange,
    values,
  }: {
    onChange: OnChange;
    values: FormData;
  }) => React.ReactNode;
  filters: ({
    onChange,
    values,
  }: {
    onChange: OnChange;
    values: FormData;
  }) => React.ReactNode;
}

export const ListForm = forwardRef<HTMLElement, ListFormProps>(
  ({ className, initialValues, onChange, search, filters }, ref) => {
    const [values, setValues] = useState<FormData>(initialValues);

    const debouncedOnChange = useCallback(debounce(onChange, 500), [onChange]);

    const handleSearchChange: OnChange = (name: string, value: string) => {
      const updatedFormData = { ...values, [name]: value };

      setValues(updatedFormData);

      // debounce the onChange to prevent multiple calls when typing
      debouncedOnChange(updatedFormData);
    };

    const handleFilterChange: OnChange = (name: string, value: string) => {
      const updatedFormData = { ...values, [name]: value };

      setValues(updatedFormData);

      // don't debounce the filter change, so it's instant
      onChange(updatedFormData);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    return (
      <form
        ref={ref as React.RefObject<HTMLFormElement>}
        className={clsx('list-form', className)}
        onSubmit={handleSubmit}
      >
        <div className="list-form__search">
          {search({ onChange: handleSearchChange, values })}
        </div>

        <div className="list-form__filters">
          {filters({ onChange: handleFilterChange, values })}
        </div>
      </form>
    );
  },
);
