import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Column, Grid } from '@components/Grid';
import { Text } from '@components/Text';
import type { MemberLogoFragment } from '@lib/types/datocms';
import type { ResponsiveSpan } from '@components/Grid/Column';
import { MemberLogo } from '@blocks/MemberLogo';
import './CtaBanner.css';

interface CtaBannerProps {
  members: MemberLogoFragment[];
  message: string;
}

const logoSpanConfig = {
  mobile: 4,
  desktop: 3,
} as ResponsiveSpan;

export const CtaBanner = ({
  members,
  children,
  message,
}: PropsWithChildren<CtaBannerProps>) => {
  const start = members.slice(0, 4);
  const middle = members.slice(4, 6);
  const end = members.slice(6);

  return (
    <Grid as="section" border>
      <Column
        span={{
          mobile: 12,
          desktop: 6,
        }}
      >
        <Grid border className="cta-banner__logos">
          {start.map(
            (member, index) =>
              member.logo?.responsiveImage && (
                <Column
                  key={member.logo.id}
                  span={logoSpanConfig}
                  className={clsx({
                    'cta-banner__logo--large-screen-only': index === 3,
                  })}
                >
                  <MemberLogo {...member} />
                </Column>
              ),
          )}

          <Column
            key={middle[0]?.logo?.id}
            span={logoSpanConfig}
            className="cta-banner__logo--large-screen-only"
          >
            {middle[0]?.logo?.responsiveImage && <MemberLogo {...middle[0]} />}
          </Column>

          <Column
            span={{
              mobile: 12,
              desktop: 6,
            }}
            className="cta-banner__message"
          >
            <Text className="cta-banner__message-text">{message}</Text>
          </Column>

          <Column
            key={middle[1]?.logo?.id}
            span={logoSpanConfig}
            className="cta-banner__logo--large-screen-only"
          >
            {middle[1]?.logo?.responsiveImage && <MemberLogo {...middle[1]} />}
          </Column>

          {end.map(
            (member, index) =>
              member.logo?.responsiveImage && (
                <Column
                  key={member.logo.id}
                  span={logoSpanConfig}
                  className={clsx({
                    'cta-banner__logo--large-screen-only': index === 3,
                  })}
                >
                  <MemberLogo {...member} />
                </Column>
              ),
          )}
        </Grid>
      </Column>
      <Column
        span={{
          mobile: 12,
          desktop: 6,
        }}
        className="cta-banner__content"
      >
        {children}
      </Column>
    </Grid>
  );
};
