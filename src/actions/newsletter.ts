import { ActionError, defineAction } from 'astro:actions';
import {
  TURNSTILE_SECRET_KEY,
  TURNSTILE_NEWSLETTER_SECRET_KEY,
} from 'astro:env/server';
import { MAILCHIMP_FORM_URL, MAILCHIMP_HONEYPOT_ID } from 'astro:env/client';
import { z } from 'astro/zod';
import { verifyTurnstile } from '@lib/turnstile';

const isMailchimpUrl = (value: string) => {
  try {
    const { protocol, hostname } = new URL(value);
    return protocol === 'https:' && hostname.endsWith('.list-manage.com');
  } catch {
    return false;
  }
};

const newsletter = {
  subscribe: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      'mailchimp-form-url': z
        .string()
        .url()
        .refine(isMailchimpUrl, { message: 'Invalid Mailchimp form URL' })
        .optional(),
      'mailchimp-honeypot-id': z.string().optional().nullable(),
      'cf-turnstile-response': z.string().min(1),
    }),
    handler: async (input) => {
      const secret = TURNSTILE_NEWSLETTER_SECRET_KEY || TURNSTILE_SECRET_KEY;
      const isValid = await verifyTurnstile(input['cf-turnstile-response'], secret);

      if (!isValid) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Turnstile validation failed' });
      }

      const formUrl = input['mailchimp-form-url'] || MAILCHIMP_FORM_URL;
      const honeypotId = input['mailchimp-honeypot-id'] || MAILCHIMP_HONEYPOT_ID;

      // The list-manage `post-json` endpoint only returns JSON when given a
      // JSONP callback (`c`) — without it Mailchimp serves an HTML page. It
      // has no CORS, so it can only be called server-side.
      const subscribeUrl = new URL(formUrl.replace('/subscribe/post', '/subscribe/post-json'));
      subscribeUrl.searchParams.set('c', 'jsonp');
      subscribeUrl.searchParams.set('EMAIL', input.email);
      if (honeypotId) {
        subscribeUrl.searchParams.set(honeypotId, '');
      }

      const mailchimpResponse = await fetch(subscribeUrl.toString(), {
        headers: { Accept: 'application/json' },
      });

      if (!mailchimpResponse.ok) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to reach Mailchimp' });
      }

      // Strip any JSONP wrapper Mailchimp may add (e.g. `callback({...})`).
      const text = await mailchimpResponse.text();
      const { result, msg } = JSON.parse(
        text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1),
      ) as { result: 'success' | 'error'; msg: string };

      return {
        success: result === 'success',
        message: msg,
      };
    },
  }),
};

export default newsletter;
