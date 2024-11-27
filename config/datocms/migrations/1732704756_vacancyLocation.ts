import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "Vacancies page" (`vacancies_page`)');
  await client.itemTypes.create(
    {
      id: 'AVYmi04HRvyHIEjyxDgF8A',
      name: 'Vacancies page',
      singleton: true,
      api_key: 'vacancies_page',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'Rgabypz_QjWFXsnEEnRY8Q',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.create('AVYmi04HRvyHIEjyxDgF8A', {
    id: 'CCLwa3_PS0Gi7Wok_F3MLA',
    label: 'Title',
    field_type: 'string',
    api_key: 'title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Structured text field "Subtitle" (`subtitle`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.create('AVYmi04HRvyHIEjyxDgF8A', {
    id: 'DR4rcs-6SFm-gdcPI-BmVw',
    label: 'Subtitle',
    field_type: 'structured_text',
    api_key: 'subtitle',
    localized: true,
    validators: {
      structured_text_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: [],
      },
    },
    appearance: {
      addons: [],
      editor: 'structured_text',
      parameters: {
        marks: [
          'strong',
          'code',
          'emphasis',
          'underline',
          'strikethrough',
          'highlight',
        ],
        nodes: ['link', 'list'],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Location" (`location`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)',
  );
  await client.fields.create('Bc_RFLXqQDG5Eb0SJblw5Q', {
    id: 'HsJkKotBQNqufIPGzufmsA',
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

  console.log('Finalize models/block models');

  console.log('Update model "Vacancies page" (`vacancies_page`)');
  await client.itemTypes.update('AVYmi04HRvyHIEjyxDgF8A', {
    title_field: { id: 'CCLwa3_PS0Gi7Wok_F3MLA', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCBC Vacancies"');
  await client.menuItems.create({
    id: 'B8G1ojR4QRGOSSYKB3EKDw',
    label: '\uD83D\uDCBC Vacancies',
  });

  console.log('Create menu item "Page"');
  await client.menuItems.create({
    id: 'cq5WPb-DS_OvVr4QaaGpFQ',
    label: 'Page',
    item_type: { id: 'AVYmi04HRvyHIEjyxDgF8A', type: 'item_type' },
    parent: { id: 'B8G1ojR4QRGOSSYKB3EKDw', type: 'menu_item' },
  });

  console.log('Update menu item "Items"');
  await client.menuItems.update('V0beSlN3RH61sM8f7-ed1Q', {
    label: 'Items',
    position: 0,
    parent: { id: 'B8G1ojR4QRGOSSYKB3EKDw', type: 'menu_item' },
  });

  console.log('Update menu item "Page"');
  await client.menuItems.update('cq5WPb-DS_OvVr4QaaGpFQ', { position: 1 });
}
