import type { CollectionEntry } from 'astro:content';
import { StructuredText } from 'react-datocms';

type EmailTemplateData = CollectionEntry<'emailTemplates'>['data'];

export const AiInternshipEmail = ({ title, body }: EmailTemplateData) => {
  return (
    <>
      {'<!doctype html>'}
      <html lang="nl">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
        </head>
        <body>
          <StructuredText data={body} />
        </body>
      </html>
    </>
  );
};
