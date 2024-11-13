import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83D\uDCF0 News" (`news`)');
  await client.itemTypes.create(
    {
      id: 'Wo2OFS4fSQaxAIeWkOI_-g',
      name: '\uD83D\uDCF0 News',
      api_key: 'news',
      draft_mode_active: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: true,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'U4uI92OnSDy1-_Acivx0yA',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDCF0 News" (`news`)',
  );
  await client.fields.create('Wo2OFS4fSQaxAIeWkOI_-g', {
    id: 'dPVECs51T6-bjktgNJgLFA',
    label: 'Title',
    field_type: 'string',
    api_key: 'title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: true, placeholder: null },
      type: 'title',
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Single asset field "Image" (`image`) in model "\uD83D\uDCF0 News" (`news`)',
  );
  await client.fields.create('Wo2OFS4fSQaxAIeWkOI_-g', {
    id: 'U_ObJB5bR72BTx9ZJGnGew',
    label: 'Image',
    field_type: 'file',
    api_key: 'image',
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: 'image' },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Location" (`location`) in model "\uD83D\uDCF0 News" (`news`)',
  );
  await client.fields.create('Wo2OFS4fSQaxAIeWkOI_-g', {
    id: 'NXu_AvLAQxq-j3razXyGWw',
    label: 'Location',
    field_type: 'string',
    api_key: 'location',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Single-line string field "Labels" (`labels`) in model "\uD83D\uDCF0 News" (`news`)',
  );
  await client.fields.create('Wo2OFS4fSQaxAIeWkOI_-g', {
    id: 'JYcPdMbOQNOMcwXX0xdaZA',
    label: 'Labels',
    field_type: 'string',
    api_key: 'labels',
    localized: true,
    validators: {
      format: {
        custom_pattern: '^([^,]+)\\s*(?:,\\s*([^,]+)\\s*)*$',
        description:
          'A comma-separated list of labels (e.g., label1, label2, label3).',
      },
    },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Location" (`location`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.update('XjLghLzMQUOXjuG4DMEyBA', {
    localized: true,
    validators: {},
    default_value: { nl: '' },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCF0 News" (`news`)');
  await client.itemTypes.update('Wo2OFS4fSQaxAIeWkOI_-g', {
    title_field: { id: 'dPVECs51T6-bjktgNJgLFA', type: 'field' },
    image_preview_field: { id: 'U_ObJB5bR72BTx9ZJGnGew', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCF0 News"');
  await client.menuItems.create({
    id: 'ENGigSlBTcG98rKaD9Xl_Q',
    label: '\uD83D\uDCF0 News',
    item_type: { id: 'Wo2OFS4fSQaxAIeWkOI_-g', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDCF0 News"');
  await client.menuItems.update('ENGigSlBTcG98rKaD9Xl_Q', { position: 6 });
}
