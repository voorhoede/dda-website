import { SRCImage, type ResponsiveImageType } from 'react-datocms';
import type { MemberCardFragment } from '@lib/types/datocms';
import { t } from '@lib/i18n';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Button } from '@components/Button';
import { Tag, TagList } from '@components/Tag';

import './MemberCard.css';

interface Props {
  member: MemberCardFragment;
}

export const MemberCard = ({ member }: Props) => {
  return (
    <Card>
      <CardImage>
        <SRCImage data={member.logo.responsiveImage as ResponsiveImageType} />
      </CardImage>

      <CardContent>
        {member.tags.length > 0 && (
          <TagList>
            {member.tags.map(({ label }) => (
              <Tag key={label}>{label}</Tag>
            ))}
          </TagList>
        )}
        <Heading level={2} displayLevel={3}>
          {member.name}
        </Heading>
        <Text variant="subtext">{member.location}</Text>
        <div className="agency__employees">
          <Text variant="subtext">
            {t('count_employees', { count: member.employees })}
          </Text>
          {member.vacancies.length > 0 && (
            <Tag variant="blue">{t('hiring')}</Tag>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          href={`./${member.slug}/`}
          height="narrow"
          icon="arrow-right"
          level="secondary"
          variant="large"
        >
          {t('details')}
        </Button>
      </CardFooter>
    </Card>
  );
};
