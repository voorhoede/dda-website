import { useState, type ReactNode, type FormEvent, useCallback, forwardRef } from 'react';
import debounce from 'debounce';
import { SelectField, TextField } from '@components/Forms';

import './Filter.css';
import { Button } from '@components/Button';
import { t } from '@lib/i18n';

interface Props {
  endpoint: string;
  search: {
    name: string;
    label: string;
  }
  filters: Array<{
    name: string;
    label: string;
    options: Array<{ label: string; value: string }>;
  }>;
  initialValues?: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
  children: ReactNode;
}

export const Filter = forwardRef<HTMLFormElement, Props>(({ endpoint, search, filters, initialValues, onChange, children }, ref) => {
  const [data, setData] = useState<Record<string, string>>({
    [search.name]: initialValues?.[search.name] || '',
    ...filters.reduce((acc, filter) => {
      Object.assign(acc, { [filter.name]:  initialValues?.[filter.name] || '' });
      return acc;
    }, {}),
  });
  
  const shouldShowResetButton = Object.entries(data).some(
    ([key, value]) => key !== 'page' && value !== '',
  );
  const debouncedOnChange = useCallback(debounce(onChange, 500), [onChange]);

  const handleFilterChange = (name: string, value: string) => {
    const newData = { ...data, [name]: value };
    setData(newData);
    
    if (name === search.name) {
      /* Debounce search changes to prevent multiple calls while typing */
      debouncedOnChange(newData);
    } else {
      /* Rest can be instant */
      onChange(newData);
    }
  };
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const emptyData = Object.keys(data).reduce((acc, key) => { 
      Object.assign(acc, { [key]: '' });
      return acc;
    }, {});
    
    setData(emptyData);
    onChange(emptyData);
  };

  return (
    <form 
      ref={ref}
      tabIndex={-1}
      action={endpoint} 
      onSubmit={handleSubmit} 
      onReset={handleReset}
    >
      <div className="filter-fields">
        <TextField
          className="filter-field-search"
          name={search.name}
          label={search.label}
          labelStyle="float"
          type="search"
          value={data[search.name]}
          onChange={(value) => handleFilterChange(search.name, value)}
        />

        {filters.length > 0 && (
          <div className="filters">
            {shouldShowResetButton && (
              <Button type="reset" icon="reset">
                {t('reset')}
              </Button>
            )}
            
            {filters.map((filter) => (
              <SelectField
                key={filter.name}
                name={filter.name}
                label={filter.label}
                labelStyle="contain"
                options={filter.options}
                value={data[filter.name]}
                onChange={(value) => handleFilterChange(filter.name, value)}
              />
            ))}
          </div>
        )}
      </div>

      <output>{children}</output>
    </form>
  );
});
