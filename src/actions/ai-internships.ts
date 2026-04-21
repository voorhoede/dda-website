import { ActionError, defineAction } from 'astro:actions';
import { TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { z } from 'astro/zod';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { sendEmail } from '@lib/transactional-emails';
import { getEntry } from 'astro:content';
import { convert } from 'html-to-text';
import { AiInternshipEmail } from '@root/src/email-templates';

// IDs of the email templates managed in DatoCMS (EmailTemplate records).
const COMPANY_EMAIL_TEMPLATE_ID = 'dJqC6Ve3RTivHdA8es2t6A';
const APPLICANT_EMAIL_TEMPLATE_ID = 'applicant-confirmation';

const fillTemplate = (template: string, data: Record<string, string | null>): string => {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => data[key] ?? `{{ ${key} }}`);
};

type RenderedTemplate = {
  fromName: string;
  fromEmailAddress: string;
  subject: string;
  html: string;
  text: string;
};

const renderTemplate = async (
  templateId: string,
  data: Record<string, string | null>,
): Promise<RenderedTemplate | null> => {
  const entry = await getEntry('emailTemplates', templateId);

  if (!entry) {
    return null;
  }

  const html = renderToString(createElement(AiInternshipEmail, { ...entry.data }));
  const filledHtml = fillTemplate(html, data);
  const filledText = convert(filledHtml, { wordwrap: 80 });
  const { fromName, fromEmailAddress, subject } = entry.data;

  return {
    fromName,
    fromEmailAddress,
    subject: fillTemplate(subject, data),
    html: filledHtml,
    text: filledText,
  };
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

      const templateData: Record<string, string | null> = {
        name: input.name,
        internship_title: input['record-title'],
        company_name: input['to-name'],
        email: input.email,
        phone: input.phone,
        track: input.track,
        institution: input.institution,
        linkedin: input.linkedin || 'N/A',
        portfolio: input.portfolio || 'N/A',
      };

      const companyTemplate = await renderTemplate(COMPANY_EMAIL_TEMPLATE_ID, templateData);

      if (!companyTemplate) {
        throw new ActionError({ code: 'NOT_FOUND' });
      }

      const companyResponse = await sendEmail({
        from: { name: companyTemplate.fromName, email: companyTemplate.fromEmailAddress },
        to: [{ name: input['to-name'], email: input['to-email'] }],
        subject: companyTemplate.subject,
        text: companyTemplate.text,
        html: companyTemplate.html,
      });

      if (!companyResponse.ok) {
        throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to send email' });
      }

      // Send confirmation email to the applicant. If the applicant template
      // record is not (yet) configured in DatoCMS, fail silently so the
      // primary application flow still succeeds.
      const applicantTemplate = await renderTemplate(APPLICANT_EMAIL_TEMPLATE_ID, templateData);

      if (applicantTemplate) {
        const applicantResponse = await sendEmail({
          from: { name: applicantTemplate.fromName, email: applicantTemplate.fromEmailAddress },
          to: [{ name: input.name, email: input.email }],
          subject: applicantTemplate.subject,
          text: applicantTemplate.text,
          html: applicantTemplate.html,
        });

        if (!applicantResponse.ok) {
          console.error(
            `Failed to send applicant confirmation email (status ${applicantResponse.status} ${applicantResponse.statusText})`,
          );
        }
      } else {
        console.warn(
          `Applicant confirmation email template (id: ${APPLICANT_EMAIL_TEMPLATE_ID}) not found in DatoCMS; skipping.`,
        );
      }
    },
  }),
};

export default aiInternships;
