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

  console.log('Create model "\uD83D\uDCBC Vacancy" (`vacancy`)');
  await client.itemTypes.create(
    {
      id: 'Bc_RFLXqQDG5Eb0SJblw5Q',
      name: '\uD83D\uDCBC Vacancy',
      api_key: 'vacancy',
      draft_mode_active: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: true,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'YBljrqmsQ8G7GNa8PETTzg',
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
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'ek2ay7JQRcmoMlNt33V04Q',
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
    'Create Single link field "Company" (`company`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'BvYMcWkSS4KPakYtFzxZyQ',
    label: 'Company',
    field_type: 'link',
    api_key: 'company',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['ByoMKdCkSp6T10UjQm26wg'],
      },
      required: {},
    },
    appearance: { addons: [], editor: 'link_select', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Language" (`language`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'Bq3SszCgS4OTX3dWxPeIQA',
    label: 'Language',
    field_type: 'string',
    api_key: 'language',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'string_select',
      parameters: {
        options: [
          { hint: '', label: 'Dutch', value: 'NL' },
          { hint: '', label: 'English', value: 'ENG' },
          { hint: '', label: 'English & Dutch', value: 'ENG & NL' },
        ],
      },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Weekly Hours" (`weekly_hours`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'dZ2l1ivZQFygqTrxzVn52g',
    label: 'Weekly Hours',
    field_type: 'string',
    api_key: 'weekly_hours',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'string_select',
      parameters: {
        options: [
          { hint: '', label: '0-16 uur', value: '0-16 uur' },
          { hint: '', label: '16-24 uur', value: '16-24 uur' },
          { hint: '', label: '24-32 uur', value: '24-32 uur' },
          { hint: '', label: '32-40 uur', value: '32-40 uur' },
          { hint: '', label: 'Anders', value: 'Anders' },
        ],
      },
    },
    default_value: '32-40 uur',
  });

  console.log(
    'Create Single-line string field "URL" (`url`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'WO2ECZB5T5ChkFNt_Vwjzg',
    label: 'URL',
    field_type: 'string',
    api_key: 'url',
    hint: 'The web address (URL) for your vacancy posting or listing.',
    validators: {
      required: {},
      unique: {},
      format: { predefined_pattern: 'url' },
    },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
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

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'Bg0SNktOQUuWpq8emaQlHg',
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
    'Create Single-line string field "Location" (`location`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'eIQP58ibRcCqS9O3qAil9w',
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

  console.log('Create menu item "\uD83D\uDCBC Vacancies"');
  await client.menuItems.create({
    id: 'V0beSlN3RH61sM8f7-ed1Q',
    label: '\uD83D\uDCBC Vacancies',
    item_type: { id: 'Bc_RFLXqQDG5Eb0SJblw5Q', type: 'item_type' },
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
