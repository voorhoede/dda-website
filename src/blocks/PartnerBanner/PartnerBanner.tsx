import { SRCImage } from 'react-datocms';
import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { ImageParade, ImageParadeItem } from '@components/ImageParade';
import { getEventUrl } from '@blocks/EventCard/EventCard';
import type {
  EventCardFragment,
  PartnerLogoFragment,
} from '@lib/types/datocms';
import { t } from '@lib/i18n';
import './PartnerBanner.css';

function getPartnerUrl(partner: PartnerLogoFragment): string {
  if (partner.page?.__typename === 'ExternalLinkRecord') {
    return partner.page.url ?? '';
  }

  if (partner.page?.__typename === 'PageRecord') {
    return `/${partner.page?.slug}/`;
  }

  if (partner.page?.__typename === 'EventRecord') {
    return getEventUrl(partner.page as EventCardFragment);
  }

  return '';
}

function getPartnerTarget(partner: PartnerLogoFragment): string | undefined {
  if (partner.page?.__typename === 'ExternalLinkRecord') {
    return '_blank';
  }

  return undefined;
}

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
        <Button
          as="a"
          icon="arrow-right"
          href="mailto:info@dutchdigitalagencies.com"
        >
          {t('become_a_partner_cta_label')}
        </Button>
      </div>
      <ImageParade direction="right">
        {partners.map(
          (partner) =>
            partner.logo.responsiveImage && (
              <ImageParadeItem key={partner.logo.id}>
                <a
                  href={getPartnerUrl(partner)}
                  target={getPartnerTarget(partner)}
                  className="partner-banner__logo"
                >
                  <SRCImage
                    data={partner.logo.responsiveImage}
                    // disable placeholder for logo
                    // since its background can be transparent,
                    // causing placeholder to be visible after loading
                    usePlaceholder={false}
                    priority={true}
                  />
                </a>
              </ImageParadeItem>
            ),
        )}
      </ImageParade>
    </section>
  );
};
