import type { TeamMemberCardFragment } from "@lib/types/datocms";
import { SRCImage } from "react-datocms";
import { Card, CardContent, CardFooter, CardImage } from "@components/Card";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { Button } from "@components/Button";

interface Props {
  member: TeamMemberCardFragment;
}

export const TeamMemberCard = ({ member }: Props) => {
  return (
    <Card>
      <CardImage>
        <SRCImage data={member.image?.responsiveImage} />
      </CardImage>

      <CardContent>
        <Heading level={3} displayLevel={4}>
          {member.name}
        </Heading>
        <Text variant="subtext">{member.role}</Text>
      </CardContent>
      <CardFooter>
        <Button
          as="a"
          href={member.linkedinLink as string}
          target="_blank"
          height="narrow"
          icon="arrow-up-right"
          level="secondary"
          variant="large"
          targetArea="parent"
        >
          LinkedIn
        </Button>
        <Button
          as="a"
          href={`mailto:${member.email}`}
          target="_blank"
          height="narrow"
          icon="arrow-up-right"
          level="secondary"
          variant="large"
        >
          E-mail
        </Button>
      </CardFooter>
    </Card>
  );
};
