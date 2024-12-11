import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update environment\'s settings');

  await client.site.update({ favicon: null });

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Modular Content (Single block) field "Header" (`header`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.create('T5DMLHeUTF2ub3p2Wx-CBw', {
    id: 'R6oRJIHjTOOHbvy8riiTgQ',
    label: 'Header',
    field_type: 'single_block',
    api_key: 'header',
    validators: {
      single_block_blocks: { item_types: ['HqRofhCbQKGKdMNb7eawoQ'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('R6oRJIHjTOOHbvy8riiTgQ', { position: 2 });

  console.log(
    'Update Slug field "Slug" (`slug`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Qjdkt8aORUOQRCZicWpsMA', { position: 3 });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Q-z1nyMsQtC8Sr6w6J2oGw', {
    validators: {
      rich_text_blocks: { item_types: ['PAk40zGjQJCcDXXPgygUrA'] },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Contact" (`contact`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('EagEZc6jRu-xvc3vmrbaHA', {
    validators: {
      rich_text_blocks: { item_types: ['Hwfbdgu_TMqmzK2i0-xmXg'] },
      size: { min: 1 },
    },
  });

  console.log(
    'Update Structured text field "Subtitle" (`subtitle`) in block model "Page header" (`page_header`)',
  );
  await client.fields.update('ca9s1pTRQMGMtpxhEVGYqg', {
    validators: {
      structured_text_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['AUh1SEj_Tz2rbRMfJ2RfrQ'],
      },
    },
  });
}
