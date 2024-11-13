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
  const labels = event.labels?.split(',').map((label) => label.trim()) ?? [];

  return (
    <Card>
      {event.image.responsiveImage && (
        <CardImage>
          <SRCImage data={event.image.responsiveImage} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          {labels.map((label) => (
            <Tag key={label}>{label}</Tag>
          ))}
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
        >
          {t('details')}
        </Button>
      </CardFooter>
    </Card>
  );
};
