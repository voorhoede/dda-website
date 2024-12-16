import { t } from "@lib/i18n";
import type { ContactBlockFragment } from "@lib/types/datocms";

import "./ContactBlock.css";

export interface Props {
  block: ContactBlockFragment;
}

export const ContactBlock = ({ block }: Props) => {
  return (
    <section>
      <h3 className="a11y-sr-only">{ block.title }</h3>
      <address className="contact-block">
        <a className="text-semibold" href={block.website as string} aria-label={t('visit_agency_website', { agency: block.title })}>{block.title}</a>
        <p className="contact-block__address">
          {block.streetAddress}
          <br />
          {block.postalCode} {block.city}
        </p>
        <a href={`mailto:${block.email}`}>{block.email}</a>
        <a href={`tel:${block.phone}`}>{block.phone}</a>
      </address>
    </section>
  );
};
