import type { AiInternshipFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schama = AiInternshipFragment;

function loader(): Loader {
  return {
    name: 'ai-internships',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schama>({
        collection: 'AiInternships',
        fragment: fragment,
        fragmentName: 'AiInternship',
      });

      store.clear();

      for (const item of items) {
        const id = item.id;
        const data = await parseData({ id, data: item });
        store.set({ id, data });
      }
    },
    schema: z.custom<Schama>(),
  };
}

const aiInternships = defineCollection({
  loader: loader(),
  schema: z.custom<Schama>(),
});

export default aiInternships;
