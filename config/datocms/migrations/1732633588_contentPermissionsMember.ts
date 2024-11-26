import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update permissions for environment in role Editor');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [
        {
          item_type: 'ByoMKdCkSp6T10UjQm26wg',
          action: 'read',
          on_creator: 'self',
        },
        {
          item_type: 'ByoMKdCkSp6T10UjQm26wg',
          action: 'update',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'ByoMKdCkSp6T10UjQm26wg',
          action: 'publish',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'BdrPCTMrRGWPtEqBP0nSYg',
          action: 'read',
          on_creator: 'anyone',
        },
        {
          item_type: 'Q04RdQnVQw-xei_UK8GzjA',
          action: 'read',
          on_creator: 'anyone',
        },
        {
          item_type: 'UxqkfkpETnWtRgn2iP6Vhg',
          action: 'read',
          on_creator: 'anyone',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'read',
          on_creator: 'self',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'update',
          on_creator: 'self',
          localization_scope: 'all',
        },
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'delete',
          on_creator: 'self',
        },
      ],
    },
    positive_upload_permissions: {
      add: [
        { action: 'read', on_creator: 'anyone' },
        { action: 'all', on_creator: 'self', localization_scope: 'all' },
      ],
      remove: [
        { action: 'all', on_creator: 'anyone', localization_scope: 'all' },
      ],
    },
  });
}
