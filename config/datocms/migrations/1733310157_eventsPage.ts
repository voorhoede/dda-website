import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "Events Page" (`events_page`)');
  await client.itemTypes.create(
    {
      id: 'CvaytqzTRs-iu_Rcur5ZLQ',
      name: 'Events Page',
      singleton: true,
      api_key: 'events_page',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'DIhQRxeTSTytOc_V42a3yg',
    }
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Theme" (`theme`)');
  await client.itemTypes.create(
    {
      id: 'Rr331K1ORGa_w85NKCWbYA',
      name: '\uD83C\uDFF7\uFE0F Theme',
      api_key: 'theme',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'Vp9tvknWSLGoRPpwZDWkvg',
    }
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Events Page" (`events_page`)'
  );
  await client.fields.create('CvaytqzTRs-iu_Rcur5ZLQ', {
    id: 'ACmQSImuRDm-uMQZU1-JMg',
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
    'Create Structured text field "Description" (`description`) in model "Events Page" (`events_page`)'
  );
  await client.fields.create('CvaytqzTRs-iu_Rcur5ZLQ', {
    id: 'IdBQzWduQLOBksrnYYU_jw',
    label: 'Description',
    field_type: 'structured_text',
    api_key: 'description',
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
        nodes: [
          'blockquote',
          'code',
          'heading',
          'link',
          'list',
          'thematicBreak',
        ],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "Events Page" (`events_page`)'
  );
  await client.fields.create('CvaytqzTRs-iu_Rcur5ZLQ', {
    id: 'RwxA2AnHTOCeQe7iscGM1w',
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
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Theme" (`theme`)'
  );
  await client.fields.create('Rr331K1ORGa_w85NKCWbYA', {
    id: 'fhY9je7rQFqHStmfiw5QKQ',
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
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
    'Create Single link field "Theme" (`theme`) in model "\uD83D\uDCC6 Event" (`event`)'
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'WOhkRqcpSjm8Vp9fTMXqxg',
    label: 'Theme',
    field_type: 'link',
    api_key: 'theme',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['Rr331K1ORGa_w85NKCWbYA'],
      },
    },
    appearance: { addons: [], editor: 'link_select', parameters: {} },
  });

  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Multiple links field "Labels" (`labels`) in model "\uD83D\uDCC6 Event" (`event`)'
  );
  await client.fields.destroy('aW-cQw0qT8aG5Jo00GnQQw');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single link field "Theme" (`theme`) in model "\uD83D\uDCC6 Event" (`event`)'
  );
  await client.fields.update('WOhkRqcpSjm8Vp9fTMXqxg', { position: 5 });

  console.log(
    'Update Single-line string field "Location" (`location`) in model "\uD83D\uDCC6 Event" (`event`)'
  );
  await client.fields.update('XjLghLzMQUOXjuG4DMEyBA', { position: 4 });

  console.log('Finalize models/block models');

  console.log('Update model "Events Page" (`events_page`)');
  await client.itemTypes.update('CvaytqzTRs-iu_Rcur5ZLQ', {
    title_field: { id: 'ACmQSImuRDm-uMQZU1-JMg', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Theme" (`theme`)');
  await client.itemTypes.update('Rr331K1ORGa_w85NKCWbYA', {
    title_field: { id: 'fhY9je7rQFqHStmfiw5QKQ', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.create({
    id: 'WiJ97c5eQ_SSKdlC8OjFlA',
    label: '\uD83D\uDCC6 Events',
  });

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Tags group"');
  await client.menuItems.create({
    id: 'OGGts_hcTBSy-5VWKpsI8A',
    label: '\uD83C\uDFF7\uFE0F Tags group',
  });

  console.log('Create menu item "Page"');
  await client.menuItems.create({
    id: 'VqrfLbzCSZKR3Q4OX_MFcw',
    label: 'Page',
    item_type: { id: 'CvaytqzTRs-iu_Rcur5ZLQ', type: 'item_type' },
    parent: { id: 'WiJ97c5eQ_SSKdlC8OjFlA', type: 'menu_item' },
  });

  console.log('Create menu item "\uD83C\uDFAD Themes"');
  await client.menuItems.create({
    id: 'dyjOWFO8TDmsud8zmwFvKw',
    label: '\uD83C\uDFAD Themes',
    item_type: { id: 'Rr331K1ORGa_w85NKCWbYA', type: 'item_type' },
    parent: { id: 'OGGts_hcTBSy-5VWKpsI8A', type: 'menu_item' },
  });

  console.log('Update menu item "\uD83E\uDDD1\u200D\uD83D\uDD2C Expertises"');
  await client.menuItems.update('DOhQSbG2SJOpVufFDsP4rg', {
    label: '\uD83E\uDDD1\u200D\uD83D\uDD2C Expertises',
    position: 1,
    parent: { id: 'OGGts_hcTBSy-5VWKpsI8A', type: 'menu_item' },
  });

  console.log('Update menu item "\uD83C\uDFED Industries"');
  await client.menuItems.update('Sc_C56L_QY205daoqUY5Ow', {
    label: '\uD83C\uDFED Industries',
    position: 2,
    parent: { id: 'OGGts_hcTBSy-5VWKpsI8A', type: 'menu_item' },
  });

  console.log('Update menu item "Items"');
  await client.menuItems.update('bJawhQc0QcujPnfqqTAawQ', {
    label: 'Items',
    position: 1,
    parent: { id: 'WiJ97c5eQ_SSKdlC8OjFlA', type: 'menu_item' },
  });

  console.log('Update menu item "\uD83D\uDCC6 Events"');
  await client.menuItems.update('WiJ97c5eQ_SSKdlC8OjFlA', { position: 9 });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Tags group"');
  await client.menuItems.update('OGGts_hcTBSy-5VWKpsI8A', { position: 12 });

  console.log('Update menu item "\uD83E\uDD37 404 Page"');
  await client.menuItems.update('OAwwPodJSyyKykRmnvtw4A', { position: 4 });

  console.log('Update menu item "\uD83D\uDCBC Vacancies"');
  await client.menuItems.update('B8G1ojR4QRGOSSYKB3EKDw', { position: 11 });

  console.log('Update menu item "\uD83E\uDD1D Partners"');
  await client.menuItems.update('aZ2S1azHR7OKCbw-38uciw', { position: 13 });

  console.log('Update menu item "\uD83D\uDDDE\uFE0F Publications"');
  await client.menuItems.update('ZVC0BuhuTB-IpR3JZ_o66g', { position: 8 });

  console.log('Update menu item "\uD83D\uDC6C Members"');
  await client.menuItems.update('PvDnlHePR6qf-MFAOwA3gA', {
    label: '\uD83D\uDC6C Members',
    position: 10,
  });

  console.log('Update menu item "Page"');
  await client.menuItems.update('VqrfLbzCSZKR3Q4OX_MFcw', { position: 0 });

  console.log('Update menu item "\uD83C\uDFAD Themes"');
  await client.menuItems.update('dyjOWFO8TDmsud8zmwFvKw', { position: 0 });

  console.log('Update menu item "Items"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', { label: 'Items' });

  console.log('Update menu item "Page"');
  await client.menuItems.update('TrH6-Fy-TECslnJIwmLYTQ', { label: 'Page' });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Theme" (`theme`)'
  );
  await client.schemaMenuItems.update('Vp9tvknWSLGoRPpwZDWkvg', {
    position: 30,
  });
}
