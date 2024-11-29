import { useState, useEffect } from 'react';

type SearchParams = Record<string, string | undefined>;

export const useSearchParams = <T extends SearchParams = SearchParams>(
  initialParams: T,
) => {
  const [searchParams, setSearchParamsState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialParams;
    }

    const params = new URLSearchParams(window.location.search);

    // Merge initialParams with URL params
    Object.entries(initialParams).forEach(([key, value]) => {
      if (!params.has(key) && value !== undefined) {
        params.set(key, value);
      }
    });

    const entries: [keyof T, string][] = Array.from(params.entries()) as [
      keyof T,
      string,
    ][];

    return Object.fromEntries(entries) as T;
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
    const updatedEntries: [keyof T, string][] = Array.from(
      params.entries(),
    ) as [keyof T, string][];
    setSearchParamsState(Object.fromEntries(updatedEntries) as T);
  };

  // Sync state with URL changes (e.g., browser navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const entries: [keyof T, string][] = Array.from(params.entries()) as [
        keyof T,
        string,
      ][];

      setSearchParamsState(Object.fromEntries(entries) as T);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return [searchParams, updateSearchParams] as const;
};
