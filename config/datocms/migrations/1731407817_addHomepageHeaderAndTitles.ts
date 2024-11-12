import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log(
    'Create fieldset "Events" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'TDMFWm4xTWmLjKk0wjBx2A',
    title: 'Events',
    collapsible: true,
  });

  console.log(
    'Create fieldset "Vacancies" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'b_wpZbA2SpqxKjHDP8cXyQ',
    title: 'Vacancies',
    collapsible: true,
  });

  console.log(
    'Create fieldset "Publications" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'bB1oOk5GTUux2YsNYO8oEg',
    title: 'Publications',
    collapsible: true,
  });

  console.log(
    'Create Single-line string field "Label" (`events_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'U4J3tRWdTtmghtvyn6ZWWg',
    label: 'Label',
    field_type: 'string',
    api_key: 'events_section_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'TDMFWm4xTWmLjKk0wjBx2A', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Label" (`vacancies_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'WiOOdKODTzic6scG7zwA0g',
    label: 'Label',
    field_type: 'string',
    api_key: 'vacancies_section_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'b_wpZbA2SpqxKjHDP8cXyQ', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Label" (`publications_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Z_kIrwRTT_-0umJv2OsgOw',
    label: 'Label',
    field_type: 'string',
    api_key: 'publications_section_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'bB1oOk5GTUux2YsNYO8oEg', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Title" (`publications_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Zk3-KDGyRiqxKG9aeLz9AA',
    label: 'Title',
    field_type: 'string',
    api_key: 'publications_section_title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'bB1oOk5GTUux2YsNYO8oEg', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Title" (`events_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'OVA5H2PVQRONXUbDHGzQ8A',
    label: 'Title',
    field_type: 'string',
    api_key: 'events_section_title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'TDMFWm4xTWmLjKk0wjBx2A', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Title" (`vacancies_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'AVZKKbvvSNaITlOyVsTRPA',
    label: 'Title',
    field_type: 'string',
    api_key: 'vacancies_section_title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'b_wpZbA2SpqxKjHDP8cXyQ', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "CTA Label" (`publications_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Nox_4xiZRJ2A7mdITCgdgg',
    label: 'CTA Label',
    field_type: 'string',
    api_key: 'publications_section_cta_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'bB1oOk5GTUux2YsNYO8oEg', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "CTA Label" (`events_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'NkpBY7PWTBimsC8Oy4d54g',
    label: 'CTA Label',
    field_type: 'string',
    api_key: 'events_section_cta_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'TDMFWm4xTWmLjKk0wjBx2A', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "CTA Label" (`vacancies_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Tm9TNRz7StGjQlG99Z9c4g',
    label: 'CTA Label',
    field_type: 'string',
    api_key: 'vacancies_section_cta_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
    fieldset: { id: 'b_wpZbA2SpqxKjHDP8cXyQ', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Subtitle" (`subtitle`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'fzXxG5kJSuSlLboSYgu4Ew',
    label: 'Subtitle',
    field_type: 'string',
    api_key: 'subtitle',
    hint: '{{number}} will be replaced with the agencies count.',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
  });

  console.log(
    'Create Single-line string field "Become member CTA label" (`become_member_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'DHAso7nAT1GSY8kZuLHXzQ',
    label: 'Become member CTA label',
    field_type: 'string',
    api_key: 'become_member_cta_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
  });

  console.log(
    'Create Single-line string field "Find agency CTA label" (`find_agency_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'FXdVtWIFSJSpnmECnInpXw',
    label: 'Find agency CTA label',
    field_type: 'string',
    api_key: 'find_agency_cta_label',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { en: '', nl: '' },
  });

  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.destroy('pUj2PObgTyC-8X4lvZLMBA');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update fieldset "Events" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.update('TDMFWm4xTWmLjKk0wjBx2A', { position: 6 });

  console.log(
    'Update fieldset "Vacancies" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.update('b_wpZbA2SpqxKjHDP8cXyQ', { position: 7 });

  console.log(
    'Update fieldset "Publications" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.update('bB1oOk5GTUux2YsNYO8oEg', { position: 8 });

  console.log(
    'Update Single-line string field "Subtitle" (`subtitle`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('fzXxG5kJSuSlLboSYgu4Ew', { position: 3 });

  console.log(
    'Update Single-line string field "Become member CTA label" (`become_member_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('DHAso7nAT1GSY8kZuLHXzQ', { position: 4 });

  console.log(
    'Update Single-line string field "Label" (`events_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('U4J3tRWdTtmghtvyn6ZWWg', { position: 0 });

  console.log(
    'Update Single-line string field "Label" (`vacancies_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('WiOOdKODTzic6scG7zwA0g', { position: 0 });

  console.log(
    'Update Single-line string field "Label" (`publications_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Z_kIrwRTT_-0umJv2OsgOw', { position: 0 });

  console.log(
    'Update Single-line string field "Title" (`publications_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Zk3-KDGyRiqxKG9aeLz9AA', { position: 1 });

  console.log(
    'Update Single-line string field "Title" (`events_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('OVA5H2PVQRONXUbDHGzQ8A', { position: 1 });

  console.log(
    'Update Single-line string field "Title" (`vacancies_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('AVZKKbvvSNaITlOyVsTRPA', { position: 1 });

  console.log(
    'Update Single-line string field "CTA Label" (`publications_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Nox_4xiZRJ2A7mdITCgdgg', { position: 2 });

  console.log(
    'Update Single-line string field "CTA Label" (`events_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('NkpBY7PWTBimsC8Oy4d54g', { position: 2 });

  console.log(
    'Update Single-line string field "CTA Label" (`vacancies_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('Tm9TNRz7StGjQlG99Z9c4g', { position: 2 });

  console.log(
    'Update SEO meta tags field "SEO" (`seo`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('FU5kzyaqQLWzk1hjI1keKw', { position: 2 });
}
