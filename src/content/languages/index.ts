import type { LanguageFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schema = LanguageFragment;

function loader(): Loader {
  return {
    name: 'languages',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schema>({
        collection: 'Languages',
        fragment: fragment,
        fragmentName: 'Language',
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

const languages = defineCollection({
  loader: loader(),
  schema: z.custom<Schema>(),
});

export default languages;
