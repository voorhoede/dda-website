import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { subscribeToNewsletter } from '@lib/mailchimp';
import { verifyTurnstile } from '@lib/turnstile';

const newsletter = {
  subscribe: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      'cf-turnstile-response': z.string().min(1),
    }),
    handler: async (input) => {
      const isValid = await verifyTurnstile(input['cf-turnstile-response'], 'newsletter');

      if (!isValid) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Turnstile validation failed' });
      }

      const result = await subscribeToNewsletter(input.email);

      if (result === 'failed') {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to subscribe to the newsletter' });
      }

      return { success: result === 'subscribed' };
    },
  }),
};

export default newsletter;
