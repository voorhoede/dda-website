import type { MemberCardFragment } from '@lib/types/datocms';
import { Column, Grid } from '@components/Grid';
import { MemberCard } from '@blocks/MemberCard';

import './Members.css';

type Props = {
  data: MemberCardFragment[];
};

export const Members = ({ data }: Props) => {
  return (
    <Grid as="ul" border={data.length > 0} className="member-list">
      {data.map((member, index) => (
        <Column
          key={member.id}
          as="li"
          span={{ mobile: 12, tablet: 6, desktop: 4 }}
        >
          <MemberCard member={member} priority={index < 3} />
        </Column>
      ))}
    </Grid>
  );
};
