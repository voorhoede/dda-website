import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { ImageParade, ImageParadeItem } from '@components/ImageParade';
import type { PartnerLogoFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';
import './PartnerBanner.css';
import { t } from '@lib/i18n';

export const PartnerBanner = ({
  partners,
}: {
  partners: PartnerLogoFragment[];
}) => {
  return (
    <section>
      <div className="partner-banner__content">
        <Heading displayLevel={4} level={2}>
          {t('become_a_partner_cta_body')}
        </Heading>
        <Button icon="arrow-right">{t('become_a_partner_cta_label')}</Button>
      </div>
      {partners.length >= 8 && (
        <ImageParade direction="right">
          {partners.map(
            (partner) =>
              partner.logo.responsiveImage && (
                <ImageParadeItem key={partner.logo.id}>
                  <SRCImage
                    data={partner.logo.responsiveImage}
                    // disable placeholder for logo
                    // since its background can be transparent,
                    // causing placeholder to be visible after loading
                    usePlaceholder={false}
                  />
                </ImageParadeItem>
              ),
          )}
        </ImageParade>
      )}
    </section>
  );
};
