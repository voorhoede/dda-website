import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('astro:env/client', () => ({
  DATOCMS_READONLY_API_TOKEN: 'test-token',
  HEAD_START_PREVIEW: false,
}));
vi.mock('@root/datocms-environment', () => ({
  datocmsEnvironment: 'test',
}));

const fragment = 'fragment Item on ItemRecord { id }';
const options = { collection: 'Items', fragment, fragmentName: 'Item' };

const recordsOf = (count: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => ({ id: String(offset + i) }));

/** Mocks the DatoCMS API for a collection with `total` records. */
const stubDatocms = (total: number) => {
  const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
    const { query } = JSON.parse(init.body as string);
    const skip = Number(/skip:\s*(\d+)/.exec(query)![1]);
    const data: Record<string, unknown> = {
      Items: recordsOf(Math.max(Math.min(100, total - skip), 0), skip),
    };
    if (query.includes('meta:')) data.meta = { count: total };
    return new Response(JSON.stringify({ data }));
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

beforeEach(() => {
  vi.resetModules();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('datocmsCollection', () => {
  it('gets the count with the first page and needs no separate request', async () => {
    const fetchMock = stubDatocms(250);
    const { datocmsCollection } = await import('./datocms');

    const records = await datocmsCollection(options);

    expect(records).toEqual(recordsOf(250));
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('makes a single request for a small collection', async () => {
    const fetchMock = stubDatocms(5);
    const { datocmsCollection } = await import('./datocms');

    const records = await datocmsCollection(options);

    expect(records).toHaveLength(5);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns no records for an empty collection', async () => {
    const fetchMock = stubDatocms(0);
    const { datocmsCollection } = await import('./datocms');

    expect(await datocmsCollection(options)).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('datocmsCollectionOnce', () => {
  it('fetches the same collection only once, also for concurrent calls', async () => {
    const fetchMock = stubDatocms(150);
    const { datocmsCollectionOnce } = await import('./datocms');

    const [first, second] = await Promise.all([
      datocmsCollectionOnce(options),
      datocmsCollectionOnce(options),
    ]);
    const third = await datocmsCollectionOnce(options);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(first).toEqual(second);
    expect(third).toHaveLength(150);
    expect(first).not.toBe(second);
  });

  it('fetches again for a different fragment', async () => {
    const fetchMock = stubDatocms(1);
    const { datocmsCollectionOnce } = await import('./datocms');

    await datocmsCollectionOnce(options);
    await datocmsCollectionOnce({
      collection: 'Items',
      fragment: 'fragment Other on ItemRecord { id }',
      fragmentName: 'Other',
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not cache failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(new Response('{}', { status: 500 })),
    );
    const { datocmsCollectionOnce } = await import('./datocms');

    await expect(datocmsCollectionOnce(options)).rejects.toThrow();

    stubDatocms(1);
    await expect(datocmsCollectionOnce(options)).resolves.toHaveLength(1);
  });
});
