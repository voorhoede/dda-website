import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Single link field "Page" (`page`) in model "\uD83E\uDD1D Partner" (`partner`)',
  );
  await client.fields.update('TiBAVelkQgesypaKiELdJw', {
    validators: {
      item_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: [
          'T5DMLHeUTF2ub3p2Wx-CBw',
          'WsNJp5eaRz2-QZserzWOTw',
          'cgpNpUIYRY2eQa_E0u-7SQ',
        ],
      },
    },
  });
}
