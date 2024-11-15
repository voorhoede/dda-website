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

  console.log('Create model "\uD83C\uDFF7\uFE0F Tag" (`tag`)');
  await client.itemTypes.create(
    {
      id: 'UxqkfkpETnWtRgn2iP6Vhg',
      name: '\uD83C\uDFF7\uFE0F Tag',
      api_key: 'tag',
      all_locales_required: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'QO4FwrScR4GnpQYD4zdFOA',
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
    default_value: { nl: '' },
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
    'Create Multiple links field "Labels" (`labels`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'aW-cQw0qT8aG5Jo00GnQQw',
    label: 'Labels',
    field_type: 'links',
    api_key: 'labels',
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['UxqkfkpETnWtRgn2iP6Vhg'],
      },
    },
    appearance: { addons: [], editor: 'links_select', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Label" (`label`) in model "\uD83C\uDFF7\uFE0F Tag" (`tag`)',
  );
  await client.fields.create('UxqkfkpETnWtRgn2iP6Vhg', {
    id: 'YISZr5FEQTCgs6IsSVP0Jg',
    label: 'Label',
    field_type: 'string',
    api_key: 'label',
    localized: true,
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: true, placeholder: null },
      type: 'title',
    },
    default_value: { nl: '' },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Name" (`name`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('Bg0SNktOQUuWpq8emaQlHg', { position: 1 });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83D\uDCC6 Event" (`event`)');
  await client.itemTypes.update('WsNJp5eaRz2-QZserzWOTw', {
    title_field: { id: 'CMsGaRVdRuiXswYcoKF_Cw', type: 'field' },
    image_preview_field: { id: 'QCxjVCKkQN-WeeW-IkvPMg', type: 'field' },
  });

  console.log('Update model "\uD83D\uDCBC Vacancy" (`vacancy`)');
  await client.itemTypes.update('Bc_RFLXqQDG5Eb0SJblw5Q', {
    title_field: { id: 'ek2ay7JQRcmoMlNt33V04Q', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Tag" (`tag`)');
  await client.itemTypes.update('UxqkfkpETnWtRgn2iP6Vhg', {
    title_field: { id: 'YISZr5FEQTCgs6IsSVP0Jg', type: 'field' },
  });

  console.log('Update model "\uD83D\uDCC1 Member" (`member`)');
  await client.itemTypes.update('ByoMKdCkSp6T10UjQm26wg', {
    title_field: { id: 'Bg0SNktOQUuWpq8emaQlHg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.create({
    id: 'bJawhQc0QcujPnfqqTAawQ',
    label: '\uD83D\uDCC6 Events',
    item_type: { id: 'WsNJp5eaRz2-QZserzWOTw', type: 'item_type' },
  });

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Tags"');
  await client.menuItems.create({
    id: 'FM5AHAT2Sn6aGG_oHNCzRQ',
    label: '\uD83C\uDFF7\uFE0F Tags',
    item_type: { id: 'UxqkfkpETnWtRgn2iP6Vhg', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.update('bJawhQc0QcujPnfqqTAawQ', { position: 5 });

  console.log('Update menu item "\uD83D\uDCBC Vacancies"');
  await client.menuItems.update('V0beSlN3RH61sM8f7-ed1Q', { position: 6 });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Tags"');
  await client.menuItems.update('FM5AHAT2Sn6aGG_oHNCzRQ', { position: 9 });

  console.log('Update menu item "\uD83E\uDD37 404 Page"');
  await client.menuItems.update('OAwwPodJSyyKykRmnvtw4A', { position: 7 });

  console.log('Update menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', { position: 8 });
}
