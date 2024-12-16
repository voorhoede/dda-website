import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Destroy fields in existing models/block models');

  console.log(
    'Delete Single-line string field "House Number" (`house_number`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.destroy('PkmiLwl8RCW8q5K5LzsaJA');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single-line string field "Street Address" (`street_address`) in block model "Contact block" (`contact_block`)'
  );
  await client.fields.update('N47QsWgLSuaIpJv4Toi_iQ', {
    label: 'Street Address',
    api_key: 'street_address',
  });
}
