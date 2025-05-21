import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { EventDate } from '@components/EventDate';
import { Heading } from '@components/Heading';
import { TagList, TagListItem } from '@components/Tag';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import type { EventCardFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';

export function getEventUrl(event: EventCardFragment): string {
  if (event.details?.__typename === 'ExternalEventRecord') {
    return event.details.link;
  }
  return `/events/${event.details?.slug}/`;
}

export const EventCard = ({
  event,
  priority,
}: {
  event: EventCardFragment;
  priority?: boolean;
}) => {
  return (
    <Card>
      {event.image.responsiveImage && (
        <CardImage>
          <SRCImage data={event.image.responsiveImage} priority={priority} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          {event.theme?.name && <TagListItem>{event.theme?.name}</TagListItem>}
        </TagList>
        {(event.startDate || event.location) && (
          <Text variant="subtext">
            {event.startDate && (
              <EventDate startDate={event.startDate} endDate={event.endDate} />
            )}
            {event.startDate && event.location && <>&nbsp;/&nbsp;</>}
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
          href={getEventUrl(event)}
          targetArea="parent"
        >
          {t('details')}
          <span className="a11y-sr-only">
            {t('_about_subject', { subject: event.title })}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};
