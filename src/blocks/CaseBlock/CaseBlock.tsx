import { SRCImage } from "react-datocms";
import { t } from "@lib/i18n";
import type { CaseBlockFragment } from "@lib/types/datocms";

import { Button } from "@components/Button";
import { Card, CardContent, CardFooter, CardImage } from "@components/Card";
import { Heading } from "@components/Heading";
import { Tag, TagList } from "@components/Tag";
import { Text } from "@components/Text";

export interface Props {
  block: CaseBlockFragment;
}

export const CaseBlock = ({ block }: Props) => {
  return (
    <Card>
      {block.image.responsiveImage && (
        <CardImage>
          <SRCImage data={block.image.responsiveImage} />
        </CardImage>
      )}
      <CardContent>
        <TagList>
          {block.expertiseTags.map(({ label }) => (
            <Tag key={label}>{label}</Tag>
          ))}
        </TagList>
        <Heading level={3} displayLevel={4}>{block.title}</Heading>
        <Text variant="subtext">{block.customer}</Text>
      </CardContent>
      {block.link && (
        <CardFooter>
          <Button
            as="a"
            href={block.link}
            height="narrow"
            icon="arrow-right"
            level="secondary"
            variant="large"
          >
            {t("read_more_on_our_site")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
