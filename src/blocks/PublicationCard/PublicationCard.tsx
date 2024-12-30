import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Tag, TagList } from '@components/Tag';
import { Text } from '@components/Text';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';
import type { PublicationCardFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';

export const PublicationCard = ({
  publication,
}: {
  publication: PublicationCardFragment;
}) => {
  return (
    <Card>
      {publication.banner.responsiveImage && (
        <CardImage>
          <SRCImage data={publication.banner.responsiveImage} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          {publication.tags.map(({ name }) => (
            <Tag key={name}>{name}</Tag>
          ))}
        </TagList>
        {publication._publishedAt && (
          <Text variant="subtext">
            <time dateTime={publication._publishedAt}>
              {formatDate(publication._publishedAt)}
            </time>
          </Text>
        )}
        <Heading displayLevel={4} level={3}>
          {publication.title}
        </Heading>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          height="narrow"
          icon="arrow-right"
          level="secondary"
          variant="large"
          href={`/publicaties/${publication.slug}/`}
          targetArea="parent"
        >
          {t('read_more')}
          <span className="a11y-sr-only">
            {t('_about_subject', { subject: publication.title })}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};
