import { useState, type FormEvent, forwardRef } from 'react';
import './ListForm.css';

type OnChange = (name: string, value: string) => void;
type FormData = Record<string, string>;

interface ListFormProps {
  initialValues: FormData;
  onSearchChange?: (formData: FormData) => void;
  onFilterChange?: (formData: FormData) => void;
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

export const ListForm = forwardRef<HTMLFormElement, ListFormProps>(
  ({ initialValues, onSearchChange, onFilterChange, search, filters }, ref) => {
    const [values, setValues] = useState<FormData>(initialValues);

    const handleSearchChange: OnChange = (name: string, value: string) => {
      const updatedFormData = { ...values, [name]: value };

      setValues(updatedFormData);

      if (onSearchChange) {
        onSearchChange(updatedFormData);
      }
    };

    const handleFilterChange: OnChange = (name: string, value: string) => {
      const updatedFormData = { ...values, [name]: value };

      setValues(updatedFormData);

      if (onFilterChange) {
        onFilterChange(updatedFormData);
      }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    return (
      <form ref={ref} className="list-form" onSubmit={handleSubmit}>
        {search({ onChange: handleSearchChange, values })}

        <div className="list-form__filters">
          {filters({ onChange: handleFilterChange, values })}
        </div>
      </form>
    );
  },
);
