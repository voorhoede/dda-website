import { parse } from 'graphql';
import { print } from 'graphql/language/printer';
import type { DocumentNode } from 'graphql';
import { datocmsEnvironment } from '@root/datocms-environment';
import {
  DATOCMS_READONLY_API_TOKEN,
  HEAD_START_PREVIEW,
} from 'astro:env/client';
import pluralize from 'pluralize';

const wait = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));

type DatocmsRequest<V> = {
  query: DocumentNode;
  variables?: V;
  retryCount?: number;
};
/**
 * Makes a request to the DatoCMS GraphQL API using the provided query and variables.
 * It has authorization, environment and drafts (preview) pre-configured.
 * It has a retry mechanism in case of rate-limiting, based on DatoCMS API utils. @see https://github.com/datocms/js-rest-api-clients/blob/f4e820d/packages/rest-client-utils/src/request.ts#L239C13-L255
 */
export const datocmsRequest = async <T, V = unknown>({
  query,
  variables,
  retryCount = 1,
}: DatocmsRequest<V>): Promise<T> => {
  let apiUrl;
  const headers = new Headers();

  // during build we cannot access our dato proxy, so we use the dato api endpoint directly
  if (import.meta.env.SSR) {
    apiUrl = 'https://graphql.datocms.com';

    headers.set('Authorization', `Bearer ${DATOCMS_READONLY_API_TOKEN}`);
    headers.set('Content-Type', 'application/json');
    headers.set('X-Environment', datocmsEnvironment);
    headers.set('X-Exclude-Invalid', 'true');

    if (HEAD_START_PREVIEW) {
      headers.set('X-Include-Drafts', 'true');
    }
  } else {
    apiUrl = '/api/dato/';
  }

  const response = await fetch(apiUrl, {
    method: 'post',
    headers,
    body: JSON.stringify({ query: print(query), variables }),
  });

  const retryLimit = 5;

  if (response.status === 429) {
    const waitTimeInSeconds = response.headers.has('X-RateLimit-Reset')
      ? parseInt(response.headers.get('X-RateLimit-Reset')!, 10)
      : retryCount;
    await wait(waitTimeInSeconds * 1000);
    if (retryCount >= retryLimit)
      throw Error('DatoCMS request failed. Too many retries.');
    return datocmsRequest({ query, variables, retryCount: retryCount + 1 });
  }

  if (!response.ok) {
    throw Error(`DatoCMS request failed with status ${response.status}`);
  }

  const { data, errors } = await response.json();
  if (errors) throw Error(JSON.stringify(errors, null, 4));
  return data;
};

interface CollectionData<CollectionType> {
  [key: string]: CollectionType[];
}
type CollectionMeta = {
  count: number;
};
type DatocmsCollectionOptions = {
  collection: string;
  fragment: string;
  fragmentName: string;
  filter?: Record<string, unknown>;
  orderBy?: string;
};

/**
 * Returns all records from a DatoCMS collection (like 'Pages')
 * with data for each record based on the provided fragment.
 *
 * DatoCMS GraphQL API has a limit of 100 records per request.
 * This function uses pagination to get all records.
 * The record count is requested together with the first page,
 * so no separate count request is needed.
 * @see https://www.datocms.com/docs/content-delivery-api/pagination
 */
export const datocmsCollection = async <CollectionType>({
  collection,
  fragment,
  fragmentName,
  filter,
  orderBy,
}: DatocmsCollectionOptions) => {
  const recordsPerPage = 100; // DatoCMS GraphQL API has a limit of 100 records per request
  const records: CollectionType[] = [];
  const singularCollectionName = pluralize.singular(collection);

  const parameters =
    filter || orderBy
      ? `($filter: ${singularCollectionName}ModelFilter, $orderBy: [${singularCollectionName}ModelOrderBy])`
      : '';

  const variables =
    filter || orderBy
      ? {
        filter,
        orderBy,
      }
      : {};

  let totalPages = 1; // the first page is always requested and reveals the real total
  for (let page = 0; page < totalPages; page++) {
    const data = (await datocmsRequest({
      query: parse(/* graphql */ `
        ${fragment}
        query All${collection} ${parameters} {
          ${page === 0 ? `meta: _all${collection}Meta ${filter ? '(filter: $filter)' : ''} { count }` : ''}
          ${collection}: all${collection} (
             first: ${recordsPerPage},
             skip: ${page * recordsPerPage},
             ${filter ? 'filter: $filter,' : ''}
             ${orderBy ? 'orderBy: $orderBy,' : ''}
          ) {
            ...${fragmentName}
          }
        }
      `),
      variables,
    })) as CollectionData<CollectionType> & { meta?: CollectionMeta };

    if (page === 0) {
      totalPages = Math.ceil(data.meta!.count / recordsPerPage);
    }
    records.push(...data[collection]);
  }

  return records;
};

const collectionsOnce = new Map<string, Promise<unknown[]>>();
/**
 * Same as `datocmsCollection`, but memoized for the lifetime of the process.
 * Use it for build-time content loaders, which would otherwise fetch the same
 * collection (with the same fragment) again for each content collection.
 * Do not use it at runtime where fresh data is expected for each request.
 */
export const datocmsCollectionOnce = <CollectionType>(
  options: DatocmsCollectionOptions,
) => {
  const key = JSON.stringify([
    options.collection,
    options.fragmentName,
    options.fragment,
    options.filter,
    options.orderBy,
  ]);
  let promise = collectionsOnce.get(key) as Promise<CollectionType[]> | undefined;
  if (!promise) {
    promise = datocmsCollection<CollectionType>(options);
    collectionsOnce.set(key, promise);
    // do not cache failures, so a later call can retry
    promise.catch(() => collectionsOnce.delete(key));
  }
  // hand out a copy, so callers cannot affect each other by mutating the array
  return promise.then((records) => [...records]);
};
