import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Manage upload filters');

  console.log('Install plugin "Multi-Select Conditional Fields"');
  await client.plugins.create({
    id: 'fmZ_Uy73SpmuizBw-RZckg',
    package_name: 'datocms-plugin-multi-select-conditional-fields',
  });

  console.log('Create new models/block models');

  console.log('Create model "\uD83C\uDDF3\uD83C\uDDF1 Province" (`province`)');
  await client.itemTypes.create(
    {
      id: 'MBKAE-oATMCeIE8oMGeO8g',
      name: '\uD83C\uDDF3\uD83C\uDDF1 Province',
      api_key: 'province',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'CDhn_7AHQQWbEea37q--DQ',
    }
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDDF3\uD83C\uDDF1 Province" (`province`)'
  );
  await client.fields.create('MBKAE-oATMCeIE8oMGeO8g', {
    id: 'Riu4silMQQWsRwbrIf8nQg',
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Multiple links field "Provinces" (`provinces`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'AMg-aP_fQLGHCJ0aQcbNAw',
    label: 'Provinces',
    field_type: 'links',
    api_key: 'provinces',
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['MBKAE-oATMCeIE8oMGeO8g'],
      },
    },
    appearance: { addons: [], editor: 'links_select', parameters: {} },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Multiple links field "Provinces" (`provinces`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('AMg-aP_fQLGHCJ0aQcbNAw', { position: 7 });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83C\uDDF3\uD83C\uDDF1 Province" (`province`)');
  await client.itemTypes.update('MBKAE-oATMCeIE8oMGeO8g', {
    title_field: { id: 'Riu4silMQQWsRwbrIf8nQg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83C\uDDF3\uD83C\uDDF1 Provinces"');
  await client.menuItems.create({
    id: 'IiSNMNu3SJWlWaciyHTZNA',
    label: '\uD83C\uDDF3\uD83C\uDDF1 Provinces',
    item_type: { id: 'MBKAE-oATMCeIE8oMGeO8g', type: 'item_type' },
  });
}
