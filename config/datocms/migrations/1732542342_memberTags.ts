import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create block model "Case Block" (`case_block`)');
  await client.itemTypes.create(
    {
      id: 'SQB-0a-eRKK4dOSmxN7LIw',
      name: 'Case Block',
      api_key: 'case_block',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'afkDm949QbK7TsU31iB2mA',
    }
  );

  console.log('Create block model "Contact block" (`contact_block`)');
  await client.itemTypes.create(
    {
      id: 'Hwfbdgu_TMqmzK2i0-xmXg',
      name: 'Contact block',
      api_key: 'contact_block',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'BWRZMDBEQv2z3KJcjbCBMg',
    }
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Industry" (`industry`)');
  await client.itemTypes.create(
    {
      id: 'Q04RdQnVQw-xei_UK8GzjA',
      name: '\uD83C\uDFF7\uFE0F Industry',
      api_key: 'industry',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'U6lgXv8JRE20ktPLQYj4VA',
    }
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Expertise" (`expertise`)');
  await client.itemTypes.create(
    {
      id: 'BdrPCTMrRGWPtEqBP0nSYg',
      name: '\uD83C\uDFF7\uFE0F Expertise',
      api_key: 'expertise',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'CGMekOAaRISkViVSKXEjxw',
    }
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single asset field "Image" (`image`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'B52HGAvZQqy6Q_iHsZmiTg',
    label: 'Image',
    field_type: 'file',
    api_key: 'image',
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: 'image' },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'bX4vld_pSSKJUsgCI2ZQKQ',
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
    'Create Single link field "Industry tag" (`industry_tag`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'Zf13F0O_QNSZrwUZlJquMQ',
    label: 'Industry tag',
    field_type: 'link',
    api_key: 'industry_tag',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['Q04RdQnVQw-xei_UK8GzjA'],
      },
    },
    appearance: { addons: [], editor: 'link_select', parameters: {} },
  });

  console.log(
    'Create Multiple links field "Expertise tags" (`expertise_tags`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'AAM4iI_lTRSvP_rE3b49pg',
    label: 'Expertise tags',
    field_type: 'links',
    api_key: 'expertise_tags',
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['BdrPCTMrRGWPtEqBP0nSYg'],
      },
      size: { max: 3 },
    },
    appearance: { addons: [], editor: 'links_select', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Customer" (`customer`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'LnjilSUJQg-DHCIgIu618Q',
    label: 'Customer',
    field_type: 'string',
    api_key: 'customer',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Link" (`link`) in block model "Case Block" (`case_block`)'
  );
  await client.fields.create('SQB-0a-eRKK4dOSmxN7LIw', {
    id: 'f7MohXEZSP605UYDyMmbwA',
    label: 'Link',
    field_type: 'string',
    api_key: 'link',
    validators: { format: { predefined_pattern: 'url' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'GzNmBZPnRquZnFiNTWbT9g',
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
    'Create Single-line string field "Website" (`website`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'I2mivmkKTu2glOoCR8AT1A',
    label: 'Website',
    field_type: 'string',
    api_key: 'website',
    validators: { format: { predefined_pattern: 'url' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Street Name" (`street_name`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'N47QsWgLSuaIpJv4Toi_iQ',
    label: 'Street Name',
    field_type: 'string',
    api_key: 'street_name',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
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

  console.log(
    'Create Single-line string field "Postal Code" (`postal_code`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'HYnThjyPSd-7GKJmdSXwvQ',
    label: 'Postal Code',
    field_type: 'string',
    api_key: 'postal_code',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "City" (`city`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'c561VCgRQmmkFrxc2OY5fA',
    label: 'City',
    field_type: 'string',
    api_key: 'city',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Phone" (`phone`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'QS0-fiB4SKGtyRd5HWqdzQ',
    label: 'Phone',
    field_type: 'string',
    api_key: 'phone',
    validators: { format: { custom_pattern: '^\\+?[1-9]\\d{1,14}$' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Email" (`email`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.create('Hwfbdgu_TMqmzK2i0-xmXg', {
    id: 'fK57tRxYRdWy6Vu1QPAgiw',
    label: 'Email',
    field_type: 'string',
    api_key: 'email',
    validators: { format: { predefined_pattern: 'email' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Industry" (`industry`)'
  );
  await client.fields.create('Q04RdQnVQw-xei_UK8GzjA', {
    id: 'DZr2iHF3SFKX7m0mxOsGIg',
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
    localized: true,
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create Single-line string field "Label" (`label`) in model "\uD83C\uDFF7\uFE0F Expertise" (`expertise`)'
  );
  await client.fields.create('BdrPCTMrRGWPtEqBP0nSYg', {
    id: 'ahEY4YWRQoqzzaJ9AYaVjQ',
    label: 'Label',
    field_type: 'string',
    api_key: 'label',
    localized: true,
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'NXwU_JT6R3aVZ5V8OC1V9w',
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
    'Create Single asset field "Banner" (`banner`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'Io2gWgtXRqqcmuBExEUbbg',
    label: 'Banner',
    field_type: 'file',
    api_key: 'banner',
    validators: { extension: { extensions: [], predefined_list: 'image' } },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Single-line string field "Employees" (`employees`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'YNJuWFCAR6GLV9RTh97CiA',
    label: 'Employees',
    field_type: 'string',
    api_key: 'employees',
    validators: {
      enum: { values: ['1-9', '10-24', '25-49', '50-99', '100-249', '250+'] },
    },
    appearance: {
      addons: [],
      editor: 'string_select',
      parameters: {
        options: [
          { hint: '', label: '1-9', value: '1-9' },
          { hint: '', label: '10-24', value: '10-24' },
          { hint: '', label: '25-49', value: '25-49' },
          { hint: '', label: '50-99', value: '50-99' },
          { hint: '', label: '100-249', value: '100-249' },
          { hint: '', label: '250+', value: '250+' },
        ],
      },
    },
    default_value: '',
  });

  console.log(
    'Create Single-line string field "Website" (`website`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'eQ8czXJAR0eX8qPDukcqJQ',
    label: 'Website',
    field_type: 'string',
    api_key: 'website',
    validators: { format: { predefined_pattern: 'url' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Multiple links field "Tags" (`tags`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'd1J3Kf2KS1uiTp_I7_7OFQ',
    label: 'Tags',
    field_type: 'links',
    api_key: 'tags',
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
    'Create Modular Content (Single block) field "About us" (`about_us`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'ckrqH__wTzS8ikK8v_PRfw',
    label: 'About us',
    field_type: 'single_block',
    api_key: 'about_us',
    localized: true,
    validators: {
      single_block_blocks: { item_types: ['PAk40zGjQJCcDXXPgygUrA'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'frameless_single_block',
      parameters: {},
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Multiple links field "Vacancies" (`vacancies`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'deeBHSWvQ_e6CzE2oVeIuA',
    label: 'Vacancies',
    field_type: 'links',
    api_key: 'vacancies',
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['Bc_RFLXqQDG5Eb0SJblw5Q'],
      },
    },
    appearance: { addons: [], editor: 'links_embed', parameters: {} },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Cases" (`cases`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'IrP5Hr0BRvCOh2GTVc5jJg',
    label: 'Cases',
    field_type: 'rich_text',
    api_key: 'cases',
    localized: true,
    validators: {
      rich_text_blocks: { item_types: ['SQB-0a-eRKK4dOSmxN7LIw'] },
      size: { max: 3 },
    },
    appearance: {
      addons: [],
      editor: 'rich_text',
      parameters: { start_collapsed: false },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Modular Content (Multiple blocks) field "Contact" (`contact`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'EagEZc6jRu-xvc3vmrbaHA',
    label: 'Contact',
    field_type: 'rich_text',
    api_key: 'contact',
    validators: {
      rich_text_blocks: { item_types: ['Hwfbdgu_TMqmzK2i0-xmXg'] },
      size: { min: 1 },
    },
    appearance: {
      addons: [],
      editor: 'rich_text',
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'AI3ZkUYiSAGEu6jDQ3f2Ow',
    label: 'Slug',
    field_type: 'slug',
    api_key: 'slug',
    validators: {
      slug_title_field: { title_field_id: 'Bg0SNktOQUuWpq8emaQlHg' },
      slug_format: { predefined_pattern: 'webpage_slug' },
      required: {},
      unique: {},
    },
    appearance: {
      addons: [],
      editor: 'slug',
      parameters: { url_prefix: null, placeholder: null },
    },
  });

  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Single link field "Company" (`company`) in model "\uD83D\uDCBC Vacancy" (`vacancy`)'
  );
  await client.fields.destroy('BvYMcWkSS4KPakYtFzxZyQ');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD Text Block" (`text_block`)'
  );
  await client.fields.update('NtVXfZ6gTL2sKNffNeUf5Q', {
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
        nodes: [
          'blockquote',
          'code',
          'heading',
          'link',
          'list',
          'thematicBreak',
        ],
        heading_levels: [3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
  });

  console.log(
    'Update Slug field "Slug" (`slug`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('AI3ZkUYiSAGEu6jDQ3f2Ow', { position: 2 });

  console.log(
    'Update SEO meta tags field "SEO" (`seo`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('NXwU_JT6R3aVZ5V8OC1V9w', { position: 3 });

  console.log(
    'Update Single asset field "Banner" (`banner`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('Io2gWgtXRqqcmuBExEUbbg', { position: 4 });

  console.log(
    'Update Single asset field "Logo" (`logo`) in model "\uD83D\uDCC1 Member" (`member`)'
  );
  await client.fields.update('aGzxIk2HS02Dibb-VW-YqA', {
    validators: {
      required: {},
      extension: { extensions: [], predefined_list: 'image' },
      required_alt_title: { title: false, alt: true },
    },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83C\uDFF7\uFE0F Industry" (`industry`)');
  await client.itemTypes.update('Q04RdQnVQw-xei_UK8GzjA', {
    title_field: { id: 'DZr2iHF3SFKX7m0mxOsGIg', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Expertise" (`expertise`)');
  await client.itemTypes.update('BdrPCTMrRGWPtEqBP0nSYg', {
    title_field: { id: 'ahEY4YWRQoqzzaJ9AYaVjQ', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Industries"');
  await client.menuItems.create({
    id: 'Sc_C56L_QY205daoqUY5Ow',
    label: '\uD83C\uDFF7\uFE0F Industries',
    item_type: { id: 'Q04RdQnVQw-xei_UK8GzjA', type: 'item_type' },
  });

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Expertises"');
  await client.menuItems.create({
    id: 'DOhQSbG2SJOpVufFDsP4rg',
    label: '\uD83C\uDFF7\uFE0F Expertises',
    item_type: { id: 'BdrPCTMrRGWPtEqBP0nSYg', type: 'item_type' },
  });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Industry" (`industry`)'
  );
  await client.schemaMenuItems.update('U6lgXv8JRE20ktPLQYj4VA', {
    position: 22,
  });

  console.log(
    'Update model schema menu item for model "\uD83D\uDCF0 News" (`news`)'
  );
  await client.schemaMenuItems.update('U4uI92OnSDy1-_Acivx0yA', {
    position: 24,
  });

  console.log(
    'Update model schema menu item for model "\uD83E\uDD1D Partner" (`partner`)'
  );
  await client.schemaMenuItems.update('VXgXLXnQQryR3w_3j2prRw', {
    position: 25,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Expertise" (`expertise`)'
  );
  await client.schemaMenuItems.update('CGMekOAaRISkViVSKXEjxw', {
    position: 23,
  });

  console.log('Update permissions for environment in role Editor');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [{ action: 'all', on_creator: 'anyone', localization_scope: 'all' }],
      remove: [
        {
          item_type: 'ByoMKdCkSp6T10UjQm26wg',
          action: 'read',
          on_creator: 'self',
        },
        {
          item_type: 'ByoMKdCkSp6T10UjQm26wg',
          action: 'update',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'read',
          on_creator: 'self',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'update',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'create',
          localization_scope: 'all',
        },
        { item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q', action: 'duplicate' },
      ],
    },
    positive_upload_permissions: {
      add: [{ action: 'all', on_creator: 'anyone', localization_scope: 'all' }],
      remove: [
        { action: 'read', on_creator: 'anyone' },
        { action: 'all', on_creator: 'self', localization_scope: 'all' },
      ],
    },
  });
}
