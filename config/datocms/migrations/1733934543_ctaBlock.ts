import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create block model "\uD83D\uDC40 CTA Block" (`cta_block`)');
  await client.itemTypes.create(
    {
      id: 'ObRBP1yLTLqHcxQYa36y1A',
      name: '\uD83D\uDC40 CTA Block',
      api_key: 'cta_block',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'ZRvuzWyoQ8qXpaGZCujkqw',
    },
  );

  console.log('Create block model "Link" (`link`)');
  await client.itemTypes.create(
    {
      id: 'LTc2CSpLS5eDuCUIbvANSg',
      name: 'Link',
      api_key: 'link',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'FPho-Z8IRHSWhBskTgdmaA',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Label" (`label`) in block model "\uD83D\uDC40 CTA Block" (`cta_block`)',
  );
  await client.fields.create('ObRBP1yLTLqHcxQYa36y1A', {
    id: 'etlek88sR_KC6buubTNiQw',
    label: 'Label',
    field_type: 'string',
    api_key: 'label',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Modular Content (Single block) field "Link" (`link`) in block model "\uD83D\uDC40 CTA Block" (`cta_block`)',
  );
  await client.fields.create('ObRBP1yLTLqHcxQYa36y1A', {
    id: 'cspaDFwnT3eDbEDq8y3yQQ',
    label: 'Link',
    field_type: 'single_block',
    api_key: 'link',
    validators: {
      single_block_blocks: { item_types: ['LTc2CSpLS5eDuCUIbvANSg'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Single-line string field "Url" (`url`) in block model "Link" (`link`)',
  );
  await client.fields.create('LTc2CSpLS5eDuCUIbvANSg', {
    id: 'UtjhzQodSl6bNyxZ3vEplg',
    label: 'Url',
    field_type: 'string',
    api_key: 'url',
    validators: { required: {}, format: { predefined_pattern: 'url' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Boolean field "Open in new window" (`open_in_new_window`) in block model "Link" (`link`)',
  );
  await client.fields.create('LTc2CSpLS5eDuCUIbvANSg', {
    id: 'Kv7-H5fHQau4-gMOVQpbNA',
    label: 'Open in new window',
    field_type: 'boolean',
    api_key: 'open_in_new_window',
    appearance: { addons: [], editor: 'boolean', parameters: {} },
    default_value: false,
  });

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.fields.update('NtVXfZ6gTL2sKNffNeUf5Q', {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          'ObRBP1yLTLqHcxQYa36y1A',
          'ZdBokLsWRgKKjHrKeJzdpw',
          'gezG9nO7SfaiWcWnp-HNqw',
        ],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: [],
      },
    },
  });
}
