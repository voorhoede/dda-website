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
