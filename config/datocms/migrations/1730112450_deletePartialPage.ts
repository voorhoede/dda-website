import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Multiple links field "Items" (`items`) in block model "Page Partial Block" (`page_partial_block`)',
  );
  await client.fields.update('UgwMgWgIRPS-nqcdJdQYIg', {
    validators: {
      items_item_type: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: [],
      },
      size: { min: 1 },
    },
  });

  console.log('Destroy models/block models');

  console.log('Delete model "Page Partial" (`page_partial`)');
  await client.itemTypes.destroy('DAdmJVaoTZKumF9GYBZDfQ', {
    skip_menu_items_deletion: true,
  });

  console.log('Manage schema menu items');

  console.log(
    'Update block schema menu item for block model "Table Block" (`table_block`)',
  );
  await client.schemaMenuItems.update('DQCIP-i7SzCbmCKHeZOVmQ', {
    position: 16,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.schemaMenuItems.update('QLOjKvs7TIifnh0jFHYRpA', {
    position: 8,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFAC Video Block" (`video_block`)',
  );
  await client.schemaMenuItems.update('bhztsYOFREu2zgi6Av5ZTQ', {
    position: 9,
  });

  console.log(
    'Update model schema menu item for model "\uD83D\uDD21 Video Text Track" (`video_text_track`)',
  );
  await client.schemaMenuItems.update('HljEN8uWSY6BHxJ-iIx4ig', {
    position: 10,
  });

  console.log(
    'Update block schema menu item for block model "Embed Block" (`embed_block`)',
  );
  await client.schemaMenuItems.update('MIWhZ6URT461Va6suQrU0Q', {
    position: 11,
  });

  console.log(
    'Update model schema menu item for model "Internal link" (`internal_link`)',
  );
  await client.schemaMenuItems.update('Ua0dofS1SXS2tTj14jcwTg', {
    position: 13,
  });

  console.log(
    'Update block schema menu item for block model "Page Partial Block" (`page_partial_block`)',
  );
  await client.schemaMenuItems.update('PZzg8ydcT0a8HStzchUF6w', {
    position: 12,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDBC\uFE0F Image Block" (`image_block`)',
  );
  await client.schemaMenuItems.update('fB8nvvdwQVSuncWPedJ4JQ', {
    position: 14,
  });

  console.log(
    'Update block schema menu item for block model "\uD83C\uDFAC Video Embed Block" (`video_embed_block`)',
  );
  await client.schemaMenuItems.update('ZidgZpjxQJOa0Yvl2DFzdg', {
    position: 15,
  });

  console.log(
    'Update model schema menu item for model "\u21AA\uFE0F Redirect Rule" (`redirect_rule`)',
  );
  await client.schemaMenuItems.update('BRzL0jdbQQqacDw3HUCsQg', {
    position: 17,
  });
}
