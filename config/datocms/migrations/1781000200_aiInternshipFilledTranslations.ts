import { Client } from '@datocms/cli/lib/cma-client-node';

const TRANSLATIONS: Record<string, string> = {
  internship_filled: 'Vervuld',
  internship_filled_message:
    'Deze AI stage is vervuld. Solliciteren is niet meer mogelijk.',
};

export default async function (client: Client) {
  const translationModel = await client.itemTypes.find('translation');

  for (const [key, value] of Object.entries(TRANSLATIONS)) {
    console.log(`Ensure translation "${key}" exists`);
    const existing = await client.items.list({
      filter: { type: 'translation', fields: { key: { eq: key } } },
    });

    if (existing.length === 0) {
      await client.items.create({
        item_type: { type: 'item_type', id: translationModel.id },
        key,
        value: { nl: value },
      });
    } else {
      console.log(`Translation "${key}" already exists, skipping`);
    }
  }
}
