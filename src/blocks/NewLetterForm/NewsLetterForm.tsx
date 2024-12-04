import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { t } from '@lib/i18n';
import { MAILCHIMP_FORM_URL, MAILCHIMP_HONEYPOT_ID } from 'astro:env/client';
import './NewsLetterForm.css';
import { TextField } from '@components/Forms';

export const NewsLetterForm = () => {
  return (
    <section className="newsletter-form">
      <Heading displayLevel={4} level={2}>
        {t('subscribe_to_newsletter')}
      </Heading>

      <form
        className="newsletter-form__form"
        action={MAILCHIMP_FORM_URL}
        method="post"
        target="_blank"
      >
        <TextField
          label={t('email_address')}
          name="EMAIL"
          id="email"
          labelStyle="float"
          defaultValue=""
          required
        />
        <div aria-hidden="true" className="a11y-sr-only">
          <input
            type="text"
            name={MAILCHIMP_HONEYPOT_ID}
            tabIndex={-1}
            defaultValue=""
          />
        </div>

        <Button icon="arrow-right" type="submit">
          {t('subscribe')}
        </Button>
      </form>
    </section>
  );
};
