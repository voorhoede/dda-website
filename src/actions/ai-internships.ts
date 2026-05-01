import { ActionError, defineAction } from 'astro:actions';
import { TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { sendEmail, renderEmailTemplate, fillTemplate } from '@lib/transactional-emails';
import { getEntry } from 'astro:content';
import { AiInternshipEmail } from '@root/src/email-templates';

const aiInternships = {
  submitApplication: defineAction({
    accept: 'form',
    input: z.object({
      'record-id': z.string(),
      'record-title': z.string(),
      'member-name': z.string(),
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

      const [agencyEntry, confirmationEntry] = await Promise.all([
        getEntry('emailTemplates', 'Ouf7UaxtSv2OZbI7Phzg8w'),
        getEntry('emailTemplates', 'Gg-2ARjcSxm448j1drIPmA'),
      ]);

      if (!agencyEntry || !confirmationEntry) {
        throw new ActionError({ code: 'NOT_FOUND' });
      }

      const templateData = {
        name: input.name,
        internship_title: input['record-title'],
        member_name: input['member-name'],
        email: input.email,
        phone: input.phone,
        track: input.track,
        institution: input.institution,
        linkedin: input.linkedin || 'N/A',
        portfolio: input.portfolio || 'N/A',
      };

      const agencyEmail = renderEmailTemplate(AiInternshipEmail, agencyEntry.data, templateData);
      const confirmationEmail = renderEmailTemplate(AiInternshipEmail, confirmationEntry.data, templateData);

      const [agencyResponse, confirmationResponse] = await Promise.all([
        sendEmail({
          from: { name: agencyEntry.data.fromName, email: agencyEntry.data.fromEmailAddress },
          to: [{ name: input['to-name'], email: input['to-email'] }],
          subject: agencyEntry.data.subject,
          ...agencyEmail,
        }),
        sendEmail({
          from: { name: confirmationEntry.data.fromName, email: confirmationEntry.data.fromEmailAddress },
          to: [{ name: input.name, email: input.email }],
          subject: fillTemplate(confirmationEntry.data.subject, templateData),
          ...confirmationEmail,
        }),
      ]);

      if (!agencyResponse.ok || !confirmationResponse.ok) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to send email' });
      }
    },
  }),
};

export default aiInternships;
