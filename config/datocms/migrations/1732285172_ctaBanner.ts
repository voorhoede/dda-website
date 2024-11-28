import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log(
    'Create fieldset "CTA" in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fieldsets.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'XhV0jkHiSeij3m-lKj-XMg',
    title: 'CTA',
  });

  console.log(
    'Create Single-line string field "Message" (`cta_section_message`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'B6nmbYWnQiarAgYtNUdaEg',
    label: 'Message',
    field_type: 'string',
    api_key: 'cta_section_message',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
    fieldset: { id: 'XhV0jkHiSeij3m-lKj-XMg', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "Title" (`cta_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'ZtZKZmP1SuOXFlmKNr2yfA',
    label: 'Title',
    field_type: 'string',
    api_key: 'cta_section_title',
    localized: true,
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: { nl: '' },
    fieldset: { id: 'XhV0jkHiSeij3m-lKj-XMg', type: 'fieldset' },
  });

  console.log(
    'Create Single-line string field "CTA Label" (`cta_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.create('AWOhQlrVRK-r09nRy0PPFw', {
    id: 'AwF-59VQT4m-bNbMcw_0wg',
    label: 'CTA Label',
    field_type: 'string',
    api_key: 'cta_section_cta_label',
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
    fieldset: { id: 'XhV0jkHiSeij3m-lKj-XMg', type: 'fieldset' },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Message" (`cta_section_message`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('B6nmbYWnQiarAgYtNUdaEg', { position: 0 });

  console.log(
    'Update Single-line string field "Title" (`cta_section_title`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('ZtZKZmP1SuOXFlmKNr2yfA', { position: 1 });

  console.log(
    'Update Single-line string field "CTA Label" (`cta_section_cta_label`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('AwF-59VQT4m-bNbMcw_0wg', { position: 2 });
}
