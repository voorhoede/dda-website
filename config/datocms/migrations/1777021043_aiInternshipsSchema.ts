import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "\uD83E\uDD16 AI Internship" (`ai_internship`)');
  await client.itemTypes.create(
    {
      id: 'AsJ5OtcDT2-ojTtm-oQ8aw',
      name: '\uD83E\uDD16 AI Internship',
      api_key: 'ai_internship',
      draft_mode_active: true,
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: true,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'DVzXlNq3T-e6TGyG4biAKw',
    },
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Employees" (`employee`)');
  await client.itemTypes.create(
    {
      id: 'Axl2umvWSoK5WSD-BI4LbA',
      name: '\uD83C\uDFF7\uFE0F Employees',
      api_key: 'employee',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'bMDJyoeURD2Tw1GpmFMtlg',
    },
  );

  console.log('Create model "Email Template" (`email_template`)');
  await client.itemTypes.create(
    {
      id: 'KZzXuwyIRx6cm8P-wq04yg',
      name: 'Email Template',
      api_key: 'email_template',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'ExJBLRtXQ2SB_OAaq2d5ug',
    },
  );

  console.log(
    'Create model "\uD83C\uDFF7\uFE0F AI internship assignment type" (`ai_internship_assignment_type`)',
  );
  await client.itemTypes.create(
    {
      id: 'NnCn8GJ7QlSACa2SGrGISA',
      name: '\uD83C\uDFF7\uFE0F AI internship assignment type',
      api_key: 'ai_internship_assignment_type',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'K6l3uBM2SXyjR3gGUBaANA',
    },
  );

  console.log('Create model "AI Internships Page" (`ai_internships_page`)');
  await client.itemTypes.create(
    {
      id: 'UVZifKysQuOba_YIOMpl6g',
      name: 'AI Internships Page',
      singleton: true,
      api_key: 'ai_internships_page',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'Cg7UxJmuQ_S3Iy5gsJbvrA',
    },
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Track" (`track`)');
  await client.itemTypes.create(
    {
      id: 'auBcI1bfQ9-ST0-3bLIr0A',
      name: '\uD83C\uDFF7\uFE0F Track',
      api_key: 'track',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'SngZWD5oSu2tXUshim_-xQ',
    },
  );

  console.log('Create model "\uD83C\uDFF7\uFE0F Language" (`language`)');
  await client.itemTypes.create(
    {
      id: 'frMjdJGpRXSmyg6ZAjjW-A',
      name: '\uD83C\uDFF7\uFE0F Language',
      api_key: 'language',
      draft_saving_active: false,
      collection_appearance: 'table',
      inverse_relationships_enabled: false,
    },
    {
      skip_menu_item_creation: true,
      schema_menu_item_id: 'IskdvAW8T-aFd7Ph1SO43Q',
    },
  );

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Title" (`title`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'CuRSIxoFR66V610NCcFRyA',
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
    default_value: { nl: null },
  });

  console.log(
    'Create Single asset field "Banner" (`banner`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'KOAgcIvhTr268Gxp0pyuFA',
    label: 'Banner',
    field_type: 'file',
    api_key: 'banner',
    validators: {
      extension: { extensions: [], predefined_list: 'transformable_image' },
    },
    appearance: { addons: [], editor: 'file', parameters: {} },
  });

  console.log(
    'Create Single link field "Language" (`language`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'F55Of9PHTfWyC_yYPhtX2A',
    label: 'Language',
    field_type: 'link',
    api_key: 'language',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['frMjdJGpRXSmyg6ZAjjW-A'],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'link_select',
      parameters: { filters: [] },
    },
  });

  console.log(
    'Create Single link field "Track" (`track`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'KWrXSnYNSwCz38ax-yv1KQ',
    label: 'Track',
    field_type: 'link',
    api_key: 'track',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['auBcI1bfQ9-ST0-3bLIr0A'],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'link_embed',
      parameters: { filters: [] },
    },
  });

  console.log(
    'Create Single link field "Assignment Type" (`assignment_type`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'afnTfUSyQECBiZbDKB0bgA',
    label: 'Assignment Type',
    field_type: 'link',
    api_key: 'assignment_type',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['NnCn8GJ7QlSACa2SGrGISA'],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'link_select',
      parameters: { filters: [] },
    },
  });

  console.log(
    'Create Single link field "Province" (`province`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'f7Cwq4atR-moQMPHQylJxQ',
    label: 'Province',
    field_type: 'link',
    api_key: 'province',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['MBKAE-oATMCeIE8oMGeO8g'],
      },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'link_select',
      parameters: { filters: [] },
    },
  });

  console.log(
    'Create Structured text field "Description" (`description`) in model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    id: 'cfDSDFy3RImvLREg09m7_Q',
    label: 'Description',
    field_type: 'structured_text',
    api_key: 'description',
    localized: true,
    validators: {
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
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
          'inlineItem',
          'itemLink',
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
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Employees" (`employee`)',
  );
  await client.fields.create('Axl2umvWSoK5WSD-BI4LbA', {
    id: 'HI6QYCWGRb6ks3CfEBwPXw',
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
    default_value: { nl: null },
  });

  console.log(
    'Create fieldset "From" in model "Email Template" (`email_template`)',
  );
  await client.fieldsets.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'GT427SQBQAarSxsTjRRCbA',
    title: 'From',
  });

  console.log(
    'Create Single-line string field "Name" (`from_name`) in model "Email Template" (`email_template`)',
  );
  await client.fields.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'eiWfpHZdSyuG-mdRtCRHGg',
    label: 'Name',
    field_type: 'string',
    api_key: 'from_name',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: null },
    fieldset: { id: 'GT427SQBQAarSxsTjRRCbA', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Email Address" (`from_email_address`) in model "Email Template" (`email_template`)',
  );
  await client.fields.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'XYe8VbMiTR2SFI2bZUFiKA',
    label: 'Email Address',
    field_type: 'string',
    api_key: 'from_email_address',
    hint: 'Must be an @dutchdigitalagencies.com email address',
    validators: { required: {}, format: { predefined_pattern: 'email' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    fieldset: { id: 'GT427SQBQAarSxsTjRRCbA', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Subject" (`subject`) in model "Email Template" (`email_template`)',
  );
  await client.fields.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'AgN-INDHQJ-qLvfTl43tWw',
    label: 'Subject',
    field_type: 'string',
    api_key: 'subject',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "Email Template" (`email_template`)',
  );
  await client.fields.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'XweeSCUnR4mjcD_5H9AZiQ',
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
    default_value: { nl: null },
  });

  console.log(
    'Create Structured text field "Body" (`body`) in model "Email Template" (`email_template`)',
  );
  await client.fields.create('KZzXuwyIRx6cm8P-wq04yg', {
    id: 'Er8ugHIrSt2cxL8avNkYZA',
    label: 'Body',
    field_type: 'structured_text',
    api_key: 'body',
    localized: true,
    validators: {
      required: {},
      structured_text_blocks: { item_types: [] },
      structured_text_inline_blocks: { item_types: [] },
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
          'inlineItem',
          'itemLink',
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
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F AI internship assignment type" (`ai_internship_assignment_type`)',
  );
  await client.fields.create('NnCn8GJ7QlSACa2SGrGISA', {
    id: 'B4Pav2bCSvuOV1xq8_O8AQ',
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
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Title" (`title`) in model "AI Internships Page" (`ai_internships_page`)',
  );
  await client.fields.create('UVZifKysQuOba_YIOMpl6g', {
    id: 'PQxBtaa9SZ-Go5KkAul7bw',
    label: 'Title',
    field_type: 'string',
    api_key: 'title',
    localized: true,
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Modular Content (Single block) field "Header" (`header`) in model "AI Internships Page" (`ai_internships_page`)',
  );
  await client.fields.create('UVZifKysQuOba_YIOMpl6g', {
    id: 'AsCV61QTRXOXUsVba7svGg',
    label: 'Header',
    field_type: 'single_block',
    api_key: 'header',
    localized: true,
    validators: {
      single_block_blocks: { item_types: ['HqRofhCbQKGKdMNb7eawoQ'] },
      required: {},
    },
    appearance: {
      addons: [],
      editor: 'framed_single_block',
      parameters: { start_collapsed: false },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Track" (`track`)',
  );
  await client.fields.create('auBcI1bfQ9-ST0-3bLIr0A', {
    id: 'OcQRi5NFQUux8EzN8POR8w',
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
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Language" (`language`)',
  );
  await client.fields.create('frMjdJGpRXSmyg6ZAjjW-A', {
    id: 'InK2vlwOSgKND2M_llcLAg',
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
    default_value: { nl: null },
  });

  console.log(
    'Create Single-line string field "Short name" (`short_name`) in model "\uD83C\uDFF7\uFE0F Language" (`language`)',
  );
  await client.fields.create('frMjdJGpRXSmyg6ZAjjW-A', {
    id: 'WKiMGw6bQl6NuuZfm-LvyA',
    label: 'Short name',
    field_type: 'string',
    api_key: 'short_name',
    localized: true,
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: null },
  });

  console.log(
    'Create fieldset "Contact" in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fieldsets.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'L_BzUhu4QVu7RkuVhISedA',
    title: 'Contact',
    hint: '',
  });

  console.log(
    'Create Single-line string field "Email address" (`email_address`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'ExuuolvnRmyP3gqqIHpyFg',
    label: 'Email address',
    field_type: 'string',
    api_key: 'email_address',
    validators: { format: { predefined_pattern: 'email' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    fieldset: { id: 'L_BzUhu4QVu7RkuVhISedA', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Email address for job applications" (`email_address_for_job_applications`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'J0JBIqQtSUmrenLpqTbxOA',
    label: 'Email address for job applications',
    field_type: 'string',
    api_key: 'email_address_for_job_applications',
    hint: 'Alternative email address for receiving job applications. If left empty, the default contact email will be used.',
    validators: { format: { predefined_pattern: 'email' } },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    fieldset: { id: 'L_BzUhu4QVu7RkuVhISedA', type: 'fieldset' },
  });

  console.log(
    'Create Multiple links field "AI Internships" (`ai_internships`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.create('ByoMKdCkSp6T10UjQm26wg', {
    id: 'Pz9hm2eSQxuIobXrdKkFhQ',
    label: 'AI Internships',
    field_type: 'links',
    api_key: 'ai_internships',
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['AsJ5OtcDT2-ojTtm-oQ8aw'],
      },
    },
    appearance: {
      addons: [],
      editor: 'links_embed',
      parameters: { filters: [] },
    },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Modular Content (Multiple blocks) field "Contact" (`contact`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('EagEZc6jRu-xvc3vmrbaHA', {
    position: 2,
    fieldset: { id: 'L_BzUhu4QVu7RkuVhISedA', type: 'fieldset' },
  });

  console.log(
    'Update Multiple links field "AI Internships" (`ai_internships`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('Pz9hm2eSQxuIobXrdKkFhQ', { position: 8 });

  console.log(
    'Update Single-line string field "Email address" (`email_address`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('ExuuolvnRmyP3gqqIHpyFg', { position: 0 });

  console.log(
    'Update Single-line string field "Email address for job applications" (`email_address_for_job_applications`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('J0JBIqQtSUmrenLpqTbxOA', { position: 1 });

  console.log(
    'Update Single-line string field "Name" (`name`) in model "\uD83C\uDFF7\uFE0F Subject" (`subject`)',
  );
  await client.fields.update('K4lNH_SUQsayLsdgKQlaRg', {
    validators: { required: {}, unique: {} },
  });

  console.log('Finalize models/block models');

  console.log('Update model "\uD83E\uDD16 AI Internship" (`ai_internship`)');
  await client.itemTypes.update('AsJ5OtcDT2-ojTtm-oQ8aw', {
    presentation_title_field: { id: 'CuRSIxoFR66V610NCcFRyA', type: 'field' },
    presentation_image_field: { id: 'KOAgcIvhTr268Gxp0pyuFA', type: 'field' },
    title_field: { id: 'CuRSIxoFR66V610NCcFRyA', type: 'field' },
    image_preview_field: { id: 'KOAgcIvhTr268Gxp0pyuFA', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Employees" (`employee`)');
  await client.itemTypes.update('Axl2umvWSoK5WSD-BI4LbA', {
    presentation_title_field: { id: 'HI6QYCWGRb6ks3CfEBwPXw', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'HI6QYCWGRb6ks3CfEBwPXw', type: 'field' },
  });

  console.log('Update model "Email Template" (`email_template`)');
  await client.itemTypes.update('KZzXuwyIRx6cm8P-wq04yg', {
    presentation_title_field: { id: 'AgN-INDHQJ-qLvfTl43tWw', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'AgN-INDHQJ-qLvfTl43tWw', type: 'field' },
  });

  console.log(
    'Update model "\uD83C\uDFF7\uFE0F AI internship assignment type" (`ai_internship_assignment_type`)',
  );
  await client.itemTypes.update('NnCn8GJ7QlSACa2SGrGISA', {
    presentation_title_field: { id: 'B4Pav2bCSvuOV1xq8_O8AQ', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'B4Pav2bCSvuOV1xq8_O8AQ', type: 'field' },
  });

  console.log('Update model "AI Internships Page" (`ai_internships_page`)');
  await client.itemTypes.update('UVZifKysQuOba_YIOMpl6g', {
    presentation_title_field: { id: 'PQxBtaa9SZ-Go5KkAul7bw', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'PQxBtaa9SZ-Go5KkAul7bw', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Track" (`track`)');
  await client.itemTypes.update('auBcI1bfQ9-ST0-3bLIr0A', {
    presentation_title_field: { id: 'OcQRi5NFQUux8EzN8POR8w', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'OcQRi5NFQUux8EzN8POR8w', type: 'field' },
  });

  console.log('Update model "\uD83C\uDFF7\uFE0F Language" (`language`)');
  await client.itemTypes.update('frMjdJGpRXSmyg6ZAjjW-A', {
    presentation_title_field: { id: 'InK2vlwOSgKND2M_llcLAg', type: 'field' },
    presentation_image_field: null,
    title_field: { id: 'InK2vlwOSgKND2M_llcLAg', type: 'field' },
  });

  console.log('Manage menu items');

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Employees"');
  await client.menuItems.create({
    id: 'BzB3zZ4ISmi4FG7eyZZ22w',
    label: '\uD83C\uDFF7\uFE0F Employees',
    item_type: { id: 'Axl2umvWSoK5WSD-BI4LbA', type: 'item_type' },
  });

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Language"');
  await client.menuItems.create({
    id: 'Dsy64GpVSUmA60THUTV9Vw',
    label: '\uD83C\uDFF7\uFE0F Language',
    item_type: { id: 'frMjdJGpRXSmyg6ZAjjW-A', type: 'item_type' },
  });

  console.log(
    'Create menu item "\uD83C\uDFF7\uFE0F AI internship assignment type"',
  );
  await client.menuItems.create({
    id: 'Pgl67gNDToKh8QZcR7OUEA',
    label: '\uD83C\uDFF7\uFE0F AI internship assignment type',
    item_type: { id: 'NnCn8GJ7QlSACa2SGrGISA', type: 'item_type' },
  });

  console.log('Create menu item "Email Template"');
  await client.menuItems.create({
    id: 'VBWbkhOiRpK7fSaAmNw55Q',
    label: 'Email Template',
    item_type: { id: 'KZzXuwyIRx6cm8P-wq04yg', type: 'item_type' },
  });

  console.log('Create menu item "\uD83C\uDFF7\uFE0F Track"');
  await client.menuItems.create({
    id: 'aR6fP0nBTy2C6fRi6bICEg',
    label: '\uD83C\uDFF7\uFE0F Track',
    item_type: { id: 'auBcI1bfQ9-ST0-3bLIr0A', type: 'item_type' },
  });

  console.log('Create menu item "\uD83E\uDD16 AI Internships"');
  await client.menuItems.create({
    id: 'f-wWw7K_TaSCah7jELbGwA',
    label: '\uD83E\uDD16 AI Internships',
  });

  console.log('Create menu item "Items"');
  await client.menuItems.create({
    id: 'DMIoPeetT7ezByHP5PY9Tw',
    label: 'Items',
    item_type: { id: 'AsJ5OtcDT2-ojTtm-oQ8aw', type: 'item_type' },
    parent: { id: 'f-wWw7K_TaSCah7jELbGwA', type: 'menu_item' },
  });

  console.log('Create menu item "Page"');
  await client.menuItems.create({
    id: 'e4fWnISITAWPehIk6Woc_Q',
    label: 'Page',
    item_type: { id: 'UVZifKysQuOba_YIOMpl6g', type: 'item_type' },
    parent: { id: 'f-wWw7K_TaSCah7jELbGwA', type: 'menu_item' },
  });

  console.log('Update menu item "\uD83E\uDD16 AI Internships"');
  await client.menuItems.update('f-wWw7K_TaSCah7jELbGwA', { position: 20 });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Employees"');
  await client.menuItems.update('BzB3zZ4ISmi4FG7eyZZ22w', { position: 24 });

  console.log('Update menu item "Email Template"');
  await client.menuItems.update('VBWbkhOiRpK7fSaAmNw55Q', { position: 25 });

  console.log('Update menu item "\uD83C\uDFF7\uFE0F Track"');
  await client.menuItems.update('aR6fP0nBTy2C6fRi6bICEg', { position: 22 });

  console.log('Update menu item "Page"');
  await client.menuItems.update('e4fWnISITAWPehIk6Woc_Q', { position: 0 });

  console.log('Update menu item "Items"');
  await client.menuItems.update('DMIoPeetT7ezByHP5PY9Tw', { position: 1 });

  console.log('Manage schema menu items');

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F AI internship assignment type" (`ai_internship_assignment_type`)',
  );
  await client.schemaMenuItems.update('K6l3uBM2SXyjR3gGUBaANA', {
    position: 26,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Track" (`track`)',
  );
  await client.schemaMenuItems.update('SngZWD5oSu2tXUshim_-xQ', {
    position: 34,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Language" (`language`)',
  );
  await client.schemaMenuItems.update('IskdvAW8T-aFd7Ph1SO43Q', {
    position: 35,
  });

  console.log(
    'Update model schema menu item for model "\uD83C\uDFF7\uFE0F Employees" (`employee`)',
  );
  await client.schemaMenuItems.update('bMDJyoeURD2Tw1GpmFMtlg', {
    position: 36,
  });

  console.log(
    'Update model schema menu item for model "Email Template" (`email_template`)',
  );
  await client.schemaMenuItems.update('ExJBLRtXQ2SB_OAaq2d5ug', {
    position: 57,
  });

  console.log(
    'Update model schema menu item for model "\uD83E\uDD16 AI Internship" (`ai_internship`)',
  );
  await client.schemaMenuItems.update('DVzXlNq3T-e6TGyG4biAKw', {
    position: 56,
  });

  console.log('Update permissions for environment in role Member');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [
        {
          item_type: 'AsJ5OtcDT2-ojTtm-oQ8aw',
          action: 'read',
          on_creator: 'self',
        },
        {
          item_type: 'AsJ5OtcDT2-ojTtm-oQ8aw',
          action: 'create',
          localization_scope: 'all',
        },
        {
          item_type: 'AsJ5OtcDT2-ojTtm-oQ8aw',
          action: 'update',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'AsJ5OtcDT2-ojTtm-oQ8aw',
          action: 'publish',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'AsJ5OtcDT2-ojTtm-oQ8aw',
          action: 'delete',
          on_creator: 'self',
        },
        {
          item_type: 'auBcI1bfQ9-ST0-3bLIr0A',
          action: 'read',
          on_creator: 'anyone',
        },
        {
          item_type: 'NnCn8GJ7QlSACa2SGrGISA',
          action: 'read',
          on_creator: 'anyone',
        },
        {
          item_type: 'frMjdJGpRXSmyg6ZAjjW-A',
          action: 'read',
          on_creator: 'anyone',
        },
      ],
    },
  });
}
