import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83D\uDDDE\uFE0F Publication" (`publication`)');
  await client.itemTypes.create(
    {
      id: 'UllaGfcETuK2MTg4FIMw3w',
      name: '\uD83D\uDDDE\uFE0F Publication',
      api_key: 'publication',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'AbtAxAd6RWyePL1v88aIcQ',
    },
  );

  console.log('Create model "Publications page" (`publications_page`)');
  await client.itemTypes.create(
    {
      id: 'AvM1EYonTfqynDlXSGmGjw',
      name: 'Publications page',
      singleton: true,
      api_key: 'publications_page',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'OQKH-S6pSa2a_vCuIao9iQ',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'Gcz8scSQTQm0huPpvdnNDg',
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
    'Create SEO meta tags field "SEO" (`seo`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'edCdEhttShG5wUIjAoVCpA',
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
    'Create Multiple links field "Tags" (`tags`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'bSK_UVTqTM2BgCcRkkXcgQ',
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
    'Create Single asset field "Banner" (`banner`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'FcYn-dnwReqrLmZgGkWyzQ',
    label: 'Banner',
    field_type: 'file',
    api_key: 'banner',
    validators: { required: {} },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Structured text field "Content" (`content`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'G0WEoKvvR5CrxssDg3esmg',
    label: 'Content',
    field_type: 'structured_text',
    api_key: 'content',
    validators: {
      required: {},
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
  });

  console.log(
    'Create Slug field "Slug" (`slug`) in model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.fields.create('UllaGfcETuK2MTg4FIMw3w', {
    id: 'QBK0RhdqQxiS0cRjWMOT9w',
    label: 'Slug',
    field_type: 'slug',
    api_key: 'slug',
    localized: true,
    validators: {
      slug_title_field: { title_field_id: 'Gcz8scSQTQm0huPpvdnNDg' },
      slug_format: { predefined_pattern: 'webpage_slug' },
    },
    appearance: {
      addons: [],
      editor: 'slug',
      parameters: { url_prefix: null, placeholder: null },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.create('AvM1EYonTfqynDlXSGmGjw', {
    id: 'd02ldAr7SdGd0sDkr3ePGw',
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
    'Create Structured text field "Subtitle" (`subtitle`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.create('AvM1EYonTfqynDlXSGmGjw', {
    id: 'JU5Pv2AORWqc_WJiFRGwtQ',
    label: 'Subtitle',
    field_type: 'structured_text',
    api_key: 'subtitle',
    localized: true,
    validators: {
      required: {},
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
    'Create SEO meta tags field "SEO" (`seo`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.create('AvM1EYonTfqynDlXSGmGjw', {
    id: 'NAyATHirSZiQV7mOcH0H0Q',
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

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD Text Block" (`text_block`)',
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
        heading_levels: [2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
  });

  console.log('Delete model "\uD83D\uDCF0 News" (`news`)');
  await client.itemTypes.destroy('Wo2OFS4fSQaxAIeWkOI_-g', {
    skip_menu_items_deletion: true,
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83D\uDDDE\uFE0F Publications"');
  await client.menuItems.create({
    id: 'ZVC0BuhuTB-IpR3JZ_o66g',
    label: '\uD83D\uDDDE\uFE0F Publications',
  });

  console.log('Create menu item "Items"');
  await client.menuItems.create({
    id: 'dd0F4TKaSsi4RVaihKJLBA',
    label: 'Items',
    item_type: { id: 'UllaGfcETuK2MTg4FIMw3w', type: 'item_type' },
    parent: { id: 'ZVC0BuhuTB-IpR3JZ_o66g', type: 'menu_item' },
  });

  console.log('Create menu item "Page"');
  await client.menuItems.create({
    id: 'IDcpwwE0TY6W8eiPCCJ0Qg',
    label: 'Page',
    item_type: { id: 'AvM1EYonTfqynDlXSGmGjw', type: 'item_type' },
    parent: { id: 'ZVC0BuhuTB-IpR3JZ_o66g', type: 'menu_item' },
  });

  console.log('Delete menu item "\uD83D\uDCF0 News"');
  await client.menuItems.destroy('ENGigSlBTcG98rKaD9Xl_Q');

  console.log('Update menu item "Page"');
  await client.menuItems.update('IDcpwwE0TY6W8eiPCCJ0Qg', { position: 0 });

  console.log('Update menu item "\uD83E\uDD37 404 Page"');
  await client.menuItems.update('OAwwPodJSyyKykRmnvtw4A', { position: 8 });

  console.log('Update menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', { position: 9 });

  console.log('Update menu item "\uD83D\uDCBC Vacancy"');
  await client.menuItems.update('V0beSlN3RH61sM8f7-ed1Q', { position: 7 });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Tags"');
  await client.menuItems.update('FM5AHAT2Sn6aGG_oHNCzRQ', { position: 12 });

  console.log('Update menu item "\uD83E\uDD1D Partners"');
  await client.menuItems.update('aZ2S1azHR7OKCbw-38uciw', { position: 11 });

  console.log('Update menu item "\uD83D\uDDDE\uFE0F Publications"');
  await client.menuItems.update('ZVC0BuhuTB-IpR3JZ_o66g', { position: 13 });

  console.log('Update menu item "Items"');
  await client.menuItems.update('dd0F4TKaSsi4RVaihKJLBA', { position: 1 });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83E\uDD1D Partner" (`partner`)',
  );
  await client.schemaMenuItems.update('VXgXLXnQQryR3w_3j2prRw', {
    position: 23,
  });

  console.log(
    'Update model schema menu item for model "\uD83D\uDDDE\uFE0F Publication" (`publication`)',
  );
  await client.schemaMenuItems.update('AbtAxAd6RWyePL1v88aIcQ', {
    position: 24,
  });

  console.log(
    'Update model schema menu item for model "Publications page" (`publications_page`)',
  );
  await client.schemaMenuItems.update('OQKH-S6pSa2a_vCuIao9iQ', {
    position: 25,
  });
}
