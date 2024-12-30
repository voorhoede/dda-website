import { useState, type FormEvent, forwardRef, useCallback } from 'react';
import debounce from 'debounce';
import './ListForm.css';
import clsx from 'clsx';
import { t } from '@lib/i18n';
import { Button } from '@components/Button';

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

    const shouldShowResetButton = Object.entries(values).some(
      ([key, value]) => key !== 'page' && value !== '',
    );

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

    const handleReset = () => {
      const emptyValues = Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = '';

        return acc;
      }, {} as FormData);

      onChange(emptyValues);
      setValues(emptyValues);
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

        <div className="list-form__filters" key={JSON.stringify(values)}>
          {shouldShowResetButton && (
            <Button type="reset" icon="reset" onClick={handleReset}>
              {t('reset')}
            </Button>
          )}

          {filters({ onChange: handleFilterChange, values })}
        </div>
      </form>
    );
  },
);
