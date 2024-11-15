import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { ImageParade, ImageParadeItem } from '@components/ImageParade';
import type { PartnerLogoFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';
import './PartnerBanner.css';

export const PartnerBanner = ({
  partners,
}: {
  partners: PartnerLogoFragment[];
}) => {
  return (
    <section>
      <div className="partner-banner__content">
        <Heading displayLevel={4} level={2}>
          Wij bedanken onze trouwe partners
        </Heading>
        <Button icon="arrow-right">Word partner</Button>
      </div>
      {partners.length >= 8 && (
        <ImageParade direction="right">
          {partners.map(
            (partner) =>
              partner.logo.responsiveImage && (
                <ImageParadeItem key={partner.logo.id}>
                  <SRCImage data={partner.logo.responsiveImage} />
                </ImageParadeItem>
              ),
          )}
        </ImageParade>
      )}
    </section>
  );
};
