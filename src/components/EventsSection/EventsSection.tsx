import { EventCard } from '@components/Card';
import { Column, Grid, type SpanOptions } from '@components/Grid';
import './EventsSection.css';

type Event = {
  date: string;
  labels: string[];
  location: string;
  title: string;
};

type EventsSectionProps = {
  events: Event[];
};

export const EventsSection = ({ events }: EventsSectionProps) => {
  const colCount = Math.max(4, Math.min(12 / events.length, 6)) as SpanOptions;
  const renderAsList = events.length >= 4;

  return (
    <Grid as="section" border={true}>
      {renderAsList ? (
        <>
          <Column
            className="events-section__column"
            span={{ mobile: 12, tablet: 6, desktop: 4 }}
          >
            <EventCard event={events[0]} />
          </Column>
          <Column
            className="events-section__column"
            span={{ mobile: 12, desktop: 8 }}
          >
            {events.slice(1).map((event) => (
              <p>Event</p>
            ))}
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
