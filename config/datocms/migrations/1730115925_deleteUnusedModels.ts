import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83C\uDFE0 Home" (`home_page`)',
  );
  await client.fields.update('pUj2PObgTyC-8X4lvZLMBA', {
    validators: {
      rich_text_blocks: {
        item_types: [
          'PAk40zGjQJCcDXXPgygUrA',
          'VZvVfu52RZK81WG0Dxp-FQ',
          'ZdBokLsWRgKKjHrKeJzdpw',
          'gezG9nO7SfaiWcWnp-HNqw',
          '0SxYNS2CR1it_5LHYWuEQg',
        ],
      },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83E\uDD37 Not found" (`not_found_page`)',
  );
  await client.fields.update('Zu006Xq0TMCAvV-vyQ_Iiw', {
    validators: {
      rich_text_blocks: {
        item_types: [
          'PAk40zGjQJCcDXXPgygUrA',
          'VZvVfu52RZK81WG0Dxp-FQ',
          'ZdBokLsWRgKKjHrKeJzdpw',
          'gezG9nO7SfaiWcWnp-HNqw',
          '0SxYNS2CR1it_5LHYWuEQg',
        ],
      },
    },
  });

  console.log(
    'Update Structured text field "Text" (`text`) in block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.fields.update('NtVXfZ6gTL2sKNffNeUf5Q', {
    validators: {
      required: {},
      structured_text_blocks: {
        item_types: [
          'ZdBokLsWRgKKjHrKeJzdpw',
          'gezG9nO7SfaiWcWnp-HNqw',
          '0SxYNS2CR1it_5LHYWuEQg',
        ],
      },
      structured_text_links: {
        on_publish_with_unpublished_references_strategy: 'fail',
        on_reference_unpublish_strategy: 'delete_references',
        on_reference_delete_strategy: 'delete_references',
        item_types: ['WywlzYXpSVWFQIeeNk3iMw'],
      },
    },
  });

  console.log(
    'Update Modular Content (Multiple blocks) field "Body" (`body_blocks`) in model "\uD83D\uDCD1 Page" (`page`)',
  );
  await client.fields.update('Q-z1nyMsQtC8Sr6w6J2oGw', {
    validators: {
      rich_text_blocks: {
        item_types: [
          'PAk40zGjQJCcDXXPgygUrA',
          'VZvVfu52RZK81WG0Dxp-FQ',
          'ZdBokLsWRgKKjHrKeJzdpw',
          'gezG9nO7SfaiWcWnp-HNqw',
          '0SxYNS2CR1it_5LHYWuEQg',
        ],
      },
    },
  });

  console.log('Destroy models/block models');

  console.log('Delete block model "Text Image Block" (`text_image_block`)');
  await client.itemTypes.destroy('BRbU6VwTRgmG5SbwUs0rBg', {
    skip_menu_items_deletion: true,
  });

  console.log('Delete block model "\uD83C\uDFAC Video Block" (`video_block`)');
  await client.itemTypes.destroy('QYfZyBzIRWKxA1MinIR0aQ', {
    skip_menu_items_deletion: true,
  });

  console.log(
    'Delete model "\uD83D\uDD21 Video Text Track" (`video_text_track`)',
  );
  await client.itemTypes.destroy('Us90isT5SgeXHuetcEj8eA', {
    skip_menu_items_deletion: true,
  });

  console.log('Delete block model "Page Partial Block" (`page_partial_block`)');
  await client.itemTypes.destroy('V80liDVtRC-UYgd3Sm-dXg', {
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

  console.log(
    'Update model schema menu item for model "Internal link" (`internal_link`)',
  );
  await client.schemaMenuItems.update('Ua0dofS1SXS2tTj14jcwTg', {
    position: 13,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDDBC\uFE0F Image Block" (`image_block`)',
  );
  await client.schemaMenuItems.update('fB8nvvdwQVSuncWPedJ4JQ', {
    position: 14,
  });

  console.log(
    'Update block schema menu item for block model "Embed Block" (`embed_block`)',
  );
  await client.schemaMenuItems.update('MIWhZ6URT461Va6suQrU0Q', {
    position: 11,
  });

  console.log(
    'Update block schema menu item for block model "\uD83D\uDCDD Text Block" (`text_block`)',
  );
  await client.schemaMenuItems.update('QLOjKvs7TIifnh0jFHYRpA', {
    position: 8,
  });
}
