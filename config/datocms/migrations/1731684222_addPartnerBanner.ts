import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83E\uDD1D Partner" (`partner`)');
  await client.itemTypes.create(
    {
      id: 'Ww4h9Q92Td6NzvxQHI6KUg',
      name: '\uD83E\uDD1D Partner',
      api_key: 'partner',
      all_locales_required: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'VXgXLXnQQryR3w_3j2prRw',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83E\uDD1D Partner" (`partner`)',
  );
  await client.fields.create('Ww4h9Q92Td6NzvxQHI6KUg', {
    id: 'IT5HmHseR62q0auAaVe4AQ',
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: true, placeholder: null },
      type: 'title',
    },
    default_value: '',
  });

  console.log(
    'Create Single asset field "Logo" (`logo`) in model "\uD83E\uDD1D Partner" (`partner`)',
  );
  await client.fields.create('Ww4h9Q92Td6NzvxQHI6KUg', {
    id: 'emNfRJRcTfaslx9GNMmB0g',
    label: 'Logo',
    field_type: 'file',
    api_key: 'logo',
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: 'image' },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83E\uDD1D Partner" (`partner`)');
  await client.itemTypes.update('Ww4h9Q92Td6NzvxQHI6KUg', {
    title_field: { id: 'IT5HmHseR62q0auAaVe4AQ', type: 'field' },
    image_preview_field: { id: 'emNfRJRcTfaslx9GNMmB0g', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83E\uDD1D Partners"');
  await client.menuItems.create({
    id: 'aZ2S1azHR7OKCbw-38uciw',
    label: '\uD83E\uDD1D Partners',
    item_type: { id: 'Ww4h9Q92Td6NzvxQHI6KUg', type: 'item_type' },
  });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Tags"');
  await client.menuItems.update('FM5AHAT2Sn6aGG_oHNCzRQ', { position: 12 });
}
