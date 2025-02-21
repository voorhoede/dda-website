import type { EventsQuery } from '@lib/types/datocms';

import './Events.css';
import { DataList, DataListItem, DataListItemFooter } from '@components/DataList';
import clsx from 'clsx';
import { Tag } from '@components/Tag';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';

type Props = {
  data: EventsQuery['items'];
};

export const Events = ({ data }: Props) => {
  return (
    <DataList
      className={clsx({
        'container-padding-x container-padding-y': data.length > 0,
      })}
    >
      {data.map((event) => (
        <DataListItem key={event.id}>
          <div>{event.theme?.name && <Tag>{event.theme?.name}</Tag>}</div>
          <Heading displayLevel={4} level={3}>
            {event.title}
          </Heading>
          <DataListItemFooter>
            <Text variant="subtext">
              <time dateTime={event.date}>{formatDate(event.date)}</time>
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
                  : `./${event.details.slug}/`
              }
              targetArea="parent"
            >
              {t('details')}
              <span className="a11y-sr-only">
                {t('_about_subject', { subject: event.title })}
              </span>
            </Button>
          </DataListItemFooter>
        </DataListItem>
      ))}
    </DataList>
  );
};
