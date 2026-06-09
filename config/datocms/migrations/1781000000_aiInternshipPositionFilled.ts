import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Boolean field "Position filled" (`position_filled`) in model "🤖 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    label: 'Position filled',
    field_type: 'boolean',
    api_key: 'position_filled',
    hint: 'When enabled, this internship stays visible but is shown greyed out in the overview and the application form is hidden on the detail page.',
    appearance: {
      addons: [],
      editor: 'boolean',
      parameters: {},
    },
    default_value: false,
  });
}
