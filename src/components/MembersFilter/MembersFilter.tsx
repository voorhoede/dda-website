import { useEffect, useState } from "react";
import { SelectField, TextField } from "@components/Forms";

import "./MembersFilter.css";

type FormData = {
  zoek: string;
  expertise: string;
  branche: string;
  omvang: string;
  sorteren: string;
}

interface Props {
  filter?: FormData;
  options: {
    expertise: { id: string, name: string }[];
    industry: { id: string, name: string }[];
  };
  onChange?: (formData: FormData) => void;
}

export const MembersFilter = ({ filter, options, onChange }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    zoek: "",
    expertise: "",
    branche: "",
    omvang: "",
    sorteren: "",
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
  
  const handleSubmit = (event: any) => { 
    event.preventDefault();
  }

  return (
    <form className="members-filter" onSubmit={handleSubmit}>
      <TextField
        name="zoek"
        label="Zoek een bureau..."
        labelStyle="float"
        value={formData.zoek}
        onChange={(value) => handleChange('zoek', value)}
      />

      <div className="member-filter__selects">
        <SelectField
          name="expertise"
          label="Expertise"
          labelStyle="contain"
          options={options.expertise.map((option) => ({ label: option.name, value: option.id }))}
          value={formData.expertise}
          onChange={(value) => handleChange('expertise', value)}
        />
        <SelectField
          name="branche"
          label="Branche"
          labelStyle="contain"
          options={options.industry.map((option) => ({ label: option.name, value: option.id }))}
          value={formData.branche}
          onChange={(value) => handleChange('branche', value)}
        />
        <SelectField
          name="omvang"
          label="Omvang"
          labelStyle="contain"
          options={[
            { label: "1-9", value: "1-9" },
            { label: "10-24", value: "10-24" },
            { label: "25-49", value: "25-49" },
            { label: "50-99", value: "50-99" },
            { label: "100-249", value: "100-249" },
            { label: "250+", value: "250+" }
          ]}
          value={formData.omvang}
          onChange={(value) => handleChange('omvang', value)}
        />
        <SelectField
          name="sorteren"
          label="Sorteren"
          labelStyle="contain"
          options={[
            { label: "A-Z", value: "name_ASC" },
            { label: "Aantal werknemers", value: "employees_ASC" },
          ]}
          value={formData.sorteren}
          onChange={(value) => handleChange('sorteren', value)}
        />
      </div>
    </form>
  );
};
