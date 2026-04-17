import { ActionError, defineAction } from 'astro:actions';
import { TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { sendEmail } from '@lib/transactional-emails';
import { experimental_AstroContainer } from 'astro/container';
import { AiInternship } from '../email-templates';
import { getEntry } from 'astro:content';
import { convert } from 'html-to-text';

const fillTemplate = (template: string, data: Record<string, string | null>): string => {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => data[key] ?? `{{ ${key} }}`);
};

const aiInternships = {
  submitApplication: defineAction({
    accept: 'form',
    input: z.object({
      'record-id': z.string(),
      'record-title': z.string(),
      'to-name': z.string(),
      'to-email': z.string().email(),
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string(),
      track: z.string(),
      institution: z.string(),
      linkedin: z.string().url().or(z.literal('')).nullable(),
      portfolio: z.string().url().or(z.literal('')).nullable(),
      'cf-turnstile-response': z.string().min(1),
    }),
    handler: async (input) => {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: input['cf-turnstile-response'],
        }),
      });
      const turnstileResult = await turnstileResponse.json() as { success: boolean };

      if (!turnstileResult.success) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Turnstile validation failed' });
      }

      const entry = await getEntry('emailTemplates', 'dJqC6Ve3RTivHdA8es2t6A');
      
      if (!entry) {
        throw new ActionError({ code: 'NOT_FOUND' });
      }
      
      const container = await experimental_AstroContainer.create();
      const html = await container.renderToString(AiInternship, { props: entry.data });
      const filledHtml = fillTemplate(html, {
        name: input.name,
        internship_title: input['record-title'],
      });
      const filledText = convert(filledHtml, { wordwrap: 80 });
      
      const { fromName, fromEmailAddress, subject } = entry.data;
      
      const response = await sendEmail({
        from: { name: fromName, email: fromEmailAddress },
        to: [{ name: input['to-name'], email: input['to-email'] }],
        subject: subject,
        text: filledText,
        html: filledHtml,
      });

      if (!response.ok) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to send email' });
      }
    },
  }),
};

export default aiInternships;
