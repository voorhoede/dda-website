import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83D\uDCC6 Event" (`event`)');
  await client.itemTypes.create(
    {
      id: 'WsNJp5eaRz2-QZserzWOTw',
      name: '\uD83D\uDCC6 Event',
      api_key: 'event',
      draft_mode_active: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: true,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'ftWU2QLlQWqT1iDlqa39sA',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'CMsGaRVdRuiXswYcoKF_Cw',
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
    default_value: { en: '', nl: '' },
  });

  console.log(
    'Create Single asset field "Image" (`image`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'QCxjVCKkQN-WeeW-IkvPMg',
    label: 'Image',
    field_type: 'file',
    api_key: 'image',
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: 'image' },
      required_alt_title: { title: false, alt: true },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Date field "Date" (`date`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'ZVd_2vrpRre1mx23DlHHcg',
    label: 'Date',
    field_type: 'date',
    api_key: 'date',
    validators: { required: {} },
    appearance: { addons: [], editor: 'date_picker', parameters: {} },
    default_value: null,
  });

  console.log(
    'Create Single-line string field "Location" (`location`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'XjLghLzMQUOXjuG4DMEyBA',
    label: 'Location',
    field_type: 'string',
    api_key: 'location',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Labels" (`labels`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'Bu9IBXonTkS2My9sj3mlRg',
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
    default_value: { en: '', nl: '' },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCC6 Event" (`event`)');
  await client.itemTypes.update('WsNJp5eaRz2-QZserzWOTw', {
    title_field: { id: 'CMsGaRVdRuiXswYcoKF_Cw', type: 'field' },
    image_preview_field: { id: 'QCxjVCKkQN-WeeW-IkvPMg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.create({
    id: 'bJawhQc0QcujPnfqqTAawQ',
    label: '\uD83D\uDCC6 Events',
    item_type: { id: 'WsNJp5eaRz2-QZserzWOTw', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.update('bJawhQc0QcujPnfqqTAawQ', { position: 5 });
}
