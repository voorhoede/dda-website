import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { convert } from 'html-to-text';
import { SCW_SECRET_KEY, SCW_PROJECT_ID } from 'astro:env/server';

const SCALEWAY_ENDPOINT =
  'https://api.scaleway.com/transactional-email/v1alpha1/regions/fr-par/emails';

export type EmailAddress = {
  name: string;
  email: string;
};

export type Attachment = {
  name: string;
  type: string;
  content: string;
};

export type AdditionalHeader = {
  key: string;
  value: string;
};

export type Email = {
  from: EmailAddress;
  to: EmailAddress[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  additional_headers?: AdditionalHeader[];
};

export function fillTemplate(template: string, data: Record<string, string | null>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => data[key] ?? `{{ ${key} }}`);
}

export function renderEmailTemplate<T extends object>(
  component: React.ComponentType<T>,
  props: T,
  templateVars: Record<string, string | null>,
): { html: string; text: string } {
  const rawHtml = '<!doctype html>' + renderToString(createElement(component, props));
  const html = fillTemplate(rawHtml, templateVars);
  const text = convert(html, { wordwrap: 80 });
  return { html, text };
}

export async function sendEmail(email: Email) {
  return await fetch(SCALEWAY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': SCW_SECRET_KEY,
    },
    body: JSON.stringify({ ...email, project_id: SCW_PROJECT_ID }),
  });
}
