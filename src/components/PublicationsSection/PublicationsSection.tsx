import { PublicationCard } from '@blocks/PublicationCard';
import { Column, Grid } from '@components/Grid';
import type { PublicationCardFragment } from '@lib/types/datocms';
import './PublicationsSection.css';

type PublicationsSectionProps = {
  publications: PublicationCardFragment[];
};

export const PublicationsSection = ({
  publications,
}: PublicationsSectionProps) => {
  return (
    <Grid as="section" border={true}>
      {publications.map((publication) => (
        <Column
          key={publication.id}
          span={{ mobile: 12, tablet: 6, desktop: 4 }}
        >
          <PublicationCard publication={publication} />
        </Column>
      ))}
    </Grid>
  );
};
