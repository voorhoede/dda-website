import type { EventsData } from '../../EventList';

import { forwardRef } from 'react';

import { EventCard } from '@blocks/EventCard';
import { Column, Grid as GridComponent } from '@components/Grid';

import './Grid.css';

type Props = {
  data: EventsData['events'];
};

export const Grid = forwardRef<HTMLUListElement, Props>(({ data }, ref) => {
  return (
    <GridComponent ref={ref} as="ul" className='event-list-grid' border>
      {data.map((item) => (
        <Column
          key={item.id}
          as="li"
          span={{
            mobile: 12,
            tablet: 6,
            desktop: data.length < 3 ? 6 : 4,
          }}
        >
          <EventCard event={item} />
        </Column>
      ))}
    </GridComponent>
  );
});
