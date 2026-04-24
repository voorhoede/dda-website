import type { AiInternshipAssignmentTypeFragment } from '@lib/types/datocms';
import type { Loader } from 'astro/loaders';
import { datocmsCollection } from '@lib/datocms';
import { defineCollection, z } from 'astro:content';
import fragment from './index.fragment.graphql?raw';

type Schema = AiInternshipAssignmentTypeFragment;

function loader(): Loader {
  return {
    name: 'ai-internship-assignment-types',
    load: async ({ store, parseData }) => {
      const items = await datocmsCollection<Schema>({
        collection: 'AiInternshipAssignmentTypes',
        fragment: fragment,
        fragmentName: 'AiInternshipAssignmentType',
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

const aiInternshipAssignmentTypes = defineCollection({
  loader: loader(),
  schema: z.custom<Schema>(),
});

export default aiInternshipAssignmentTypes;
