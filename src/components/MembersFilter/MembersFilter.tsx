import { SelectField, TextField } from "@components/Forms";

import "./MembersFilter.css";

export const MembersFilter = () => {
  return (
    <form className="members-filter">
      <TextField name="search" label="Zoek een bureau..." labelStyle="float" />

      <div className="member-filter__selects">
        <SelectField
          name="expertise"
          label="Expertise"
          labelStyle="contain"
          options={[
            { label: "Design", value: "design" },
            { label: "Research", value: "research" },
            { label: "Service Design", value: "service_design" },
            { label: "Strategy", value: "strategy" },
            { label: "HR", value: "hr" },
            { label: "Development", value: "development" },
            { label: "Experience", value: "experience" },
          ]}
        />
        <SelectField
          name="branche"
          label="Branche"
          labelStyle="contain"
          options={[
            { label: "Label 1", value: "label_1" },
            { label: "Label 2", value: "label_2" },
          ]}
        />
        <SelectField
          name="omvang"
          label="Omvang"
          labelStyle="contain"
          options={[
            { label: "Label 1", value: "label_1" },
            { label: "Label 2", value: "label_2" },
          ]}
        />
        <SelectField
          name="provincie"
          label="Provincie"
          labelStyle="contain"
          options={[
            { label: "Noord-Holland", value: "noord-holland" },
            { label: "Zuid-Holland", value: "zuid-holland" }
          ]}
        />
        <SelectField
          name="sort"
          label="Sorteren"
          labelStyle="contain"
          options={[
            { label: "A-Z", value: "a-z" },
            { label: "Aantal werknemers", value: "employees" },
          ]}
        />
      </div>
    </form>
  );
};
