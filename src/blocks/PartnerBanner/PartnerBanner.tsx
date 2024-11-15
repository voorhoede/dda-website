import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { ImageParade, ImageParadeItem } from '@components/ImageParade';
import type { MemberLogoFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';
import './PartnerBanner.css';

export const PartnerBanner = ({
  partners,
}: {
  partners: MemberLogoFragment[];
}) => {
  return (
    <section>
      <div className="partner-banner__content">
        <Heading displayLevel={4} level={2}>
          Wij bedanken onze trouwe partners
        </Heading>
        <Button icon="arrow-right">Word partner</Button>
      </div>
      <ImageParade direction="right">
        {partners.map(
          (member) =>
            member.logo?.responsiveImage && (
              <ImageParadeItem>
                <SRCImage data={member.logo?.responsiveImage} />
              </ImageParadeItem>
            ),
        )}
      </ImageParade>
    </section>
  );
};
