import type { ProvinceFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schema = ProvinceFragment;

function loader(): Loader {
  return {
    name: 'provinces',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schema>({
        collection: 'Provinces',
        fragment: fragment,
        fragmentName: 'Province',
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

const provinces = defineCollection({
  loader: loader(),
  schema: z.custom<Schema>(),
});

export default provinces;
