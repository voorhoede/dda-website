import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Phone" (`phone`) in block model "Contact block" (`contact_block`)',
  );
  await client.fields.update('QS0-fiB4SKGtyRd5HWqdzQ', { validators: {} });
}
