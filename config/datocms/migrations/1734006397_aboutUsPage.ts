import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update environment\'s settings');
  await client.site.update({ favicon: null });

  console.log('Create new models/block models');

  console.log('Create model "\uD83D\uDC81 About Us Page" (`about_us_page`)');
  await client.itemTypes.create(
    {
      id: 'FseXjiLFRp2WTVndi1DhxA',
      name: '\uD83D\uDC81 About Us Page',
      singleton: true,
      api_key: 'about_us_page',
      draft_mode_active: true,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'WW4E2JYcRiW8tR8Guz5nhg',
    }
  );

  console.log('Create model "Team Member" (`team_member`)');
  await client.itemTypes.create(
    {
      id: 'E5AOJFyISyqeM2QwrlQ37g',
      name: 'Team Member',
      api_key: 'team_member',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'QNtZvT5HTKSJe-6AfMn25Q',
    }
  );

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
    }
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
    }
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create fieldset "\uD83D\uDC6A Team Section" in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fieldsets.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'XcObf646RYqgMNQEL4c2iQ',
    title: '\uD83D\uDC6A Team Section',
  });

  console.log(
    'Create Single-line string field "Label" (`team_section_label`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'V9h73zqASU-SfDGXDOfjLA',
    label: 'Label',
    field_type: 'string',
    api_key: 'team_section_label',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
    fieldset: { id: 'XcObf646RYqgMNQEL4c2iQ', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Title" (`team_section_title`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'HU3OLeEnQY-uwAcXe_0w_g',
    label: 'Title',
    field_type: 'string',
    api_key: 'team_section_title',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
    fieldset: { id: 'XcObf646RYqgMNQEL4c2iQ', type: 'fieldset' },
  });

  console.log(
    'Create Modular Content (Single block) field "Header" (`header`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'GvRNC2_yRoOL3k3l_Rhd-A',
    label: 'Header',
    field_type: 'single_block',
    api_key: 'header',
    validators: {
      single_block_blocks: { item_types: ['HqRofhCbQKGKdMNb7eawoQ'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'AJtcvmkiRlmv2coZcWipIw',
    label: 'SEO',
    field_type: 'seo',
    api_key: 'seo',
    localized: true,
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
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Intro Text" (`intro_text`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'aU6vgvAYRJCgxnm_cNiueg',
    label: 'Intro Text',
    field_type: 'string',
    api_key: 'intro_text',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Modular Content (Single block) field "Text" (`text`) in model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.fields.create('FseXjiLFRp2WTVndi1DhxA', {
    id: 'dDtaM7aITlGpl7PxY-wdxg',
    label: 'Text',
    field_type: 'single_block',
    api_key: 'text',
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
    'Create Single asset field "Image" (`image`) in model "Team Member" (`team_member`)'
  );
  await client.fields.create('E5AOJFyISyqeM2QwrlQ37g', {
    id: 'Y7YS72VfTBa9n-GVsPStKg',
    label: 'Image',
    field_type: 'file',
    api_key: 'image',
    validators: {
      extension: { extensions: [], predefined_list: 'transformable_image' },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Name" (`name`) in model "Team Member" (`team_member`)'
  );
  await client.fields.create('E5AOJFyISyqeM2QwrlQ37g', {
    id: 'Np_w7ahST12-IfkL5t9C9Q',
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
    'Create Single-line string field "Role" (`role`) in model "Team Member" (`team_member`)'
  );
  await client.fields.create('E5AOJFyISyqeM2QwrlQ37g', {
    id: 'T80Pa0xlTK-Jxway4TO3Jw',
    label: 'Role',
    field_type: 'string',
    api_key: 'role',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Single-line string field "LinkedIn Link" (`linkedin_link`) in model "Team Member" (`team_member`)'
  );
  await client.fields.create('E5AOJFyISyqeM2QwrlQ37g', {
    id: 'ciGBDGgIQsSoGYEaaEUXcg',
    label: 'LinkedIn Link',
    field_type: 'string',
    api_key: 'linkedin_link',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Email" (`email`) in model "Team Member" (`team_member`)'
  );
  await client.fields.create('E5AOJFyISyqeM2QwrlQ37g', {
    id: 'VJOxOYz-Rw2VhtNNSXr3eQ',
    label: 'Email',
    field_type: 'string',
    api_key: 'email',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Label" (`label`) in block model "\uD83D\uDC40 CTA Block" (`cta_block`)'
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
    'Create Modular Content (Single block) field "Link" (`link`) in block model "\uD83D\uDC40 CTA Block" (`cta_block`)'
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
    'Create Single-line string field "Url" (`url`) in block model "Link" (`link`)'
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
    'Create Boolean field "Open in new window" (`open_in_new_window`) in block model "Link" (`link`)'
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
    'Create Modular Content (Single block) field "Header" (`header`) in model "\uD83D\uDCD1 Page" (`page`)'
  );
  await client.fields.create('T5DMLHeUTF2ub3p2Wx-CBw', {
    id: 'R6oRJIHjTOOHbvy8riiTgQ',
    label: 'Header',
    field_type: 'single_block',
    api_key: 'header',
    validators: {
      single_block_blocks: { item_types: ['HqRofhCbQKGKdMNb7eawoQ'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD Text Block" (`text_block`)'
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

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "\uD83D\uDCD1 Page" (`page`)'
  );
  await client.fields.update('R6oRJIHjTOOHbvy8riiTgQ', { position: 2 });

  console.log(
    'Update Slug field "Slug" (`slug`) in model "\uD83D\uDCD1 Page" (`page`)'
  );
  await client.fields.update('Qjdkt8aORUOQRCZicWpsMA', { position: 3 });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83D\uDCD1 Page" (`page`)'
  );
  await client.fields.update('Q-z1nyMsQtC8Sr6w6J2oGw', {
    validators: {
      rich_text_blocks: { item_types: ['PAk40zGjQJCcDXXPgygUrA'] },
    },
    appearance: {
      addons: [],
      editor: 'rich_text',
      parameters: { start_collapsed: false },
    },
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
    'Update Structured text field "Subtitle" (`subtitle`) in block model "Page header" (`page_header`)'
  );
  await client.fields.update('ca9s1pTRQMGMtpxhEVGYqg', {
    validators: {
      structured_text_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['AUh1SEj_Tz2rbRMfJ2RfrQ'],
      },
    },
  });

  console.log('Finalize models/block models');

  console.log('Update model "Team Member" (`team_member`)');
  await client.itemTypes.update('E5AOJFyISyqeM2QwrlQ37g', {
    title_field: { id: 'Np_w7ahST12-IfkL5t9C9Q', type: 'field' },
    image_preview_field: { id: 'Y7YS72VfTBa9n-GVsPStKg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDC81 About Us Page"');
  await client.menuItems.create({
    id: 'cznHlMjSR-2N3kKPDJsfKw',
    label: '\uD83D\uDC81 About Us Page',
    item_type: { id: 'FseXjiLFRp2WTVndi1DhxA', type: 'item_type' },
  });

  console.log('Create menu item "Team Member"');
  await client.menuItems.create({
    id: 'EWtv6vtsQHaePx-Q3MXWcA',
    label: 'Team Member',
    item_type: { id: 'E5AOJFyISyqeM2QwrlQ37g', type: 'item_type' },
  });

  console.log('Update menu item "\uD83D\uDC81 About Us Page"');
  await client.menuItems.update('cznHlMjSR-2N3kKPDJsfKw', { position: 4 });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83D\uDC81 About Us Page" (`about_us_page`)'
  );
  await client.schemaMenuItems.update('WW4E2JYcRiW8tR8Guz5nhg', {
    position: 4,
  });

  console.log(
    'Update model schema menu item for model "Team Member" (`team_member`)'
  );
  await client.schemaMenuItems.update('QNtZvT5HTKSJe-6AfMn25Q', {
    position: 38,
  });

  console.log('Update permissions for environment in role Editor');
  await client.roles.updateCurrentEnvironmentPermissions('307244', {
    positive_item_type_permissions: {
      remove: [
        { action: 'all', on_creator: 'anyone', localization_scope: 'all' },
      ],
    },
    positive_upload_permissions: {
      remove: [
        { action: 'all', on_creator: 'anyone', localization_scope: 'all' },
      ],
    },
  });

  console.log('Update permissions for environment in role Member');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [{ action: 'all', on_creator: 'anyone', localization_scope: 'all' }],
    },
  });
}
