import { Client } from '@datocms/cli/lib/cma-client-node';

export default async function (client: Client) {
  console.log('Update permissions for environment in role Member');
  await client.roles.updateCurrentEnvironmentPermissions('301184', {
    positive_item_type_permissions: {
      add: [
        {
          item_type: 'Bc_RFLXqQDG5Eb0SJblw5Q',
          action: 'create',
          localization_scope: 'all',
        },
      ],
      remove: [
        { action: 'all', on_creator: 'anyone', localization_scope: 'all' },
      ],
    },
  });
}
