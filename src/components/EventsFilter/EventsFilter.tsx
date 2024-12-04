import { useEffect, useState, type FormEvent, forwardRef } from 'react';
import { SelectField, TextField } from '@components/Forms';

import './EventsFilter.css';
import { t } from '@lib/i18n';

export type Filter = {
  zoek: string;
  thema: string;
};

interface Props {
  filter?: Filter;
  options: {
    themes: { id: string; name: string }[];
  };
  onChange?: (formData: Filter) => void;
}

export const EventsFilter = forwardRef<HTMLFormElement, Props>(
  ({ filter, options, onChange }, ref) => {
    const [formData, setFormData] = useState<Filter>({
      zoek: '',
      thema: '',
    });

    useEffect(() => {
      if (filter) {
        setFormData(filter);
      }
    }, [filter]);

    const handleChange = (name: string, value: any) => {
      const updatedFormData = { ...formData, [name]: value };

      setFormData(updatedFormData);
      if (onChange) {
        onChange(updatedFormData);
      }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    return (
      <form ref={ref} className="events-filter" onSubmit={handleSubmit}>
        <TextField
          name="zoek"
          label={t('find_an_event')}
          labelStyle="float"
          value={formData.zoek}
          onChange={(value) => handleChange('zoek', value)}
        />

        <div>
          <SelectField
            name="thema"
            label={t('theme')}
            labelStyle="contain"
            options={[
              { label: t('all'), value: '' },
              ...options.themes.map((option) => ({
                label: option.name,
                value: option.id,
              })),
            ]}
            value={formData.thema}
            onChange={(value) => handleChange('thema', value)}
          />
        </div>
      </form>
    );
  },
);
