import { Client } from '@datocms/cli/lib/cma-client-node';

const NEWSLETTER_FORM_BLOCK_ID = 'KlyJ7mXTTzKCNvTLcJrysg';
const TEXT_BLOCK_TEXT_FIELD_ID = 'NtVXfZ6gTL2sKNffNeUf5Q';

export default async function (client: Client) {
  console.log('Update existing fields/fieldsets');

  console.log(
    'Update Structured text field "Text" (`text`) in block model "📝 Text Block" (`text_block`)',
  );
  const textField = await client.fields.find(TEXT_BLOCK_TEXT_FIELD_ID);
  const blocks = textField.validators.structured_text_blocks as { item_types: string[] };
  await client.fields.update(TEXT_BLOCK_TEXT_FIELD_ID, {
    validators: {
      ...textField.validators,
      structured_text_blocks: {
        ...blocks,
        item_types: blocks.item_types.filter((id) => id !== NEWSLETTER_FORM_BLOCK_ID),
      },
    },
  });

  console.log('Destroy models/block models');

  console.log('Delete block model "News Letter Form Block" (`news_letter_form_block`)');
  await client.itemTypes.destroy(NEWSLETTER_FORM_BLOCK_ID);
}
