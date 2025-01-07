import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import type { TeamMemberCardFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';

import './TeamMemberCard.css';

interface Props {
  member: TeamMemberCardFragment;
}

export const TeamMemberCard = ({ member }: Props) => {
  return (
    <Card>
      <CardImage>
        {member.image?.responsiveImage && (
          <SRCImage data={member.image?.responsiveImage} />
        )}
      </CardImage>

      <CardContent>
        <Heading level={3} displayLevel={4} className="team-member-name">
          {member.name}
        </Heading>
        <Text variant="subtext">{member.role}</Text>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          href={member.linkedinLink as string}
          target="_blank"
          height="narrow"
          icon="arrow-up-right"
          level="secondary"
          variant="large"
        >
          LinkedIn
          <span className="a11y-sr-only">
            {t('_of_team_member', { teamMember: member.name })}
          </span>
        </Button>
        <Button
          as="a"
          href={`mailto:${member.email}`}
          target="_blank"
          height="narrow"
          icon="arrow-up-right"
          level="secondary"
          variant="large"
        >
          E-mail
          <span className="a11y-sr-only">
            {t('_to_team_member', { teamMember: member.name })}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};
