import { Select, TextInput } from "@components/Forms";

import "./MembersFilter.css";

export const MembersFilter = () => {
  return (
    <form className="members-filter">
      <TextInput label="Zoek een bureau" />
      
      <div className="member-filter__selects">
        <Select label="Expertise" name="expertise" formName="members-filter" options={[
          { label: 'Design', value: 'design'},
          { label: 'Research', value: 'research'},
          { label: 'Service Design', value: 'service_design'},
          { label: 'Strategy', value: 'strategy'},
          { label: 'HR', value: 'hr'},
          { label: 'Development', value: 'development'},
          { label: 'Experience', value: 'experience'},
        ]} />
        <Select label="Branche" name="branche" formName="members-filter" options={[]} />
        <Select label="Omvang" name="omvang" formName="members-filter" options={[]} />
        <Select label="Provincie" name="provincie" formName="members-filter" options={[]} />
        <Select label="Sorteren" name="sorteren" formName="members-filter" options={[]} />
      </div>
    </form>
  );
}
