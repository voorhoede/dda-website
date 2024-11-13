import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Tag, TagList } from '@components/Tag';
import { Text } from '@components/Text';
import { formatDate } from '@lib/date';
import { t } from '@lib/i18n';
import type { NewsCardFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';

export const NewsCard = ({ news }: { news: NewsCardFragment }) => {
  const labels = news.labels?.split(',').map((label) => label.trim()) ?? [];

  return (
    <Card>
      {news.image.responsiveImage && (
        <CardImage>
          <SRCImage data={news.image.responsiveImage} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          {labels.map((label) => (
            <Tag key={label}>{label}</Tag>
          ))}
        </TagList>
        {(news._publishedAt || news.location) && (
          <Text variant="subtext">
            {news._publishedAt && (
              <time dateTime={news._publishedAt}>
                {formatDate(news._publishedAt)}
              </time>
            )}
            {news._publishedAt && news.location && <>&nbsp;/&nbsp;</>}
            {news.location && news.location}
          </Text>
        )}
        <Heading displayLevel={4} level={3}>
          {news.title}
        </Heading>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          height="narrow"
          icon="chevron-right"
          level="secondary"
          variant="large"
        >
          {t('read_more')}
        </Button>
      </CardFooter>
    </Card>
  );
};
