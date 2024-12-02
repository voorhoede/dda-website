import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "Members Page" (`members_page`)');
  await client.itemTypes.create(
    {
      id: 'DIB1XvrHTH2pOK8tMn6p8Q',
      name: 'Members Page',
      singleton: true,
      api_key: 'members_page',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'VqOBMC_0Th-5Y18Ura9q2w',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Members Page" (`members_page`)',
  );
  await client.fields.create('DIB1XvrHTH2pOK8tMn6p8Q', {
    id: 'M6dNTqFAR1e8PG1cdJPicg',
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
    'Create Structured text field "Description" (`description`) in model "Members Page" (`members_page`)',
  );
  await client.fields.create('DIB1XvrHTH2pOK8tMn6p8Q', {
    id: 'U1gs5TO7RGqIUOU_iFiICw',
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
        nodes: ['blockquote', 'link'],
        heading_levels: [],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create SEO meta tags field "SEO" (`seo`) in model "Members Page" (`members_page`)',
  );
  await client.fields.create('DIB1XvrHTH2pOK8tMn6p8Q', {
    id: 'Bj-gxMZHQJSTRYCoWm4bhw',
    label: 'SEO',
    field_type: 'seo',
    api_key: 'seo',
    localized: true,
    validators: { title_length: { max: 60 }, description_length: { max: 320 } },
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
    'Create Single link field "Industry" (`industry`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'Gsfoe789Rqe5dKTuxQsx3g',
    label: 'Industry',
    field_type: 'link',
    api_key: 'industry',
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
    'Create Multiple links field "Expertises" (`expertises`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'e7JqROgbQDGHEjkPqbOk7Q',
    label: 'Expertises',
    field_type: 'links',
    api_key: 'expertises',
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

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single link field "Industry" (`industry`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('Gsfoe789Rqe5dKTuxQsx3g', { position: 11 });

  console.log(
    'Update Multiple links field "Expertises" (`expertises`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('e7JqROgbQDGHEjkPqbOk7Q', { position: 12 });

  console.log(
    'Update Modular Content (Multiple blocks) field "Cases" (`cases`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('IrP5Hr0BRvCOh2GTVc5jJg', {
    appearance: {
      addons: [],
      editor: 'rich_text',
      parameters: { start_collapsed: true },
    },
  });

  console.log(
    'Update Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Expertise" (`expertise`)',
  );
  await client.fields.update('ahEY4YWRQoqzzaJ9AYaVjQ', {
    label: 'Name',
    api_key: 'name',
  });

  console.log('Finalize models/block models');

  console.log('Update model "Members Page" (`members_page`)');
  await client.itemTypes.update('DIB1XvrHTH2pOK8tMn6p8Q', {
    title_field: { id: 'M6dNTqFAR1e8PG1cdJPicg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "Members"');
  await client.menuItems.create({
    id: 'PvDnlHePR6qf-MFAOwA3gA',
    label: 'Members',
  });

  console.log('Create menu item "Members Page"');
  await client.menuItems.create({
    id: 'TrH6-Fy-TECslnJIwmLYTQ',
    label: 'Members Page',
    item_type: { id: 'DIB1XvrHTH2pOK8tMn6p8Q', type: 'item_type' },
    parent: { id: 'PvDnlHePR6qf-MFAOwA3gA', type: 'menu_item' },
  });

  console.log('Update menu item "\uD83D\uDCC1 Members"');
  await client.menuItems.update('JEi1uOnCR-O7eIx35FRbwA', {
    position: 9,
    parent: { id: 'PvDnlHePR6qf-MFAOwA3gA', type: 'menu_item' },
  });

  console.log('Update menu item "Items"');
  await client.menuItems.update('V0beSlN3RH61sM8f7-ed1Q', { position: 7 });

  console.log('Update menu item "Members"');
  await client.menuItems.update('PvDnlHePR6qf-MFAOwA3gA', { position: 9 });

  console.log('Update menu item "\uD83D\uDCBC Vacancies"');
  await client.menuItems.update('B8G1ojR4QRGOSSYKB3EKDw', { position: 15 });

  console.log('Update menu item "\uD83E\uDD37 404 Page"');
  await client.menuItems.update('OAwwPodJSyyKykRmnvtw4A', { position: 8 });

  console.log('Update menu item "Members Page"');
  await client.menuItems.update('TrH6-Fy-TECslnJIwmLYTQ', { position: 0 });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Tag" (`tag`)',
  );
  await client.schemaMenuItems.update('QO4FwrScR4GnpQYD4zdFOA', {
    position: 21,
  });

  console.log(
    'Update model schema menu item for model "Members Page" (`members_page`)',
  );
  await client.schemaMenuItems.update('VqOBMC_0Th-5Y18Ura9q2w', {
    position: 30,
  });

  console.log('Update permissions for environment in role Editor');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [{ action: 'all', on_creator: 'anyone', localization_scope: 'all' }],
    },
  });
}
