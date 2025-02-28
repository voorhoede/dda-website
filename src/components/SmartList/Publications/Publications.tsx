import clsx from 'clsx';
import { t } from '@lib/i18n';
import { formatDate } from '@lib/date';
import {
  DataList,
  DataListItem,
  DataListItemFooter,
} from '@components/DataList';
import { TagList, TagListItem } from '@components/Tag';
import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import { Button } from '@components/Button';

import './Publications.css';
import type { PublicatiesQueryQuery } from '@lib/types/datocms';

type Props = {
  data: PublicatiesQueryQuery['items'];
};

export const Publications = ({ data }: Props) => {
  return (
    <DataList
      className={clsx({
        'container-padding-x container-padding-y': data.length > 0,
      })}
    >
      {data?.map((publication) => (
        <DataListItem key={publication.id}>
          <TagList>
            {publication.tags.map(({ name }) => (
              <TagListItem key={name}>{name}</TagListItem>
            ))}
          </TagList>
          <Heading displayLevel={4} level={3}>
            {publication.title}
          </Heading>
          <DataListItemFooter>
            <Text variant="subtext">
              <time dateTime={publication._createdAt}>
                {formatDate(publication._createdAt)}
              </time>
            </Text>
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
          </DataListItemFooter>
        </DataListItem>
      ))}
    </DataList>
  );
};
