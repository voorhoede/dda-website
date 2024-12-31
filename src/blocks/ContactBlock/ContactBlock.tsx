import type { ContactBlockFragment } from '@lib/types/datocms';

import clsx from 'clsx';
import parsePhoneNumber from 'libphonenumber-js';
import { t } from '@lib/i18n';

import './ContactBlock.css';

export interface Props {
  block: ContactBlockFragment;
}

export const ContactBlock = ({ block }: Props) => {
  const phoneNumber = parsePhoneNumber(block.phone as string);

  return (
    <section className='contact-block'>
      <h3 className={clsx(['contact-block__title', { 'a11y-sr-only': block.website }])}>{block.title}</h3>
      <address className="contact-block__body">
        {block.website && (
          <a
            className="text-semibold"
            href={block.website as string}
            target="_blank"
            aria-label={t('visit_agency_website', { agency: block.title })}
          >
            {block.title}
          </a>
        )}
        {block.streetAddress && (
          <p className="contact-address-line">
            {block.streetAddress}
            <br />
            {block.postalCode} {block.city}
          </p>
        )}
        {block.email && <a href={`mailto:${block.email}`}>{block.email}</a>}
        {phoneNumber && (
          <a href={phoneNumber.getURI()}>{phoneNumber.formatInternational()}</a>
        )}
      </address>
    </section>
  );
};
