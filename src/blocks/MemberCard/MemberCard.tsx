import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Tag } from '@components/Tag';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import type { MemberCardFragment } from '@lib/types/datocms';
import { SRCImage, type ResponsiveImageType } from 'react-datocms';

import './MemberCard.css';

interface Props {
  member: MemberCardFragment;
  priority?: boolean;
}

export const MemberCard = ({ member, priority }: Props) => {
  return (
    <Card>
      <CardImage>
        {member.logo.responsiveImage && (
          <SRCImage
            data={
              member.banner?.responsiveImage ||
              (member.logo.responsiveImage as ResponsiveImageType)
            }
            // disable placeholder for logo
            // since its background can be transparent,
            // causing placeholder to be visible after loading
            usePlaceholder={false}
            priority={priority}
          />
        )}
      </CardImage>

      <CardContent>
        <Heading level={2} displayLevel={3}>
          {member.name}
        </Heading>
        <Text variant="subtext">{member.location}</Text>
        <div className="agency__employees">
          <Text variant="subtext">
            {t('count_employees', { count: t(`count_employees_${member.employees}`) })}
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
          targetArea="parent"
        >
          {t('details')}
          <span className="a11y-sr-only">
            {t('_about_subject', { subject: member.name })}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};
