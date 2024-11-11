import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

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

  console.log(
    'Create Single-line string field "Events section label" (`events_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'U4J3tRWdTtmghtvyn6ZWWg',
    label: 'Events section label',
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
  });

  console.log(
    'Create Single-line string field "Events section title" (`events_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'OVA5H2PVQRONXUbDHGzQ8A',
    label: 'Events section title',
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
  });

  console.log(
    'Create Single-line string field "Events section CTA label" (`events_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'NkpBY7PWTBimsC8Oy4d54g',
    label: 'Events section CTA label',
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
  });

  console.log(
    'Create Single-line string field "Vacancies section label" (`vacancies_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'WiOOdKODTzic6scG7zwA0g',
    label: 'Vacancies section label',
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
  });

  console.log(
    'Create Single-line string field "Vacancies section title" (`vacancies_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'AVZKKbvvSNaITlOyVsTRPA',
    label: 'Vacancies section title',
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
  });

  console.log(
    'Create Single-line string field "Vacancies section CTA label" (`vacancies_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Tm9TNRz7StGjQlG99Z9c4g',
    label: 'Vacancies section CTA label',
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
  });

  console.log(
    'Create Single-line string field "Publications section label" (`publications_section_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Z_kIrwRTT_-0umJv2OsgOw',
    label: 'Publications section label',
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
  });

  console.log(
    'Create Single-line string field "Publications section title" (`publications_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Zk3-KDGyRiqxKG9aeLz9AA',
    label: 'Publications section title',
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
  });

  console.log(
    'Create Single-line string field "Publications section CTA label" (`publications_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'Nox_4xiZRJ2A7mdITCgdgg',
    label: 'Publications section CTA label',
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
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('pUj2PObgTyC-8X4lvZLMBA', { position: 6 });
}
