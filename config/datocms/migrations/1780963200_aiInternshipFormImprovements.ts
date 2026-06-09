import { Client } from '@datocms/cli/lib/cma-client-node';

const AGENCY_TEMPLATE_ID = 'Ouf7UaxtSv2OZbI7Phzg8w';
const CONFIRMATION_TEMPLATE_ID = 'Gg-2ARjcSxm448j1drIPmA';

type DastSpan = { type: 'span'; value: string; [key: string]: unknown };
type DastNode = { type: string; children?: DastNode[]; [key: string]: unknown };

/** Build a simple paragraph node for a structured-text (DAST) document. */
function paragraph(value: string): DastNode {
  return { type: 'paragraph', children: [{ type: 'span', value }] };
}

/** Concatenate all span values within a node so we can search for placeholders. */
function nodeText(node: DastNode): string {
  if (!node.children) return '';
  return node.children
    .map((child) =>
      'value' in child
        ? (child as unknown as DastSpan).value
        : nodeText(child),
    )
    .join('');
}

/** True when any node in the document already contains the given placeholder. */
function documentContains(document: DastNode, needle: string): boolean {
  return (document.children ?? []).some((node) => nodeText(node).includes(needle));
}

export default async function (client: Client) {
  // 1. Add the "open_question" translation used by the application form.
  console.log('Ensure translation "open_question" exists');
  const existingTranslations = await client.items.list({
    filter: { type: 'translation', fields: { key: { eq: 'open_question' } } },
  });

  if (existingTranslations.length === 0) {
    const translationModel = await client.itemTypes.find('translation');
    await client.items.create({
      item_type: { type: 'item_type', id: translationModel.id },
      key: 'open_question',
      value: { nl: 'Wil je nog iets kwijt?' },
    });
  } else {
    console.log('Translation "open_question" already exists, skipping');
  }

  // 2. Agency email: surface the vacancy name (subject + body) and the open question.
  console.log('Update agency email template');
  const agency = await client.items.find(AGENCY_TEMPLATE_ID, { nested: true });
  const agencySubject = agency.subject as { nl: string };
  const agencyBody = agency.body as { nl: { schema: string; document: DastNode } };
  let agencyChanged = false;

  if (!agencySubject.nl.includes('{{ internship_title }}')) {
    agencySubject.nl = 'Nieuwe sollicitatie voor de AI stage: {{ internship_title }}';
    agencyChanged = true;
  }

  if (!documentContains(agencyBody.nl.document, '{{ internship_title }}')) {
    // Insert the vacancy line right after the first heading.
    const children = agencyBody.nl.document.children ?? [];
    const headingIndex = children.findIndex((node) => node.type === 'heading');
    children.splice(headingIndex + 1, 0, paragraph('Vacature: {{ internship_title }}'));
    agencyBody.nl.document.children = children;
    agencyChanged = true;
  }

  if (!documentContains(agencyBody.nl.document, '{{ message }}')) {
    (agencyBody.nl.document.children ??= []).push(paragraph('Bericht: {{ message }}'));
    agencyChanged = true;
  }

  if (agencyChanged) {
    await client.items.update(AGENCY_TEMPLATE_ID, {
      subject: agencySubject,
      body: agencyBody,
    });
    await client.items.publish(AGENCY_TEMPLATE_ID);
  } else {
    console.log('Agency email template already up to date, skipping');
  }

  // 3. Confirmation email: include the open question answer.
  console.log('Update confirmation email template');
  const confirmation = await client.items.find(CONFIRMATION_TEMPLATE_ID, { nested: true });
  const confirmationBody = confirmation.body as {
    nl: { schema: string; document: DastNode };
  };

  if (!documentContains(confirmationBody.nl.document, '{{ message }}')) {
    const children = confirmationBody.nl.document.children ?? [];
    const portfolioIndex = children.findIndex((node) =>
      nodeText(node).includes('{{ portfolio }}'),
    );
    const insertAt = portfolioIndex === -1 ? children.length : portfolioIndex + 1;
    children.splice(insertAt, 0, paragraph('Bericht: {{ message }}'));
    confirmationBody.nl.document.children = children;

    await client.items.update(CONFIRMATION_TEMPLATE_ID, { body: confirmationBody });
    await client.items.publish(CONFIRMATION_TEMPLATE_ID);
  } else {
    console.log('Confirmation email template already up to date, skipping');
  }
}
