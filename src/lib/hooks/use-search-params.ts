import { useState, useEffect } from 'react';

type SearchParams = Record<string, string | undefined>;

/**
 * Builds the search params state from a URL search string. Only keys known
 * from `initialParams` are kept, so unrelated URL params (e.g. `utm_source`)
 * can't change the query key and make it differ from the server render.
 * With `useDefaults`, known keys missing from the URL get their initial value.
 */
export const getSearchParams = <T extends SearchParams>(
  search: string,
  initialParams: T,
  useDefaults = false,
): T => {
  const urlParams = new URLSearchParams(search);
  const result: SearchParams = {};

  Object.entries(initialParams).forEach(([key, defaultValue]) => {
    const value = urlParams.get(key) ?? (useDefaults ? defaultValue : null);

    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  });

  return result as T;
};

export const useSearchParams = <T extends SearchParams = SearchParams>(
  initialParams: T,
) => {
  const [searchParams, setSearchParamsState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialParams;
    }

    return getSearchParams(window.location.search, initialParams, true);
  });

  const updateSearchParams = (newParams: Partial<T>) => {
    const params = new URLSearchParams(window.location.search);

    // Update or add new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key); // Remove the param if the value is null/undefined
      } else {
        params.set(key, value); // Set the param
      }
    });

    // Update the browser's URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);

    // Update the local state
    setSearchParamsState(getSearchParams(params.toString(), initialParams));
  };

  // Sync state with URL changes (e.g., browser navigation)
  useEffect(() => {
    const handlePopState = () => {
      setSearchParamsState(
        getSearchParams(window.location.search, initialParams),
      );
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return [searchParams, updateSearchParams] as const;
};
