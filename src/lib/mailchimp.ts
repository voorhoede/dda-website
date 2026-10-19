import { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID } from 'astro:env/server';

export type SubscribeResult = 'subscribed' | 'rejected' | 'failed';

type MailchimpError = {
  title?: string;
};

const VISITOR_ERROR_TITLES = ['Invalid Resource', 'Forgotten Email Not Subscribed'];

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  let response: Response;
  try {
    response = await fetch(
      `https://api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'pending' }),
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch (error) {
    console.error('Mailchimp could not be reached', error);
    return 'failed';
  }

  if (response.ok) {
    return 'subscribed';
  }

  const { title } = await response.json().catch(() => ({})) as MailchimpError;

  if (response.status === 400 && title === 'Member Exists') {
    return 'subscribed';
  }

  if (response.status === 400 && title && VISITOR_ERROR_TITLES.includes(title)) {
    return 'rejected';
  }

  console.error('Mailchimp responded with status', response.status, title);
  return 'failed';
}
