import { type FormEvent, useRef, useState } from 'react';
import { actions } from 'astro:actions';
import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import { TurnstileWidget } from '@components/TurnstileWidget';
import './NewsLetterForm.css';
import { TextField } from '@components/Forms';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const NewsLetterForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    const { data, error } = await actions.newsletter.subscribe(
      new FormData(event.currentTarget),
    );

    setStatus(!error && data.success ? 'success' : 'error');
    requestAnimationFrame(() => statusRef.current?.focus());
  };
  if (status === 'success') {
    return (
      <section className="newsletter-form">
        <div
          ref={statusRef}
          className="newsletter-form__status"
          role="status"
          tabIndex={-1}
        >
          <Text>{t('newsletter_success')}</Text>
        </div>
      </section>
    );
  }

  return (
    <section className="newsletter-form">
      <Heading displayLevel={4} level={2}>
        {t('subscribe_to_newsletter')}
      </Heading>

      <form
        className="newsletter-form__form"
        method="post"
        onSubmit={handleSubmit}
      >
        <TextField
          label={t('email_address')}
          name="email"
          labelStyle="float"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />

        <TurnstileWidget action="newsletter" appearance="interaction-only" />

        <Button
          icon="arrow-right"
          type="submit"
          loading={status === 'submitting'}
        >
          {status === 'submitting' ? t('sending') : t('subscribe')}
        </Button>
      </form>

      {status === 'error' && (
        <div
          ref={statusRef}
          className="newsletter-form__status newsletter-form__status--error"
          role="alert"
          tabIndex={-1}
        >
          <Text>{t('form_error')}</Text>
        </div>
      )}
    </section>
  );
};
