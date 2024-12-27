import { parse } from 'graphql';
import { print } from 'graphql/language/printer';
import type { DocumentNode } from 'graphql';
import { datocmsEnvironment } from '@root/datocms-environment';
import {
  DATOCMS_READONLY_API_TOKEN,
  HEAD_START_PREVIEW,
} from 'astro:env/client';

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
/**
 * Returns all records from a DatoCMS collection (like 'Pages')
 * with data for each record based on the provided fragment.
 *
 * DatoCMS GraphQL API has a limit of 100 records per request.
 * This function uses pagination to get all records.
 * @see https://www.datocms.com/docs/content-delivery-api/pagination
 */
export const datocmsCollection = async <CollectionType>({
  collection,
  fragment,
  fragmentName,
  filter,
  orderBy,
}: {
  collection: string;
  fragment: string;
  fragmentName: string;
  filter?: Record<string, unknown>;
  orderBy?: string;
}) => {
  const { meta } = (await datocmsRequest({
    query: parse(/* graphql */ `
      query ${collection}Meta {
        meta: _all${collection}Meta { count }
      }
   `),
  })) as { meta: CollectionMeta };

  const recordsPerPage = 100; // DatoCMS GraphQL API has a limit of 100 records per request
  const totalPages = Math.ceil(meta.count / recordsPerPage);
  const records: CollectionType[] = [];
  const singularCollectionName = collection.slice(0, -1);

  for (let page = 0; page < totalPages; page++) {
    const data = (await datocmsRequest({
      query: parse(/* graphql */ `
        ${fragment}
        query All${collection}($filter: ${singularCollectionName}ModelFilter, $orderBy: [${singularCollectionName}ModelOrderBy]) {
          ${collection}: all${collection} (
             first: ${recordsPerPage},
             skip: ${page * recordsPerPage},
             filter: $filter,
             orderBy: $orderBy
          ) {
            ...${fragmentName}
          }
        }
      `),
      variables: {
        filter,
        orderBy,
      },
    })) as CollectionData<CollectionType>;

    records.push(...data[collection]);
  }

  return records;
};
