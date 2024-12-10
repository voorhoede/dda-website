import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create block model "Internal Event" (`internal_event`)');
  await client.itemTypes.create(
    {
      id: 'Q82PkA7iSR2bSjgonqs5MA',
      name: 'Internal Event',
      api_key: 'internal_event',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'E0ir4Ij-SHGNKOKmYkm9gg',
    }
  );

  console.log('Create block model "External Event" (`external_event`)');
  await client.itemTypes.create(
    {
      id: 'Jf1MPr7fQTeckmDNiSXsDA',
      name: 'External Event',
      api_key: 'external_event',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'cmiMBfJ0TCGVrxmAOJSNyw',
    }
  );

  console.log('Create block model "Schedule Item" (`schedule_item`)');
  await client.itemTypes.create(
    {
      id: 'DeDj7UUbQfenkwHbs4jLew',
      name: 'Schedule Item',
      api_key: 'schedule_item',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'XCNCWvbVSaaiiyeaqO0vyA',
    }
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'NtOpDPaCTHOjz8RQAcJpbw',
    label: 'Title',
    field_type: 'string',
    api_key: 'title',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'Y2b1JZkzSUK7SlI-L42h-w',
    label: 'SEO',
    field_type: 'seo',
    api_key: 'seo',
    validators: { title_length: { max: 60 }, description_length: { max: 160 } },
    appearance: {
      addons: [],
      editor: 'seo',
      parameters: {
        fields: ['title', 'description', 'image', 'no_index', 'twitter_card'],
        previews: [
          'google',
          'twitter',
          'facebook',
          'linkedin',
          'slack',
          'telegram',
          'whatsapp',
        ],
      },
    },
  });

  console.log(
    'Create Single asset field "Banner" (`banner`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'FLjmJxfeRmuvWXR2Qn9EKw',
    label: 'Banner',
    field_type: 'file',
    api_key: 'banner',
    validators: {
      extension: { extensions: [], predefined_list: 'transformable_image' },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Modular Content (Single block) field "Description" (`description`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'fqUQcRSUTR2dASLJGVH8MQ',
    label: 'Description',
    field_type: 'single_block',
    api_key: 'description',
    validators: {
      single_block_blocks: { item_types: ['PAk40zGjQJCcDXXPgygUrA'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'frameless_single_block',
      parameters: {},
    },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Schedule" (`schedule`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'CAKcrnmuQ3GsG71q1KAxOg',
    label: 'Schedule',
    field_type: 'rich_text',
    api_key: 'schedule',
    validators: {
      rich_text_blocks: { item_types: ['DeDj7UUbQfenkwHbs4jLew'] },
    },
    appearance: {
      addons: [],
      editor: 'rich_text',
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in block model "Internal Event" (`internal_event`)'
  );
  await client.fields.create('Q82PkA7iSR2bSjgonqs5MA', {
    id: 'YecnQV-hSii9N3jTXUuiLw',
    label: 'Slug',
    field_type: 'slug',
    api_key: 'slug',
    validators: {
      slug_title_field: { title_field_id: 'NtOpDPaCTHOjz8RQAcJpbw' },
      slug_format: { predefined_pattern: 'webpage_slug' },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'slug',
      parameters: { url_prefix: null, placeholder: null },
    },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "External Event" (`external_event`)'
  );
  await client.fields.create('Jf1MPr7fQTeckmDNiSXsDA', {
    id: 'VSjNnLpEQFiVYOCinThOAQ',
    label: 'Title',
    field_type: 'string',
    api_key: 'title',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Link" (`link`) in block model "External Event" (`external_event`)'
  );
  await client.fields.create('Jf1MPr7fQTeckmDNiSXsDA', {
    id: 'Ctu1HK9lTNKR2lfjoS-Q_w',
    label: 'Link',
    field_type: 'string',
    api_key: 'link',
    validators: { required: {}, format: { predefined_pattern: 'url' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Name" (`name`) in block model "Schedule Item" (`schedule_item`)'
  );
  await client.fields.create('DeDj7UUbQfenkwHbs4jLew', {
    id: 'FXwuHb18SJmu6t8rPdUEZQ',
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Start" (`start`) in block model "Schedule Item" (`schedule_item`)'
  );
  await client.fields.create('DeDj7UUbQfenkwHbs4jLew', {
    id: 'fUiz_1BaSZ-hVCx6oQEwBw',
    label: 'Start',
    field_type: 'string',
    api_key: 'start',
    hint: 'hh:mm',
    validators: { format: { custom_pattern: '^([01]\\d|2[0-3]):[0-5]\\d$' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "End" (`end`) in block model "Schedule Item" (`schedule_item`)'
  );
  await client.fields.create('DeDj7UUbQfenkwHbs4jLew', {
    id: 'POkQQ9L_R_OwB_k-N1OFyg',
    label: 'End',
    field_type: 'string',
    api_key: 'end',
    hint: 'hh:mm',
    validators: { format: { custom_pattern: '^([01]\\d|2[0-3]):[0-5]\\d$' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Modular Content (Single block) field "Details" (`details`) in model "\uD83D\uDCC6 Event" (`event`)'
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'JF0fpIXqQ4mm6LU6__y9iQ',
    label: 'Details',
    field_type: 'single_block',
    api_key: 'details',
    validators: {
      single_block_blocks: {
        item_types: ['Jf1MPr7fQTeckmDNiSXsDA', 'Q82PkA7iSR2bSjgonqs5MA'],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
    deep_filtering_enabled: true,
  });

  console.log(
    'Create Single-line string field "House Number" (`house_number`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'PkmiLwl8RCW8q5K5LzsaJA',
    label: 'House Number',
    field_type: 'string',
    api_key: 'house_number',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single asset field "Banner" (`banner`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('Io2gWgtXRqqcmuBExEUbbg', {
    validators: { extension: { extensions: [], predefined_list: 'image' } },
  });

  console.log(
    'Update Single-line string field "Location" (`location`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('eIQP58ibRcCqS9O3qAil9w', {
    validators: { required: {} },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Contact" (`contact`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('EagEZc6jRu-xvc3vmrbaHA', {
    validators: {
      rich_text_blocks: { item_types: ['Hwfbdgu_TMqmzK2i0-xmXg'] },
      size: { min: 1 },
    },
  });

  console.log(
    'Update Single-line string field "House Number" (`house_number`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.update('PkmiLwl8RCW8q5K5LzsaJA', { position: 4 });

  console.log(
    'Update Single-line string field "Phone" (`phone`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.update('QS0-fiB4SKGtyRd5HWqdzQ', {
    validators: { format: { custom_pattern: '^\\+?[1-9]\\d{1,14}$' } },
  });

  console.log('Update permissions for environment in role Member');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [{ action: 'all', on_creator: 'anyone', localization_scope: 'all' }],
      remove: [
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'create',
          localization_scope: 'all',
        },
      ],
    },
  });
}
