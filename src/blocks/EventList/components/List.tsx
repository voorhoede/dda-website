import type { EventsData } from '../EventList';

import { forwardRef } from 'react';
import { t } from '@lib/i18n';
import { formatDate } from '@lib/date';
import clsx from 'clsx';

import { DataList, DataListItem, DataListItemFooter } from '@components/DataList';
import { Heading } from '@components/Heading';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { Tag } from '@components/Tag';

type Props = {
  data: EventsData['events'];
};

export const List = forwardRef<HTMLUListElement, Props>(({ data }, ref) => {
  return (
    <DataList
      ref={ref}
      aria-live="polite"
      className={clsx({
        'container-padding-x container-padding-y': data.length > 0,
      })}
    >
      {data.map((item) => (
        <DataListItem key={item.id}>
          <div>{item.theme?.name && <Tag>{item.theme?.name}</Tag>}</div>
          <Heading displayLevel={4} level={3}>
            {item.title}
          </Heading>
          <DataListItemFooter>
            <Text variant="subtext">
              <time dateTime={item.date}>{formatDate(item.date)}</time>
              {item.location && ` / ${item.location}`}
            </Text>
            <Button
              as="a"
              height="narrow"
              icon="arrow-right"
              level="secondary"
              variant="large"
              href={
                item.details.__typename === 'ExternalEventRecord'
                  ? item.details.link
                  : `./${item.details.slug}/`
              }
              targetArea="parent"
            >
              {t('details')}
              <span className="a11y-sr-only">
                {t('_about_subject', { subject: item.title })}
              </span>
            </Button>
          </DataListItemFooter>
        </DataListItem>
      ))}
    </DataList>
  );
});
