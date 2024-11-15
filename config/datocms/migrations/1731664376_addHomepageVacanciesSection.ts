import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

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

  console.log('Creating new fields/fieldsets');

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

  console.log('Update model "\uD83D\uDCBC Vacancy" (`vacancy`)');
  await client.itemTypes.update('Bc_RFLXqQDG5Eb0SJblw5Q', {
    title_field: { id: 'ek2ay7JQRcmoMlNt33V04Q', type: 'field' },
  });

  console.log('Update model "\uD83D\uDCC1 Member" (`member`)');
  await client.itemTypes.update('ByoMKdCkSp6T10UjQm26wg', {
    title_field: { id: 'Bg0SNktOQUuWpq8emaQlHg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCBC Vacancy"');
  await client.menuItems.create({
    id: 'V0beSlN3RH61sM8f7-ed1Q',
    label: '\uD83D\uDCBC Vacancy',
    item_type: { id: 'Bc_RFLXqQDG5Eb0SJblw5Q', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDCBC Vacancy"');
  await client.menuItems.update('V0beSlN3RH61sM8f7-ed1Q', { position: 5 });

  console.log('Update menu item "\uD83E\uDD37 404 Page"');
  await client.menuItems.update('OAwwPodJSyyKykRmnvtw4A', { position: 6 });

  console.log('Update menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', { position: 8 });
}
