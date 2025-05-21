import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Creating new fields/fieldsets');

  console.log(
    'Create Date field "End Date" (`end_date`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.create('WsNJp5eaRz2-QZserzWOTw', {
    id: 'GRWl8sW1RXmjBr5x5874UA',
    label: 'End Date',
    field_type: 'date',
    api_key: 'end_date',
    hint: 'Optional \u2014 fill in only for multi-day events',
    appearance: { addons: [], editor: 'date_picker', parameters: {} },
  });

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Date field "End Date" (`end_date`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.update('GRWl8sW1RXmjBr5x5874UA', { position: 4 });

  console.log(
    'Update Date field "Start Date" (`start_date`) in model "\uD83D\uDCC6 Event" (`event`)',
  );
  await client.fields.update('ZVd_2vrpRre1mx23DlHHcg', {
    label: 'Start Date',
    api_key: 'start_date',
  });
}
