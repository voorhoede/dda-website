import { type FormEvent, useRef, useState } from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { Form, TextField } from '@components/Forms';
import { t } from '@lib/i18n';

import './AiInternshipForm.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  recordId: string;
  recordTitle: string;
  toName: string;
  toEmail: string;
};

export const AiInternshipForm = ({
  recordId,
  recordTitle,
  toName,
  toEmail,
}: Props) => {
  const [status, setStatus] = useState<Status>('idle');
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    const { currentTarget } = event;

    try {
      const response = await fetch(currentTarget.action, {
        method: currentTarget.method,
        body: new FormData(currentTarget),
      });

      if (!response.ok) {
        setStatus('error');
        requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }

      setStatus('success');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus('error');
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  };

  const isSubmitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className="ai-internship-form__success"
        role="status"
        tabIndex={-1}
      >
        <Text>{t('form_success_description')}</Text>
        <div>
          <Button icon="arrow-right" onClick={() => setStatus('idle')}>
            {t('new_application')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-internship-form">
      {status === 'error' && (
        <div
          ref={errorRef}
          className="ai-internship-form__alert"
          role="alert"
          tabIndex={-1}
        >
          <Text>{t('form_error')}</Text>
          <div>
            <Button level="secondary" icon="arrow-right" onClick={() => setStatus('idle')}>
              {t('try_again')}
            </Button>
          </div>
        </div>
      )}

      <Form
        action="/api/ai-stages"
        method="POST"
        onSubmit={handleSubmit}
        submitButton={
          <Button
            type="submit"
            icon="arrow-right"
            loading={isSubmitting}
          >
            {isSubmitting ? t('sending') : t('send')}
          </Button>
        }
        turnstile={true}
      >
        <input type="hidden" name="record-id" value={recordId} />
        <input type="hidden" name="record-title" value={recordTitle} />
        <input type="hidden" name="to-name" value={toName} />
        <input type="hidden" name="to-email" value={toEmail} />
        <TextField
          name="name"
          label={`${t('name')}*`}
          required
          autoComplete="name"
        />
        <TextField
          name="email"
          label={`${t('email_address')}*`}
          type="email"
          required
          autoComplete="email"
        />
        <TextField
          name="phone"
          label={`${t('phone_number')}*`}
          type="tel"
          required
          autoComplete="tel"
        />
        <TextField
          name="track"
          label={`${t('track')}*`}
          type="text"
          required
          autoComplete="off"
        />
        <TextField
          name="institution"
          label={`${t('institution')}*`}
          type="text"
          required
          autoComplete="off"
        />
        <TextField
          name="linkedin"
          label={`${t('linkedin_profile')} (URL)`}
          type="url"
          autoComplete="off"
        />
        <TextField
          name="portfolio"
          label={`${t('portfolio_link')} (URL)`}
          type="url"
          autoComplete="off"
        />
      </Form>

      <div className="a11y-sr-only" aria-live="polite">
        {isSubmitting ? t('sending') : ''}
      </div>
    </div>
  );
};
