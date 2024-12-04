import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Modular Content (Single block) field "Content" (`content`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'L67o_Iy4TPyLPxL05xpTzg',
    label: 'Content',
    field_type: 'single_block',
    api_key: 'content',
    validators: {
      single_block_blocks: { item_types: ['PAk40zGjQJCcDXXPgygUrA'] },
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Structured text field "Content" (`content`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.destroy('G0WEoKvvR5CrxssDg3esmg');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Slug field "Slug" (`slug`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.update('QBK0RhdqQxiS0cRjWMOT9w', { position: 2 });
}
