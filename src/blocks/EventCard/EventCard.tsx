import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Tag, TagList } from '@components/Tag';
import { Text } from '@components/Text';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';
import type { EventCardFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';

export const EventCard = ({ event }: { event: EventCardFragment }) => {
  return (
    <Card>
      {event.image.responsiveImage && (
        <CardImage>
          <SRCImage data={event.image.responsiveImage} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          <Tag>{event.theme?.name}</Tag>
        </TagList>
        {(event.date || event.location) && (
          <Text variant="subtext">
            {event.date && (
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            )}
            {event.date && event.location && <>&nbsp;/&nbsp;</>}
            {event.location && event.location}
          </Text>
        )}
        <Heading level={3}>{event.title}</Heading>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          height="narrow"
          icon="arrow-right"
          level="secondary"
          variant="large"
          href={ event.details.__typename === 'ExternalEventRecord' ? event.details.link : `./${event.details.slug}/` }
          targetArea="parent"
        >
          {t('details')}
        </Button>
      </CardFooter>
    </Card>
  );
};
