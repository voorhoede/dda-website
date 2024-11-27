import { getCollection, type DataEntryMap } from 'astro:content';

export const getRandomItems = async <T>(
  collection: string,
  count: number,
): Promise<T[]> => {
  const items = await getCollection(collection as keyof DataEntryMap);

  return items
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((item) => item.data as T);
};
