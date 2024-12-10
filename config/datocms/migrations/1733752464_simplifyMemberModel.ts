import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log(
    'Delete Single-line string field "House Number" (`house_number`) in block model "Contact block" (`countact_block`)',
  );
  await client.fields.destroy('PkmiLwl8RCW8q5K5LzsaJA');

  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single asset field "Banner" (`banner`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('Io2gWgtXRqqcmuBExEUbbg', {
    validators: {
      extension: { extensions: [], predefined_list: 'transformable_image' },
    },
  });

  console.log(
    'Update Single-line string field "Location" (`location`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('eIQP58ibRcCqS9O3qAil9w', { validators: {} });

  console.log(
    'Update Modular Content (Multiple blocks) field "Contact" (`contact`) in model "\uD83D\uDCC1 Member" (`member`)',
  );
  await client.fields.update('EagEZc6jRu-xvc3vmrbaHA', {
    validators: {
      rich_text_blocks: { item_types: ['Hwfbdgu_TMqmzK2i0-xmXg'] },
    },
  });

  console.log(
    'Update Single-line string field "Street" (`street`) in block model "Contact block" (`contact_block`)',
  );
  await client.fields.update('N47QsWgLSuaIpJv4Toi_iQ', {
    label: 'Street',
    api_key: 'street',
  });

  console.log(
    'Update Single-line string field "Phone" (`phone`) in block model "Contact block" (`contact_block`)',
  );
  await client.fields.update('QS0-fiB4SKGtyRd5HWqdzQ', { validators: {} });
}
