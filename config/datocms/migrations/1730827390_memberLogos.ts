import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83D\uDCC1 Member" (`member`)');
  await client.itemTypes.create(
    {
      id: 'ByoMKdCkSp6T10UjQm26wg',
      name: '\uD83D\uDCC1 Member',
      api_key: 'member',
      all_locales_required: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'BNNlRVFTRZ6d__G1s8NLtA',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single asset field "Logo" (`logo`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'aGzxIk2HS02Dibb-VW-YqA',
    label: 'Logo',
    field_type: 'file',
    api_key: 'logo',
    validators: {
      extension: { extensions: [], predefined_list: 'image' },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Color field "Brand color" (`brand_color`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'Sld2KBRNRz6uIqB401jlPQ',
    label: 'Brand color',
    field_type: 'color',
    api_key: 'brand_color',
    appearance: {
      addons: [],
      editor: 'color_picker',
      parameters: { enable_alpha: false, preset_colors: [] },
    },
    default_value: null,
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCC1 Member" (`member`)');
  await client.itemTypes.update('ByoMKdCkSp6T10UjQm26wg', {
    image_preview_field: { id: 'aGzxIk2HS02Dibb-VW-YqA', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.create({
    id: 'JEi1uOnCR-O7eIx35FRbwA',
    label: '\uD83D\uDCC1 Members',
    item_type: { id: 'ByoMKdCkSp6T10UjQm26wg', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', { position: 7 });
}
