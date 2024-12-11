import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create block model "Page header" (`page_header`)');
  await client.itemTypes.create(
    {
      id: 'HqRofhCbQKGKdMNb7eawoQ',
      name: 'Page header',
      api_key: 'page_header',
      modular_block: true,
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'dAVpgzTMSz-29EIFT4FlDA',
    },
  );

  console.log('Create model "Record count" (`record_count`)');
  await client.itemTypes.create(
    {
      id: 'AUh1SEj_Tz2rbRMfJ2RfrQ',
      name: 'Record count',
      api_key: 'record_count',
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'HjKUMcOHSMSF0CEqId80Ew',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in block model "Page header" (`page_header`)',
  );
  await client.fields.create('HqRofhCbQKGKdMNb7eawoQ', {
    id: 'H5e_aKbfQvyjp2vsKPEGLg',
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
    'Create Structured text field "Subtitle" (`subtitle`) in block model "Page header" (`page_header`)',
  );
  await client.fields.create('HqRofhCbQKGKdMNb7eawoQ', {
    id: 'ca9s1pTRQMGMtpxhEVGYqg',
    label: 'Subtitle',
    field_type: 'structured_text',
    api_key: 'subtitle',
    validators: {
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['AUh1SEj_Tz2rbRMfJ2RfrQ'],
      },
    },
    appearance: {
      addons: [],
      editor: 'structured_text',
      parameters: {
        marks: ['emphasis', 'strong'],
        nodes: ['link'],
        heading_levels: [1, 2, 3, 4, 5, 6],
        blocks_start_collapsed: false,
        show_links_meta_editor: false,
        show_links_target_blank: true,
      },
    },
  });

  console.log(
    'Create Modular Content (Single block) field "Visual" (`visual`) in block model "Page header" (`page_header`)',
  );
  await client.fields.create('HqRofhCbQKGKdMNb7eawoQ', {
    id: 'Ilfn7UMnQaqGD747u4VllA',
    label: 'Visual',
    field_type: 'single_block',
    api_key: 'visual',
    validators: {
      single_block_blocks: {
        item_types: ['ZdBokLsWRgKKjHrKeJzdpw', 'gezG9nO7SfaiWcWnp-HNqw'],
      },
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
  });

  console.log(
    'Create Single-line string field "Record type" (`record_type`) in model "Record count" (`record_count`)',
  );
  await client.fields.create('AUh1SEj_Tz2rbRMfJ2RfrQ', {
    id: 'fFN5LKBFR8upgRwk1ShQcg',
    label: 'Record type',
    field_type: 'string',
    api_key: 'record_type',
    hint: 'The name of the model that will be used to show the total count of',
    appearance: {
      addons: [],
      editor: 'string_select',
      parameters: {
        options: [
          { hint: '', label: 'Members', value: 'members' },
          { hint: '', label: 'Vacancies', value: 'vacancies' },
        ],
      },
    },
    default_value: '',
  });

  console.log(
    'Create Modular Content (Single block) field "Header" (`header`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'MT7cMJoIRW-ioCV6LSVPqg',
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
    'Create Modular Content (Single block) field "Header" (`header`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.create('AvM1EYonTfqynDlXSGmGjw', {
    id: 'NOJsjEVpTL2nReJkWh9OWg',
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
    'Create Modular Content (Single block) field "Header" (`header`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.create('AVYmi04HRvyHIEjyxDgF8A', {
    id: 'cL7ehluET2SYRTVr08zGig',
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
    'Create Modular Content (Single block) field "Header" (`header`) in model "Members Page" (`members_page`)',
  );
  await client.fields.create('DIB1XvrHTH2pOK8tMn6p8Q', {
    id: 'A-ijk4gWQmu27XHrRKSDFQ',
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
    'Create Modular Content (Single block) field "Header" (`header`) in model "Events Page" (`events_page`)',
  );
  await client.fields.create('CvaytqzTRs-iu_Rcur5ZLQ', {
    id: 'YrU1_bSnSCuigDuA2pZgUg',
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

  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.destroy('QKCBCOFcTAClHXz_S-PKSQ');

  console.log(
    'Delete Single-line string field "Subtitle" (`subtitle`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.destroy('fzXxG5kJSuSlLboSYgu4Ew');

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.destroy('d02ldAr7SdGd0sDkr3ePGw');

  console.log(
    'Delete Structured text field "Subtitle" (`subtitle`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.destroy('JU5Pv2AORWqc_WJiFRGwtQ');

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.destroy('CCLwa3_PS0Gi7Wok_F3MLA');

  console.log(
    'Delete Structured text field "Subtitle" (`subtitle`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.destroy('DR4rcs-6SFm-gdcPI-BmVw');

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "Members Page" (`members_page`)',
  );
  await client.fields.destroy('M6dNTqFAR1e8PG1cdJPicg');

  console.log(
    'Delete Structured text field "Description" (`description`) in model "Members Page" (`members_page`)',
  );
  await client.fields.destroy('U1gs5TO7RGqIUOU_iFiICw');

  console.log(
    'Delete Single-line string field "Title" (`title`) in model "Events Page" (`events_page`)',
  );
  await client.fields.destroy('ACmQSImuRDm-uMQZU1-JMg');

  console.log(
    'Delete Structured text field "Description" (`description`) in model "Events Page" (`events_page`)',
  );
  await client.fields.destroy('IdBQzWduQLOBksrnYYU_jw');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('MT7cMJoIRW-ioCV6LSVPqg', { position: 1 });

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "Publications page" (`publications_page`)',
  );
  await client.fields.update('NOJsjEVpTL2nReJkWh9OWg', { position: 1 });

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "Vacancies page" (`vacancies_page`)',
  );
  await client.fields.update('cL7ehluET2SYRTVr08zGig', { position: 1 });

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "Members Page" (`members_page`)',
  );
  await client.fields.update('A-ijk4gWQmu27XHrRKSDFQ', { position: 1 });

  console.log(
    'Update Modular Content (Single block) field "Header" (`header`) in model "Events Page" (`events_page`)',
  );
  await client.fields.update('YrU1_bSnSCuigDuA2pZgUg', { position: 1 });

  console.log('Finalize models/block models');

  console.log('Update model "Record count" (`record_count`)');
  await client.itemTypes.update('AUh1SEj_Tz2rbRMfJ2RfrQ', {
    title_field: { id: 'fFN5LKBFR8upgRwk1ShQcg', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFE0 Home" (`home_page`)');
  await client.itemTypes.update('AWOhQlrVRK-r09nRy0PPFw', {
    title_field: null,
  });

  console.log('Update model "Publications page" (`publications_page`)');
  await client.itemTypes.update('AvM1EYonTfqynDlXSGmGjw', {
    title_field: null,
  });

  console.log('Update model "Vacancies page" (`vacancies_page`)');
  await client.itemTypes.update('AVYmi04HRvyHIEjyxDgF8A', {
    title_field: null,
  });

  console.log('Update model "Members Page" (`members_page`)');
  await client.itemTypes.update('DIB1XvrHTH2pOK8tMn6p8Q', {
    title_field: null,
  });

  console.log('Update model "Events Page" (`events_page`)');
  await client.itemTypes.update('CvaytqzTRs-iu_Rcur5ZLQ', {
    title_field: null,
  });
}
