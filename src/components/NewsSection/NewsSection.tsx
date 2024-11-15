import { NewsCard } from '@blocks/NewsCard';
import { Column, Grid } from '@components/Grid';
import type { NewsCardFragment } from '@lib/types/datocms';
import './NewsSection.css';

type NewsSectionProps = {
  news: NewsCardFragment[];
};

export const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <Grid as="section" border={true}>
      {news.map((newsItem) => (
        <Column
          key={newsItem.id}
          span={{ mobile: 12, tablet: 6, desktop: 4 }}
          style={{ padding: 48 }}
        >
          <NewsCard news={newsItem} />
        </Column>
      ))}
    </Grid>
  );
};
