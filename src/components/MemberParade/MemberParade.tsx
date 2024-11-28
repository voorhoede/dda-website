import React from 'react';
import { ImageParade, ImageParadeItem } from '@components/ImageParade';
import { Grid, Column } from '@components/Grid';
import { MemberLogo } from '@blocks/MemberLogo';
import type { MemberLogoFragment } from '@lib/types/datocms';

interface Props {
  members: MemberLogoFragment[];
}

export const MemberParade: React.FC<Props> = ({ members }) => {
  const splitArray = (array: MemberLogoFragment[]) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];
  };

  const sections = splitArray(members);

  return (
    <Grid border={true}>
      {sections.map((section, index) => (
        <Column span={12} key={index}>
          <ImageParade direction={index === 0 ? 'left' : 'right'}>
            {section.map((member, memberIndex) => (
              <ImageParadeItem key={memberIndex}>
                <MemberLogo {...member} />
              </ImageParadeItem>
            ))}
          </ImageParade>
        </Column>
      ))}
    </Grid>
  );
};
