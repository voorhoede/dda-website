import type { TrackFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schema = TrackFragment;

function tracksLoader(): Loader {
  return {
    name: 'tracks',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schema>({
        collection: 'Tracks',
        fragment: fragment,
        fragmentName: 'Track',
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

const tracks = defineCollection({
  loader: tracksLoader(),
  schema: z.custom<Schema>(),
});

export default tracks;
