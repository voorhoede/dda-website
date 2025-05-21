import { EventCard } from '@blocks/EventCard';
import { Button } from '@components/Button';
import {
  DataList,
  DataListItem,
  DataListItemFooter,
} from '@components/DataList';
import { Column, Grid, type SpanOptions } from '@components/Grid';
import { Heading } from '@components/Heading';
import { Tag } from '@components/Tag';
import { Text } from '@components/Text';
import { EventDate } from '@components/EventDate';
import { t } from '@lib/i18n';
import type { EventCardFragment } from '@lib/types/datocms';
import './EventsSection.css';

type EventsSectionProps = {
  events: EventCardFragment[];
};

export const EventsSection = ({ events }: EventsSectionProps) => {
  const colCount = Math.max(4, Math.min(12 / events.length, 6)) as SpanOptions;
  const renderAsList = events.length >= 4;

  return (
    <Grid border={true}>
      {renderAsList ? (
        <>
          <Column
            className="events-section__column"
            span={{ mobile: 12, desktop: 4 }}
          >
            <EventCard event={events[0]} />
          </Column>
          <Column
            className="events-section__column events-section__column--list"
            span={{ mobile: 12, desktop: 8 }}
          >
            <DataList className="container-padding-x container-padding-y">
              {events.slice(1).map((event) => (
                <DataListItem key={event.id}>
                  <div>
                    {event.theme?.name && <Tag>{event.theme.name}</Tag>}
                  </div>
                  <Heading displayLevel={4} level={3}>
                    {event.title}
                  </Heading>
                  <DataListItemFooter>
                    <Text variant="subtext">
                      <EventDate
                        startDate={event.startDate}
                        endDate={event.endDate}
                      />
                      {event.location && ` / ${event.location}`}
                    </Text>
                    <Button
                      as="a"
                      height="narrow"
                      icon="arrow-right"
                      level="secondary"
                      variant="large"
                      href={
                        event.details.__typename === 'ExternalEventRecord'
                          ? event.details.link
                          : `/events/${event.details.slug}/`
                      }
                      targetArea="parent"
                    >
                      {t('details')}
                    </Button>
                  </DataListItemFooter>
                </DataListItem>
              ))}
            </DataList>
          </Column>
        </>
      ) : (
        events.map((event) => (
          <Column
            className="events-section__column"
            span={{ mobile: 12, tablet: 6, desktop: colCount }}
          >
            <EventCard event={event} />
          </Column>
        ))
      )}
    </Grid>
  );
};
