import { useState } from 'react';

type SearchParams = Record<string, string | undefined>;

const isEmpty = (value: string | null | undefined) =>
  value === null || value === undefined || value === '';

/**
 * Applies changed params to the current state. Empty values remove the param.
 */
export const mergeSearchParams = <T extends SearchParams>(
  current: T,
  changes: Partial<T>,
): T => {
  const next: SearchParams = { ...current };

  Object.entries(changes).forEach(([key, value]) => {
    if (isEmpty(value)) {
      delete next[key];
    } else {
      next[key] = value;
    }
  });

  return next as T;
};

/**
 * Filter state of a list block, mirrored to the URL.
 *
 * The state is the single source of truth. It starts from `initialParams`, which the
 * server derives from the request URL, so the first browser render and its query key
 * match the server render and its dehydrated data. Changes are written to the URL with
 * `replaceState`, keeping unrelated params like `utm_source`. Because history never gets
 * entries with other filter values, there is no need to read state back from the URL.
 */
export const useSearchParams = <T extends SearchParams = SearchParams>(
  initialParams: T,
) => {
  const [searchParams, setSearchParamsState] = useState<T>(initialParams);

  const updateSearchParams = (changes: Partial<T>) => {
    const urlParams = new URLSearchParams(window.location.search);

    Object.entries(changes).forEach(([key, value]) => {
      if (isEmpty(value)) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value!);
      }
    });

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${urlParams.toString()}`,
    );
    setSearchParamsState((current) => mergeSearchParams(current, changes));
  };

  return [searchParams, updateSearchParams] as const;
};
