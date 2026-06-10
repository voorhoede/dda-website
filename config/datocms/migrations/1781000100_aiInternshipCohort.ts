import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Create new models/block models');

  console.log('Create model "🎓 Cohort" (`cohort`)');
  const cohortModel = await client.itemTypes.create({
    name: '🎓 Cohort',
    api_key: 'cohort',
    collection_appearance: 'table',
    inverse_relationships_enabled: false,
  });

  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Single-line string field "Name" (`name`) in model "🎓 Cohort" (`cohort`)',
  );
  const nameField = await client.fields.create(cohortModel.id, {
    label: 'Name',
    field_type: 'string',
    api_key: 'name',
    hint: 'Label for the cohort, e.g. "September 2026".',
    validators: { required: {}, unique: {} },
    appearance: {
      addons: [],
      editor: 'single_line',
      parameters: { heading: false, placeholder: null },
    },
    default_value: '',
  });

  console.log(
    'Create Date field "Start date" (`start_date`) in model "🎓 Cohort" (`cohort`)',
  );
  await client.fields.create(cohortModel.id, {
    label: 'Start date',
    field_type: 'date',
    api_key: 'start_date',
    hint: 'The date this cohort starts.',
    validators: { required: {} },
    appearance: {
      addons: [],
      editor: 'date_picker',
      parameters: {},
    },
  });

  console.log('Finalize models/block models');

  console.log('Update model "🎓 Cohort" (`cohort`)');
  await client.itemTypes.update(cohortModel.id, {
    title_field: { id: nameField.id, type: 'field' },
  });

  console.log(
    'Create Single link field "Cohort" (`cohort`) in model "🤖 AI Internship" (`ai_internship`)',
  );
  await client.fields.create('AsJ5OtcDT2-ojTtm-oQ8aw', {
    label: 'Cohort',
    field_type: 'link',
    api_key: 'cohort',
    hint: 'The cohort (intake) this internship belongs to.',
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: [cohortModel.id],
      },
    },
    appearance: {
      addons: [],
      editor: 'link_select',
      parameters: { filters: [] },
    },
  });
}
