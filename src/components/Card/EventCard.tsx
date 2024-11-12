import { Button } from '@components/Button';
import { Card, CardContent, CardFooter, CardImage } from '@components/Card';
import { Heading } from '@components/Heading';
import { Tag, TagList } from '@components/Tag';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';

type Event = {
  date: string;
  labels: string[];
  location: string;
  title: string;
};

export const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card>
      <CardImage>Image</CardImage>
      <CardContent>
        <TagList>
          <Tag>DDD</Tag>
        </TagList>
        <Text variant="subtext">di 28 juni 2024 / amsterdam</Text>
        <Heading level={3}>DUTCH DIGITAL DAY: THE 10TH EDITION</Heading>
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
