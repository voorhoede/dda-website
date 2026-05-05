import type { EmailTemplateFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schema = EmailTemplateFragment;

function emailTemplatesLoader(): Loader {
  return {
    name: 'email-templates',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schema>({
        collection: 'EmailTemplates',
        fragment: fragment,
        fragmentName: 'EmailTemplate',
      });

      store.clear();

      for (const item of items) {
        const id = item.id;
        const data = await parseData({ id, data: item });
        store.set({ id, data });
      }
    },
    schema: z.custom<Schema>(),
  };
}

const emailTemplates = defineCollection({
  loader: emailTemplatesLoader(),
  schema: z.custom<Schema>(),
});

export default emailTemplates;
